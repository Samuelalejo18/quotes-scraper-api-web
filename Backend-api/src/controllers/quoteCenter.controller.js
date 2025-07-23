const { getQuoteByAuthor } = require("../service/author.service.js");

const { getAllQuotes,
    getQuoteByText } = require("../service/quote.service.js");

const { getQuotesBySingleTag } = require("../service/tag.service.js");





const quotesController = async (req, res) => {
    try {
        const { author, tag, search } = req.query;
        let quotes = [];

        // Si no hay filtros, devuelves todo
        if (!author && !tag && !search) {
            quotes = await getAllQuotes();
            if (quotes.length === 0) {
                return res.status(404).json({ message: "No quotes found" });
            }
        }


        // Si se pasa autor
        if (author) {
            quotes = await getQuoteByAuthor(author);

            if (quotes.length === 0) {
                return res.status(404).json({ message: "No quotes found for this author" });
            }
        }

        // Si se pasa etiqueta
        if (tag) {
            quotes = await getQuotesBySingleTag(tag);

            if (quotes.length === 0) {
                return res.status(404).json({ message: "No quotes found for this tag" });
            }
        }

        // Si se pasa búsqueda por texto
        if (search) {
            quotes = await getQuoteByText(search);
            if (quotes.length === 0) {
                return res.status(404).json({ message: "No quotes found for this quote text" });
            }
        }

        return res.status(200).json(quotes);
    } catch (error) {
        console.error("Error in /quotes:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    quotesController
};