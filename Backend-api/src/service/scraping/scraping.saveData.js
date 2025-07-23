const connectDB = require("../../database/dataBaseConnection.js");
const getDataFromWebPage = require("./scraping.getData.js")


async function saveDataToDB() {

    const allQuotes = await getDataFromWebPage();
    const connection = await connectDB();
    await connection.query(`USE scraping`);



    //! 1. Obtener una lista única de autores desde el arreglo allQuotes
    //* Mapear solo los nombres de autores
    //* Usar Set para eliminar duplicados
    //* Convertir el Set de nuevo en un arreglo

    const authors = [...new Set(allQuotes.map(q => q.author))];

    //! 2. Insertar los autores únicos en la base de datos
    //* Se usa 'INSERT IGNORE' para evitar errores si un autor ya existe en la tabla
    //* authors.map(a => [a]) convierte el arreglo de strings en un arreglo de arreglos
    //* porque VALUES ? espera una matriz de filas [[autor1], [autor2], ...]
    await connection.query(
        `INSERT IGNORE INTO author (name_author) 
         VALUES ?`,
        [authors.map(a => [a])]
    )



    //! 3. Obtener IDs de autores desde la base de datos

    //* Ejecutar una consulta SQL para traer todos los autores registrados
    //* Esto retorna un arreglo de objetos con los campos 'id_author' y 'name_author'

    const [authorRows] = await connection.query(
        'SELECT id_author, name_author FROM author'
    );

    //! 4. Se convierte el arreglo de objetos en pares [nombre, id]
    /*
  Object.fromEntries convierte esos pares en un objeto como:
    {
      "Albert Einstein": 1,
       "Mark Twain": 2,
   }
  */
    const authorMap = Object.fromEntries(
        authorRows.map(row => [row.name_author, row.id_author])
    );



    //! 5. Obtener una lista única de etiquetas desde el arreglo allQuotes
    const tags = [...new Set(allQuotes.flatMap(q => q.tags))];
    //! 6. Insertar las etiquetas únicos en la base de datos
    await connection.query(
        `INSERT IGNORE INTO tag (name_tag) 
         VALUES ?`,
        [tags.map(t => [t])]
    );

    //! 7. Obtener IDs de las etiquetas desde la base de datos
    const [tagRows] = await connection.query(
        'SELECT id_tag, name_tag FROM tag'
    );
    //! 8. Se convierte el arreglo de objetos en pares [nombre, id]
    const tagMap = Object.fromEntries(
        tagRows.map(row => [row.name_tag, row.id_tag])
    );

    //! 9. Recorrer cada cita obtenida en el spcraping 
    for (const quote of allQuotes) {
        //! 1. Insertar la cita en la tabla 'quote'
        //* Se inserta el texto de la cita (quote.text) y el ID del autor (authorMap[quote.author])
        //* authorMap se construyó previamente para obtener el id_author a partir del nombre
        const [quoteResult] = await connection.query(
            `INSERT IGNORE  INTO quote (quote_text, id_author)
             VALUES (?, ?)`,
            [quote.text, authorMap[quote.author]]
        );

        //! 2. Obtener el ID de la cita recién insertada
        //* insertId es una propiedad del resultado de la consulta que contiene el ID de la última
        const quoteId = quoteResult.insertId;


        //! 3. Preparar las relaciones entre la cita y sus etiquetas
        //* - quote.tags es un arreglo con los nombres de las etiquetas asociadas a esta cita
        //* - Se mapea cada etiqueta a una tupla [id_cita, id_etiqueta] usando tagMap para obtener el id_tag
        const tagRelations = quote.tags.map(tag => [quoteId, tagMap[tag]]);


        //! 4. Insertar las relaciones en la tabla intermedia 'quote_tag'
        //* Solo si hay al menos una etiqueta
        if (tagRelations.length > 0) {
            await connection.query(
                `INSERT IGNORE INTO quote_tag (id_quote, id_tag)
                 VALUES ?`,
                [tagRelations] // Formato: [[1, 5], [1, 7], [1, 9]] => relaciona una cita con múltiples etiquetas
            );
        }
    }

    await connection.end();
}

module.exports = saveDataToDB;
