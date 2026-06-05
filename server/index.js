const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config');
const connectDB = require('./db/dbconn');

const app = express();
const port = config.port;
const loanRoute = require('./routes/loanRoute');

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', loanRoute);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  return res.status(status).json({
    error: err.message || 'Internal server error'
  });
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(() => {
    process.exit(1);
  });