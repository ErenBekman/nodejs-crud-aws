const dynamoDB = require('../services/dynamodb');
const { v4: uuidv4 } = require('uuid');

const getAllItems = async (tableName) => {
    const params = {
        TableName: tableName,
    };
    const result = await dynamoDB.scan(params).promise();
    return result.Items;
};

const getItem = async (tableName, id) => {
    const params = {
        TableName: tableName,
        Key:{ id },
    };
    const result = await dynamoDB.get(params).promise();
    return result.Item;
};

const createItem = async (tableName, item) => {
    item.id = uuidv4();
    const params = {
        TableName: tableName,
        Item: item,
    };
    await dynamoDB.put(params).promise();
    return item;
};

const updateItem = async (tableName, id, item) => {
    const params = {
        TableName: tableName,
        Key: { id },
        UpdateExpression: 'set info = :info',
        ExpressionAttributeValues: {
            ':info': item,
        },
        ReturnValues: 'UPDATED_NEW',
    };
    const result = await dynamoDB.update(params).promise();
    return result.Attributes;
};

const deleteItem = async (tableName, id) => {
    const params = {
        TableName: tableName,
        Key: { id },
    };
    await dynamoDB.delete(params).promise();
    return { id };
};

module.exports = {
    getAllItems,
    getItem,
    createItem,
    updateItem,
    deleteItem,
};