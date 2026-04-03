
let access_token = null;
let expires_in = 0;

const gettoken = async () => {
    if (access_token && (Date.now() < expires_in)) return access_token;
    
    // Check if credentials exist
    if (!process.env.clientid || !process.env.clientsecret) {
        console.error("ERROR: WHO ICD API 'clientid' or 'clientsecret' is missing in .env file.");
        return null;
    }

    try {
        const response = await fetch(process.env.tokenendpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body:
                `client_id=${process.env.clientid}` +
                `&client_secret=${process.env.clientsecret}` +
                `&scope=${process.env.scope}` +
                `&grant_type=${process.env.grant}`

        })

        if (!response.ok) {
            const errText = await response.text();
            console.error(`ERROR: WHO Token request failed with status ${response.status}: ${errText}`);
            return null;
        }

        const data = await response.json();
        access_token = data.access_token
        expires_in = Date.now() + (data.expires_in )*1000;
        
        if (access_token) {
            console.log("WHO Token refreshed successfully");
        } else {
            console.error("ERROR: WHO ICD API response did not contain an access_token", data);
        }
        
        return access_token;

    }
    catch (error) {
        console.error("ERROR during WHO Token request:", error.message);
        return null;
    }

}

export default gettoken 