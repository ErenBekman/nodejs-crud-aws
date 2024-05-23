const router = require("express").Router();
const bookHandler = require('../../handlers/bookHandler');
const { 
    auth, 
    validate: { body, express_validate },
 } = require('../../middleware');
const logger = require('../../logger/Book');

module.exports = function (app) {
    router.get('/', auth, async (req, res) => {
        await bookHandler.allBooks()
            .then(response => res.status(response.statusCode).send(response.body))
            .catch(error => res.status(500).send(error.message));
    });

    router.get('/:id', auth, async (req, res) => {
        const { id } = req.params;
        const categoryResponse = await bookHandler.getBookCategory(id)
        const category = JSON.parse(categoryResponse.body);      
        await bookHandler.getBook(id)
            .then(response => res.status(response.statusCode).send({...JSON.parse(response.body), category: category}))
            .catch(error => res.status(500).send(error.message));
             
    });
    
    router.post('/', auth, body("name").isString().optional(), body("author").isString().optional(), body("publishedYear").isNumeric().optional(), body("categoryID").isString().optional(), express_validate, async (req, res) => {
        const { name, author, publishedYear, categoryID } = req.body;
        const item = {
            name,
            author,
            publishedYear,
            categoryID
        };
        await bookHandler.createBook(item)
            .then(response => res.status(response.statusCode).send(response.body))
            .catch(error => {
                logger.log({
                    level: "error",
                    message: error.message
                });
                res.status(500).send(error.message);
            });
    });
    
    router.patch('/:id', auth, (req, res) => {
        const { id } = req.params;
        bookHandler.updateBook(id, req.body)
            .then(response => res.status(response.statusCode).send(response.body))
            .catch(error => {
                logger.log({
                    level: "error",
                    message: error.message
                });
                res.status(500).send(error.message);
            });
    });
    
    router.delete('/:id', auth, (req, res) => {
        const { id } = req.params;
        bookHandler.deleteBook(id)
            .then(response => res.status(response.statusCode).send(response.body))
            .catch(error => res.status(500).send(error.message));
    });

    app.use("/api/book", router);
}
