import express from "express";
import UsersController from "../controllers/users_controller";
import { IUser } from "../types/interfaces";
import passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", async (req, res) => {
  const controller = new UsersController();
  controller
    .getUsers()
    .then(async (response) => {
      await res.send(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(422).send(err);
    });
});

router.get("/:userId", (req, res) => {
  const controller = new UsersController();
  controller
    .getUser(req.params.userId)
    .then(async (response) => await res.send(response))
    .catch((err) => res.status(404).send(err));
});

router.delete("/:userId", (req, res) => {
  const controller = new UsersController();
  controller
    .deleteUser(req.params.userId)
    .then(async (response) => await res.send(response))
    .catch((err) => res.status(404).send(err));
});

router.post("/create", async (req, res) => {
  const controller = new UsersController();
  await controller
    .createUser(req.body)
    .then((response) => res.send(response))
    .catch((err) => {
      console.log(err);
      res.status(422).send(err);
    });
});

router.put("/update/:userId", async (req, res) => {
  const controller = new UsersController();
  await controller
    .updateUser(req.params.userId, req.body)
    .then(async (response) => await res.send(response))
    .catch((err) => res.status(422).send(err));
});
router.post("/login", async (req: any, res: any, next) => {
  passport.authenticate("login", async (err: any, user: IUser, info: any) => {
    try {
      console.log(req.body);
      if (err || !user) {
        console.log("error:=====", err);

        const error = new Error("An error occurred.");
        return next(error);
      }
      req.login(user, { session: false }, async (error: any) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, process.env.SECRET, {});
        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

export default router;
