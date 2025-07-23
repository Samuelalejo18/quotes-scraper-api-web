const { getAllQuotes,
    getOnlyQuotes,
    getQuoteByText } = require("../service/quote.service.js");


const onlyQuotesController = async (req, res) => {
    try {
        const quotes = await getOnlyQuotes();
        if (quotes.length === 0) {
            return res.status(404).json({ message: "No quotes found" });
        }
        return res.status(200).json(quotes);
    } catch (error) {
        console.error("Error fetching only quotes:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}




/*
const allQuotesController = async (req, res) => {
    try {
        const quotes = await getAllQuotes();
        if (quotes.length === 0) {
            return res.status(404).json({ message: "No quotes found" });
        }
        return res.status(200).json(quotes);
    } catch (error) {
        console.error("Error fetching all quotes:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


const quoteByTextController = async (req, res) => {

    try {
        const { search} = req.query;

        if (!quoteText) {
            return res.status(400).json({ error: "Missing 'quote text' query parameter" });
        }

        const quotes = await getQuoteByText(search);

        if (quotes.length === 0) {
            return res.status(404).json({ message: "No quotes found for this quote text" });
        }

        return res.status(200).json(quotes);
    } catch (error) {
        console.error("Error fetching quotes by quote text:", error);
        return res.status(500).json({ error: "Internal server error" });
    }

}


*/
module.exports = {

    onlyQuotesController,
    /*  allQuotesController,
     quoteByTextController
 */
}