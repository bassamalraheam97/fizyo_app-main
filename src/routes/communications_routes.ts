import express from "express";
import CommunicationsController from "../controllers/communications_controller";

const router = express.Router();

router.get("/", (req, res) => {
  const controller = new CommunicationsController();
  controller
    .getCommunications()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.status(422).send(err);
    });
});

router.get("/:communicationId", (req, res) => {
  const controller = new CommunicationsController();
  controller
    .getCommunication(req.params.communicationId)
    .then((response) => res.send(response))
    .catch((err) => res.status(404).send(err));
});

router.delete("/:communicationId", (req, res) => {
  const controller = new CommunicationsController();
  controller
    .deleteCommunication(req.params.communicationId)
    .then((response) => res.send(response))
    .catch((err) => res.status(404).send(err));
});

router.post("/create", (req, res) => {
  const controller = new CommunicationsController();
  controller
    .createCommunication(req.body)
    .then((response) => res.send(response))
    .catch((err) => res.status(422).send(err));
});

router.put("/update/:communicationId", (req, res) => {
  const controller = new CommunicationsController();
  controller
    .updateCommunication(req.params.communicationId, req.body)
    .then((response) => res.send(response))
    .catch((err) => res.status(422).send(err));
});

export default router;
