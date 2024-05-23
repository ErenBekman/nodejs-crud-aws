const dynamoDB = require('../utils/dynamodb');
const httpStatus = require("http-status");
const { createResponse } = require('../utils/helper');
const tableName = 'user-dev';

module.exports = {
    getUser: async (id) => {
        try {
            const user = await dynamoDB.getItem(tableName, id);
            if (!user) {
                return createResponse(httpStatus.NOT_FOUND, { error: 'User not found' });
            }
            return createResponse(httpStatus.OK, user);
        } catch (error) {
            return createResponse(httpStatus.INTERNAL_SERVER_ERROR, { error: error.message });
        }
    },
    createUser: async (data) => {
        try {
            const newUser = await dynamoDB.createItem(tableName, data);
            return createResponse(httpStatus.CREATED, newUser);
        } catch (error) {
            return createResponse(httpStatus.INTERNAL_SERVER_ERROR, { error: error.message });
        }
    },
};