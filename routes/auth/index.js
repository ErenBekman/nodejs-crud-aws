const router = require("express").Router();
const { auth, validate: { body, express_validate } } = require('../../middleware');
const { userPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute } = require('../../services/cognito');
const userHandler = require('../../handlers/userHandler');
const logger = require('../../logger/Auth');

module.exports = function (app) {
    
    router.post('/register', (req, res) => {
        const { username, email, password } = req.body;

        const attributeList = [];
        const dataEmail = {
            Name : 'email',
            Value : email
        };
        const attributeEmail = new CognitoUserAttribute(dataEmail);
        attributeList.push(attributeEmail);

        userPool.signUp(username, password, attributeList, null, async (err, result) => {
            if (err) {
                console.log(err);
                logger.log({
                    level: "error",
                    message: err
                });
                return;
            }
            const cognitoUser = result.user;
            await userHandler.createUser({ username, email, password });
        });

        res.json({ message: 'User registered successfully' });
        
    });

    router.post('/login', (req, res) => {
        const { username, email, password } = req.body;

        const authenticationData = {
            Username: email,
            Password: password
        };
        const authenticationDetails = new AuthenticationDetails(authenticationData);
        const userData = {
            Username: username,
            Pool: userPool
        };
        const cognitoUser = new CognitoUser(userData);

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: async (result) => {
                const accessToken = result.getAccessToken().getJwtToken();
                const refreshToken = result.getRefreshToken().getToken();
                const idToken = result.getIdToken().getJwtToken();
                const accessTokenExpiresAt = result.getAccessToken().getExpiration();
                
                res.status(200).json({
                    message: 'User logged in successfully',
                    accessToken,
                    refreshToken,
                    idToken,
                    accessTokenExpiresAt
                });
            },

            onFailure: (err) => {
                console.log("err",err);
                logger.log({
                    level: "error",
                    message: err
                });
                res.json({ message: 'User login failed' });
            }
        });

    });

    router.get('/user', auth, (req, res) => {
        res.json(req.user);
    });

    app.use("/api/auth", router);
}
