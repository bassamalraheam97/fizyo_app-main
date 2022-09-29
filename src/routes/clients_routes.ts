import express from "express";
import ClientsController from "../controllers/clients_controller";

const router = express.Router();

router.get("/", (req, res) => {
  const controller = new ClientsController();
  controller
    .getClients()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.status(422).send(err);
    });
});

router.get("/:clientId", (req, res) => {
  const controller = new ClientsController();
  controller
    .getClient(req.params.clientId)
    .then((response) => res.send(response))
    .catch((err) => res.status(404).send(err));
});

router.delete("/:clientId", (req, res) => {
  const controller = new ClientsController();
  controller
    .deleteClient(req.params.clientId)
    .then((response) => res.send(response))
    .catch((err) => res.status(404).send(err));
});

router.post("/create", (req, res) => {
  const controller = new ClientsController();
  controller
    .createClient(req.body)
    .then((response) => res.send(response))
    .catch((err) => res.status(422).send(err));
});

router.put("/update/:clientId", (req, res) => {
  const controller = new ClientsController();
  controller
    .updateClient(req.params.clientId, req.body)
    .then((response) => res.send(response))
    .catch((err) => res.status(422).send(err));
});

export default router;
