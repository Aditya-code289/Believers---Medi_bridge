import { cleanHtml } from "../utils/cleanRES1.js"


async function Search(req, res) {
    const keyword = req.body.search;
    const encode = encodeURIComponent(keyword);
    const token = req.token;
    console.log(encode);

    try {
        const response = await fetch(`${process.env.icdendpoint}/search?q=${encode}`, {

            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Accept-Language": "en",
                "API-Version": "v2"
            }

        })

        const data = await response.json()

        //now clean response code start from here // we were geting very rough response in em tags format 
        const rawData = data;

        if (!rawData?.destinationEntities) {
            return res.status(400).json({ message: "Invalid data" });
        }

        const result = rawData.destinationEntities.map(entity => {

            const entityId = entity.id.split("/").pop();

            const name = cleanHtml(entity.title);

        
            return {
                code: entity.theCode || entityId,
                name,
            };
        });

        res.json(result);





    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export default Search; 