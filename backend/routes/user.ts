import express, { Router, Request, Response } from "express";
import { User } from "../Schemas/user";
import * as argon2d from "argon2";
export const router: Router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (email === undefined || password === undefined) {
      throw new Error("Email or password missing.");
    }
    const user = await User.find({ email: email }).exec();
    if (user.length == 0) {
      return res.status(400).send({ message: "User doesn't exist." });
    }
    if (await argon2d.verify(user[0].password!, password)) {
      return res.status(200).send({ user: user[0], message: "success" });
    }

    res.status(400).send({ message: "Wrong email or password" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
});
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;
    if (
      email === undefined ||
      username === undefined ||
      password === undefined
    ) {
      throw new Error("Email, username or password missing.");
    }
    const result = await User.find({
      $or: [{ email: email }, { username: username }],
    }).exec();

    if (result.length !== 0) {
      return res.status(400).send({ message: "User already exists." });
    }
      const hashedPassword = await argon2d.hash(password);
      const user = await User.insertMany({
        ...req.body,
        password: hashedPassword,
      });
      res.status(200).send({ user: user[0], message: "success" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
});
router.get("/all", async (_: Request, res: Response) => {
  try {
    const result = await User.find({});
    res.status(200).send({users:result});
  } catch (error) {
    res.status(500).send({ message: error });
  }
});
router
  .route("/:id")
  .get(async (req: Request, res: Response) => {
    try {
      const result = await User.findById(req.params.id).exec();
      res.status(200).send({user:result});
    } catch (error) {
      res.status(500).send({ message: error });
    }
  })
  .put(async (req: Request, res: Response) => {
    try {
      await User.updateOne({ _id: req.params.id }, req.body);
      res.status(200).send({ message: "success" });
    } catch (error) {
      res.status(500).send({ message: error });
    }
  })
  .delete(async (req: Request, res: Response) => {
    try {
      await User.deleteOne({ _id: req.params.id });
      res.status(200).send({ message: "success" });
    } catch (error) {
      res.status(500).send({ message: error });
    }
  });
