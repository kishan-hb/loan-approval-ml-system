const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const loanRoute = require('./routes/loanRoute');
const notFound = require('./middleware/notFound');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', loanRoute);

app.use(notFound);
app.use(errorMiddleware);

module.exports = app;