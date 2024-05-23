const { validationResult, body } = require("express-validator");
module.exports = {
  body,
  express_validate: function (req, res, next) {
    const errors = validationResult(req).formatWith(({ location, msg, param, value, nestedErrors }) => {
      return [msg];
    });

    if (errors.isEmpty()) {
      next();
    } else {
      return res.status(422).json({ errors: errors.mapped() });
    }
  },
};
