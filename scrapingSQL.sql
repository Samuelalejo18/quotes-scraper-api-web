CREATE DATABASE IF NOT EXISTS scraping;

use scraping;
  CREATE TABLE IF NOT EXISTS author (
            id_author INT AUTO_INCREMENT PRIMARY KEY,
            name_author VARCHAR(100) NOT NULL  UNIQUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS quote (
            id_quote INT AUTO_INCREMENT PRIMARY KEY,
            quote_text VARCHAR(750) NOT NULL UNIQUE,
            id_author INT ,
            FOREIGN KEY (id_author) REFERENCES author(id_author)
                ON DELETE SET NULL
                ON UPDATE CASCADE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS tag (
            id_tag INT AUTO_INCREMENT PRIMARY KEY,
            name_tag VARCHAR(40) NOT NULL  UNIQUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS quote_tag (
            id_quote INT,
            id_tag INT,
            PRIMARY KEY (id_quote, id_tag),
            FOREIGN KEY (id_quote) REFERENCES quote(id_quote)
                ON DELETE CASCADE
                ON UPDATE CASCADE,
            FOREIGN KEY (id_tag) REFERENCES tag(id_tag)
                ON DELETE CASCADE
                ON UPDATE CASCADE
        );



 use scraping; 
 
 /* Comprobar si no hay citas, autores y etiquetas repetidas*/
 SELECT name_author, COUNT(*) AS repeticiones
FROM author
GROUP BY name_author
HAVING COUNT(*) > 1;

SELECT quote_text, COUNT(*) AS repeticiones
FROM quote
GROUP BY quote_text
HAVING COUNT(*) > 1;

SELECT name_tag, COUNT(*) AS repeticiones
FROM tag
GROUP BY name_tag
HAVING COUNT(*) > 1;
 
 
 /* Traer todas las citas*/
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

/* Traer solo las citas */
 Select q.id_quote, q.quote_text FROM quote q order by q.id_quote;

/* Traer la cita por el contenido del texto*/
SELECT 
            q.quote_text, 
            q.id_quote, 
            a.name_author, 
            GROUP_CONCAT(t.name_tag SEPARATOR ', ') AS tags
        FROM quote q
        INNER JOIN author a ON q.id_author = a.id_author
        INNER JOIN quote_tag qt ON q.id_quote = qt.id_quote
        INNER JOIN tag t ON t.id_tag = qt.id_tag
        WHERE LOWER(q.quote_text) LIKE "%“The world as we have created it is a process of %"
        GROUP BY q.id_quote;

 /* Filtrar citas por autor */
SELECT 
            q.quote_text, 
            q.id_quote, 
            a.name_author, 
            GROUP_CONCAT(t.name_tag SEPARATOR ', ') AS tags
        FROM quote q
        INNER JOIN author a ON q.id_author = a.id_author
        INNER JOIN quote_tag qt ON q.id_quote = qt.id_quote
        INNER JOIN tag t ON t.id_tag = qt.id_tag
        WHERE LOWER(a.name_author) LIKE "a%"
        GROUP BY q.id_quote;
        
/* Traer solo a los autores*/
 SELECT  a.id_author, a.name_author 
FROM author a order by a.id_author;

/* Filtar por etiqueta*/

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
HAVING FIND_IN_SET('love', tags);

/* Traer solo las etiquetas*/

select t.id_tag,t.name_tag from tag t order by t.id_tag;



