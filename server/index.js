const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config');
const connectDB = require('./db/dbconn');
const loanRoute = require('./routes/loanRoute');
const notFound = require('./middleware/notFound');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();
const port = config.port;

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', loanRoute);

app.use(notFound);
app.use(errorMiddleware);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(() => {
    process.exit(1);
  });