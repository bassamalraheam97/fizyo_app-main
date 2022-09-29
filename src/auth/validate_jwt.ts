const jwt = require("jsonwebtoken");
import express from "express";

import { IUser } from "../types/interfaces";

const UsersModel = require("../models/users_model");

const validateJWT = async (req: any, res: any, next: any) => {
  if (
    req.path.includes("/users/login") ||
    req.path.includes("/users/create") ||
    req.path.includes("/docs") ||
    req.path == "/"
  ) {
    next();
    return;
  }

  // read token
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      ok: false,
      msj: "request has no token",
    });
  }

  try {
    // Try to verify token, if not go to catch
    const user = jwt.verify(token, process.env.SECRET);
    await UsersModel.findOneById(user.id)
      .then((user: IUser) => {
        req.user = user;
        next();
      })
      .catch((err: any) => {
        return res.status(401).json({
          ok: false,
          msj: "token invalid",
        });
      });

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msj: "token invalid",
    });
  }
};

module.exports = {
  validateJWT,
};
