const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

const itemsFilePath = path.resolve(__dirname, 'items.txt');

app.get('/api/items', (req, res) => {
    fs.readFile(itemsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Failed to read file:', err);
            res.status(500).send('Error reading file');
            return;
        }
        try {
            const items = JSON.parse('[' + data.replace(/\},\s*$/, '') + ']');
            res.json(items);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(500).send('Error parsing data');
        }
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
