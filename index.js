import express from 'express';
const app = express();
const port = process.env.PORT || 8080;
import 'dotenv/config';
import buttonRouter from "./routes/button.router.js";
import ledRouter from "./routes/led.router.js";

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Ok');
})

app.use('/api/button', buttonRouter);
app.use('/api/led', ledRouter);

app.listen(port, () => {
    console.log('API na porcie: ' + port);
})
