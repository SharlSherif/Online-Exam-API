const { Router } = require("express");
const { encode } = require("../utils/jwt");
const router = Router();

const QuestionsController = require("../controllers/questions.controller");
const AuthMiddleware = require("../middlewares/auth.middleware");
const RoleMiddleware = require("../middlewares/role.middleware");

// use this route for seeding the database with the required data based on the Product schema model
router.post(
  "/",
  AuthMiddleware,
  // ensure that only the examiner user type can add a new question
  (req, res, next) => RoleMiddleware(req, res, next, "examiner"),
  QuestionsController.create
);

router.get(
  "/",
  AuthMiddleware,
  // ensure that only the examiner user type can fetch questions
  (req, res, next) => RoleMiddleware(req, res, next, "examiner"),
  QuestionsController.getData
);

module.exports = router;
