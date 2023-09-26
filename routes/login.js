import { Router } from "express";
import userModel from "../models/user.models.js";
import { jwt_token } from "../libs/jwt.js";
import { comparePassword } from "../utils/auth.js";

const router = Router();

router.post("/", async (req, res, next) => {
  const responseJson = {
    success: false,
    data: null,
    error: null,
  };
  const { user, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await userModel.findOne({ user: user });
  } catch {
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }

  if (!existingUser) {
    responseJson.error = "User Not Found";
    res.json(responseJson);
    return next(new Error(responseJson.error));
  }

  comparePassword(password, existingUser.password).then((resp) => {
    if (!resp) {
      responseJson.error = "Password is Incorrect";
      res.json(responseJson);
    }

    const token = jwt_token(user, email);

    responseJson.success = true;
    responseJson.data = {
      userId: user,
      email: email,
      token: token,
    };

    res.json(responseJson);
  });
});

export default router;
