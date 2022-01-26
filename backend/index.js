import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const jsonParser = bodyParser.json();
app.use(jsonParser);

app.get('/', (req, res) => {
    res.send("HEMLO");
})
const PORT = 8000;
app.listen(PORT, () => {
    console.log("Backend Server Started");
})