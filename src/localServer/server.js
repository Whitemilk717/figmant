/* Requires
------------------------------------------------------------ */
const cors = require('cors');       // Cross-Origin Resource Sharing
const fs = require('fs').promises;  // Asynchronous file system methods
const express = require('express'); // Express library for web servers


/* Data
------------------------------------------------------------ */
const port = 3000;
const app = express();

app.use(cors());
app.use(express.text());    // middleware that parses incoming HTTP request bodies with a text/plain content type


/* Routes
------------------------------------------------------------ */
app.post('/', (req, res) => {
    appendToFile(req, res);
});


/* Server port
------------------------------------------------------------ */
app.listen(port, (err) => {
    if (err) console.log('Error in server setup');
    console.log(`Local server is listening on port ${port}...`);
});



/* Function to write to file
------------------------------------------------------------ */
async function appendToFile(req, res) {

    try {
        await fs.appendFile(`${__dirname}/log.txt`, req.body + '\n');
        console.log('Log entry added');
        res.status(200).send();
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
}