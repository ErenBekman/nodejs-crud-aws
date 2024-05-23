const router = require("express").Router();
const httpStatus = require("http-status");
const { auth, validate } = require('../../middleware');
const bookCategoryHandlers = require('../../handlers/bookCategoryHandlers');

module.exports = function (app) {

  router.get('/:id', auth, (req, res) => {
    const { id } = req.params;
    bookCategoryHandlers.getBookCategory(id)
        .then(response => res.status(response.statusCode).send(response.body))
        .catch(error => res.status(500).send(error.message));
  });

  router.post('/', auth, (req, res) => {
      bookCategoryHandlers.createCategory(req.body)
          .then(response => res.status(response.statusCode).send(response.body))
          .catch(error => res.status(500).send(error.message));
  });

  router.put('/:id', auth, (req, res) => {
        const { id } = req.params;
      bookCategoryHandlers.updateCategory(id, req.body)
          .then(response => res.status(response.statusCode).send(response.body))
          .catch(error => res.status(500).send(error.message));
  });

  router.delete('/:id', auth, (req, res) => {
      const { id } = req.params;
      bookCategoryHandlers.deleteCategory(id)
          .then(response => res.status(response.statusCode).send(response.body))
          .catch(error => res.status(500).send(error.message));
  });

  app.use("/api/book/category", router);
};