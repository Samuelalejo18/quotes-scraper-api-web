const connectDB = require("../database/dataBaseConnection.js");

async function getQuotesBySingleTag(tagName) {
    const connection = await connectDB();

    const tag = tagName.toLowerCase(); // Opcional: normalizar a minúsculas si lo haces en la base
    await connection.query(`USE scraping`);
    const query = `
        SELECT 
            q.quote_text, 
            q.id_quote, 
            a.name_author, 
            GROUP_CONCAT(t.name_tag SEPARATOR ', ') AS tags
        FROM quote q
        INNER JOIN author a ON q.id_author = a.id_author
        INNER JOIN quote_tag qt ON q.id_quote = qt.id_quote
        INNER JOIN tag t ON t.id_tag = qt.id_tag
        GROUP BY q.id_quote
        HAVING FIND_IN_SET(?, tags);
    `;

    const [tagsRows] = await connection.query(query, [tag]);
    return tagsRows;
}

async function getOnlyTags() {

    const connection = await connectDB();
    await connection.query(`USE scraping`);
    const [onlyTagsRows] = await connection.query(
        'select t.id_tag,t.name_tag from tag t order by t.id_tag;'
    );
    await connection.end();
    return onlyTagsRows;
}

module.exports = {
    getQuotesBySingleTag,
    getOnlyTags
}