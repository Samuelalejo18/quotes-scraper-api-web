const connectDB = require("../database/dataBaseConnection.js");

async function getAllQuotes() {
    const connection = await connectDB();
    await connection.query(`USE scraping`);
    const [quotesRows] = await connection.query(
        `
        SELECT 
            q.quote_text, 
            q.id_quote, 
            a.name_author, 
            GROUP_CONCAT(t.name_tag SEPARATOR ', ') AS tags
        FROM quote q
        INNER JOIN author a ON q.id_author = a.id_author
        INNER JOIN quote_tag qt ON q.id_quote = qt.id_quote
        INNER JOIN tag t ON t.id_tag = qt.id_tag

        GROUP BY q.id_quote;
        `
    );

    return quotesRows;
}

async function getOnlyQuotes() {
    const connection = await connectDB();
    await connection.query(`USE scraping`);
    const [onlyQuotesRows] = await connection.query(
        ' Select q.id_quote, q.quote_text FROM quote q order by q.id_quote'
    );
    await connection.end();
    return onlyQuotesRows;
}

async function getQuoteByText(quoteText) {
    const connection = await connectDB();
       await connection.query(`USE scraping`);
    const [quoteRow] = await connection.query(
        `
        SELECT 
            q.quote_text, 
            q.id_quote, 
            a.name_author, 
            GROUP_CONCAT(t.name_tag SEPARATOR ', ') AS tags
        FROM quote q
        INNER JOIN author a ON q.id_author = a.id_author
        INNER JOIN quote_tag qt ON q.id_quote = qt.id_quote
        INNER JOIN tag t ON t.id_tag = qt.id_tag
        WHERE LOWER(q.quote_text) LIKE ?
        GROUP BY q.id_quote;
        `,
        [`%${quoteText.toLowerCase()}%`]
    );

    return quoteRow;
}

module.exports = {
    getAllQuotes,
    getOnlyQuotes,
    getQuoteByText
}