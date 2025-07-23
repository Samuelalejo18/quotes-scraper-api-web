const { getQuoteByAuthor,
    getAllAuthors } = require("../service/author.service.js");



const getAllAuthorsController = async (req, res) => {
    try {
        const authors = await getAllAuthors();
        if (authors.length === 0) {
            return res.status(404).json({ message: "No authors found" });
        }
        return res.status(200).json(authors);
    } catch (error) {
        console.error("Error fetching authors:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


/*
const quoteByAuthorController = async (req, res, ) => {
    try {
        const { author } = req.query;

        if (!author) {
            return res.status(400).json({ error: "Missing 'author' query parameter" });
        }

        const quotes = await getQuoteByAuthor(author);


        if (quotes.length === 0) {
            return res.status(404).json({ message: "No quotes found for this author" });
        }

        return res.status(200).json(quotes);
    } catch (error) {
        console.error("Error fetching quotes by author:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
*/


module.exports = {
    //quoteByAuthorController,
    getAllAuthorsController
};