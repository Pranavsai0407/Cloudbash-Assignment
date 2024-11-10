const express = require('express');
const { chromium } = require('playwright');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/fetch-word-frequency', async (req, res) => {
    const { url, topN } = req.body;

    try {
        const browser = await chromium.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle' });

        const text = await page.evaluate(() => document.body.innerText);

        await browser.close();

        const wordFrequency = {};
        text.toLowerCase().split(/\s+/).forEach(word => {
            word = word.replace(/[^a-zA-Z]/g, '');
            if (word) {
                wordFrequency[word] = (wordFrequency[word] || 0) + 1;
            }
        });

        const sortedWords = Object.entries(wordFrequency)
            .sort((a, b) => b[1] - a[1])
            .slice(0, topN)
            .map(([word, count]) => ({ word, count }));

        res.json({ words: sortedWords });
    } catch (error) {
        console.error('Error fetching or processing page content:', error);
        res.status(500).json({ error: 'Failed to fetch or process the page content.' });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
