import express from "express";
import RolesController from "../controllers/roles_controller";

const router = express.Router();

router.get("/", async (req, res) => {
  const controller = new RolesController();
  controller
    .getRoles()
    .then(async (response) => {
      await res.send(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(422).send(err);
    });
});

router.get("/:roleId", (req, res) => {
  const controller = new RolesController();
  controller
    .getRole(req.params.roleId)
    .then(async (response) => await res.send(response))
    .catch((err) => res.status(404).send(err));
});

router.delete("/:roleId", (req, res) => {
  const controller = new RolesController();
  controller
    .deleteRole(req.params.roleId)
    .then(async (response) => await res.send(response))
    .catch((err) => res.status(404).send(err));
});

router.post("/create", async (req, res) => {
  const controller = new RolesController();
  await controller
    .createRole(req.body)
    .then((response) => res.send(response))
    .catch((err) => res.status(422).send(err));
});

router.put("/update/:roleId", async (req, res) => {
  const controller = new RolesController();
  await controller
    .updateRole(req.params.roleId, req.body)
    .then(async (response) => await res.send(response))
    .catch((err) => res.status(422).send(err));
});

export default router;