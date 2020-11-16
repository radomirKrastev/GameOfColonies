const dotenv = require('dotenv');
dotenv.config();

const {
    DB_NAME,
    MONGO_PASSWORD,
    API_PORT
} = process.env;

exports.DB_URL = `mongodb+srv://radomir:${MONGO_PASSWORD}@cluster0.17orc.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
exports.API_PORT = API_PORT;
