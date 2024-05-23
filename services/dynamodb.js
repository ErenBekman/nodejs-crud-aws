const AWS = require('aws-sdk');
const { database } = require('../config');

AWS.config.update({ 
    region: database.region,
    accessKeyId: database.access_key_id,
    secretAccessKey: database.secret_access_key
 });

const dynamoDB = new AWS.DynamoDB.DocumentClient();
module.exports = dynamoDB;
