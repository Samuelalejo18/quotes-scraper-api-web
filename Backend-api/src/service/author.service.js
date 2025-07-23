
const connectDB = require("../database/dataBaseConnection.js");

async function getQuoteByAuthor(authorName) {
    const connection = await connectDB();
    await connection.query(`USE scraping`);
    const [authorRow] = await connection.query(
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
        WHERE LOWER(a.name_author) LIKE ?
        GROUP BY q.id_quote;
        `,
        [`%${authorName.toLowerCase()}%`]
    );

    return authorRow;
}

async function getAllAuthors() {
    const connection = await connectDB();
    await connection.query(`USE scraping`);
    const [authorRows] = await connection.query(
        ' SELECT  a.id_author, a.name_author FROM author a order by a.id_author'
    );
    await connection.end();
    return authorRows;
}

module.exports = {
    getQuoteByAuthor,
    getAllAuthors
}