const app = require('./app');
const path = require('path');
const env = require('dotenv');
const envFilePath = path.resolve(__dirname, './.env');
env.config({ path: envFilePath });

app.listen(
    process.env.PORT, 
    () => console.log(`Node server listening at http://localhost:${process.env.PORT}/`)
);
