

const puppeteer = require('puppeteer');


async function getDataFromWebPage() {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    let currentPage = 1;
    const allQuotes = [];

    while (true) {
        const url = `https://quotes.toscrape.com/page/${currentPage}/`;
        await page.goto(url, { waitUntil: 'domcontentloaded' });

        const result = await page.evaluate(() => {

            const quoteElements = document.querySelectorAll('.quote');

            return Array.from(quoteElements).map(quoteElement => {
                const text = quoteElement.querySelector('.text').innerText;
                const author = quoteElement.querySelector('.author').innerText;
                const tags = Array.from(quoteElement.querySelectorAll('.tag')).map(tag => tag.innerText);
                return { text, author, tags };

            })
        });
        if (result.length === 0) break;
        currentPage++;
        allQuotes.push(...result);
    }
    await browser.close();

    return allQuotes;
}

module.exports = getDataFromWebPage;