const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.REGION });
const cognito = new AWS.CognitoIdentityServiceProvider();
const config = require('../config');
const { CognitoJwtVerifier } = require('aws-jwt-verify');

const verifier = CognitoJwtVerifier.create({
    userPoolId: config.cognito.pool_id,
    clientId: config.cognito.client_id,
    tokenUse: "access",
  });

module.exports = async (req, res, next) => {    
    try {
        const token = req.headers?.authorization?.replace("Bearer ", "");
        const payload = await verifier.verify(token);
        
        if (!payload) {
            return res.status(401).send('Unauthorized');
        }

        const user = await cognito.getUser({ AccessToken: token }).promise();
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send('Unauthorized');
    }
};
