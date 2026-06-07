const app = require('./app');
const config = require('./config');
const connectDB = require('./db/dbconn');

connectDB()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  })
  .catch(() => {
    process.exit(1);
  });