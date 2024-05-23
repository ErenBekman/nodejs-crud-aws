const dynamoDB = require('../utils/dynamodb');
const httpStatus = require("http-status");
const { createResponse } = require('../utils/helper');
const tableName = 'categories-dev';

module.exports = {
    getBookCategory: async (id) => {
        try {
            const book = await dynamoDB.getItem(tableName, id);
            if (!book) {
                return createResponse(httpStatus.NOT_FOUND, { error: 'Category not found' });
            }
            return createResponse(httpStatus.OK, book);
        } catch (error) {
            return createResponse(httpStatus.INTERNAL_SERVER_ERROR, { error: error.message });
        }
    },  
    createCategory: async (data) => {
        try {
            await dynamoDB.createItem(tableName, data);
            return createResponse(httpStatus.CREATED, data);
        } catch (error) {
            return createResponse(httpStatus.INTERNAL_SERVER_ERROR, { error: error.message });
        }
    },
    updateCategory: async (id,book) => {
        try {
            const updatedBook = await dynamoDB.updateItem(tableName, id, book);
            return createResponse(httpStatus.OK, updatedBook);
        } catch (error) {
            return createResponse(httpStatus.INTERNAL_SERVER_ERROR, { error: error.message });
        }
    },
    deleteCategory: async (id) => {
        try {
            await dynamoDB.deleteItem(tableName, id);
            return createResponse(httpStatus.OK, { message: 'Category deleted successfully' });
        } catch (error) {
            return createResponse(httpStatus.INTERNAL_SERVER_ERROR, { error: error.message });
        }
    },
};