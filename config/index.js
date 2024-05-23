require("dotenv").config();
const configs = {
    database: require('./database'),
    cognito: require('./cognito'),
};
module.exports = configs;