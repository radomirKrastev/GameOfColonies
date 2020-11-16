// mongo connection string
//mongodb+srv://radomir:<password>@cluster0.17orc.mongodb.net/<dbname>?retryWrites=true&w=majority

const dotenv = require('dotenv');
dotenv.config();

const {
    // ALGOLIA_ID,
    // ALGOLIA_SEARCH_API_KEY,
    // ALGOLIA_INDEX_NAME,
    DB_NAME,
    MONGO_PASSWORD,
    API_PORT,
    // API_KEY,
    // SALT_ROUNDS
} = process.env;




// export const DB_URL = `mongodb+srv://saurav:${MONGO_PASSWORD}@fifa.ejduy.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
exports.DB_URL = `mongodb+srv://radomir:${MONGO_PASSWORD}@cluster0.17orc.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
exports.API_PORT = process.env.API_PORT;
// export const MAX_TIMER_DEFAULT = 120 * 1000;
// export const MAX_PLAYERS_DEFAULT = 14;

// export let hosts = [];
// if (process.env.NODE_ENV === 'production') {
//     hosts = ['https://fifa.sauravmh.com', 'https://sauravmh.vercel.app'];
// } else {
//     hosts = ['http://localhost:3000'];
// }

// export const ROOM_ID_RX = /^([A-Z0-9]){6}$/;

// export const ATTRIBUTES_TO_RETRIEVE = ['name', 'positions', 'Overall Rating', 'Skill Moves', 'objectID', 'photo_url'];

// module.exports = {DB_NAME,
//     MONGO_PASSWORD,
//     API_PORT, DB_URL};

// module.exports = DB_URL;