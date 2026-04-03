async function getBulkICDCodes(req, res) {
    const diseases = req.body;
    const token = req.token;

    try {
        const results = await Promise.all(
            diseases.map(async (disease) => {
                try {
                    const url = `${process.env.endpointicd}/${disease.code}`;


                    const response = await fetch(url, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                            "Accept-Language": "en",
                            "API-Version": "v2"
                        }
                    });

                    const data = await response.json();

                    // 👇 Log the full raw response
                    // just for testing purpose , you can remove it later 
                    // console.log(`[${disease.code}] Status:`, response.status);
                    // console.log(`[${disease.code}] Response:`, JSON.stringify(data, null, 2));

                    return {
                        code: data.code ?? null,
                        name: disease.name,
                        description: data.definition?.["@value"] ?? null
                    };

                } catch (err) {
                    console.error(`[${disease.code}] Fetch Error:`, err.message);
                    return { code: null, name: disease.name };
                }
            })
        );

        //to filter out null code 
        const filtered = results.filter(item => item.code !== null);

        res.json(filtered);





    } catch (error) {
        res.status(500).json({ message: "Error fetching ICD codes" });
    }
}

export default getBulkICDCodes;