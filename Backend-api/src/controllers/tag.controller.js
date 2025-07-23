const { getQuotesBySingleTag,
    getOnlyTags } = require("../service/tag.service.js");



const getOnlyTagsController = async (req, res) => {
    try {
        const tags = await getOnlyTags();
        if (tags.length === 0) {
            return res.status(404).json({ message: "No tags found" });
        }
        return res.status(200).json(tags);
    } catch (error) {
        console.error("Error fetching tags:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}



/*const quotesByTagController = async (req, res) => {
    try {
        const { tag } = req.query;

        if (!tagName) {
            return res.status(400).json({ error: "Missing 'tag name' query parameter" });
        }

        const quotes = await getQuotesBySingleTag(tag);

        if (quotes.length === 0) {
            return res.status(404).json({ message: "No quotes found for this tag" });
        }

        return res.status(200).json(quotes);
    } catch (error) {
        console.error("Error fetching quotes by tag:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}*/

module.exports = {
   // quotesByTagController,
    getOnlyTagsController
}