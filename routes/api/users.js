const express = require("express");
const router = express.Router();

const { validation, authenticate, asyncWrapper } = require("../../middlewares");
const { joiSchemaAddUser } = require("../../model");
const { addUser, removeUser } = require("../../controllers/users");
const userValidationMiddleware = validation(joiSchemaAddUser);

router.post("/signup", userValidationMiddleware, asyncWrapper(addUser));
router.delete("/:userId", asyncWrapper(removeUser));
module.exports = router;
