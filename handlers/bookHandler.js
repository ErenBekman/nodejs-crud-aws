const dynamoDB = require('../utils/dynamodb');
const httpStatus = require("http-status");
const { createResponse } = require('../utils/helper');
const { getBookCategory } = require('./bookCategoryHandlers');
const tableName = 'book-dev';

module.exports = {
    allBooks: async () => {
        try {
            const books = await dynamoDB.getAllItems(tableName);
            return createResponse(httpStatus.OK, books);
        } catch (error) {
            return createResponse(httpStatus.INTERNAL_SERVER_ERROR, { error: error.message });
        }
    },
    getBook: async (id) => {
        try {
            const book = await dynamoDB.getItem(tableName, id);
            if (!book) {
                return createResponse(httpStatus.NOT_FOUND, { error: 'Book not found' });
            }
            return createResponse(httpStatus.OK, book);
        } catch (error) {
            return createResponse(httpStatus.INTERNAL_SERVER_ERROR, { error: error.message });
        }
    },
    getBookCategory: async (id) => {
        try {
            const book = await dynamoDB.getItem(tableName, id);
            if (!book) {
                return createResponse(httpStatus.NOT_FOUND, { error: 'Book not found' });
            }
            const categoryResponse = await getBookCategory(book.categoryID);
            const category = JSON.parse(categoryResponse.body);            
            return createResponse(httpStatus.OK, category.name);
        } catch (error) {
            return createResponse(httpStatus.INTERNAL_SERVER_ERROR, { error: error.message });
        }
    },  
    createBook: async (data) => {
        try {
            await dynamoDB.createItem(tableName, data);
            return createResponse(httpStatus.CREATED, data);
        } catch (error) {
            return createResponse(httpStatus.INTERNAL_SERVER_ERROR, { error: error.message });
        }
    },
    updateBook: async (id,book) => {
        try {
            const updatedBook = await dynamoDB.updateItem(tableName, id, book);
            return createResponse(httpStatus.OK, updatedBook);
        } catch (error) {
            return createResponse(httpStatus.INTERNAL_SERVER_ERROR, { error: error.message });
        }
    },
    deleteBook: async (id) => {
        try {
            await dynamoDB.deleteItem(tableName, id);
            return createResponse(httpStatus.OK, { message: 'Book deleted successfully' });
        } catch (error) {
            return createResponse(httpStatus.INTERNAL_SERVER_ERROR, { error: error.message });
        }
    },
};