const express = require('express');
const path = require('path');
const { logger, logEvents } = require('./middleware/logger');
const { errorHandler } = require('./middleware/errorHandler');
const bodyParser = require('body-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');


const app = express();
const PORT = process.env.PORT || 3500;


app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Intergalactic Digital API" });
});





app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});