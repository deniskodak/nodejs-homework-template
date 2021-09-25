const express = require("express");
const router = express.Router();

const {
  validation,
  authenticate,
  asyncWrapper,
  upload,
} = require("../../middlewares");

const {
  joiSchemaAddUser,
  joiSchemaChangeUser,
  joiSchemaVerifyEmail,
} = require("../../model");

const {
  removeUser,
  getCurrentUser,
  changeUser,
  changeAvatar,
} = require("../../controllers/users");

const {
  registration,
  login,
  logout,
  verifyEmailByToken,
  verifyEmailByPostRequest,
} = require("../../controllers/auth");

const userPostValidation = validation(joiSchemaAddUser);
const userPatchValidation = validation(joiSchemaChangeUser);

router.post("/signup", userPostValidation, asyncWrapper(registration));

router.post("/login", userPostValidation, asyncWrapper(login));

router.delete("/:userId", asyncWrapper(removeUser));

router.post("/logout", authenticate, asyncWrapper(logout));

router.get("/current", authenticate, asyncWrapper(getCurrentUser));

router.patch("/", authenticate, userPatchValidation, asyncWrapper(changeUser));

router.patch(
  "/avatar",
  authenticate,
  upload.single("avatar"),
  asyncWrapper(changeAvatar)
);

router.get("/verify/:verificationToken", asyncWrapper(verifyEmailByToken));

router.post(
  "/verify/",
  validation(joiSchemaVerifyEmail),
  asyncWrapper(verifyEmailByPostRequest)
);

module.exports = router;
