import express from "express";
import AgreementsController from "../controllers/agreements_controller";

const router = express.Router();

router.get("/", (req, res) => {
  const controller = new AgreementsController();
  controller
    .getAgreements()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.status(422).send(err);
    });
});

router.get("/:agreementId", (req, res) => {
  const controller = new AgreementsController();
  controller
    .getAgreement(req.params.agreementId)
    .then((response) => res.send(response))
    .catch((err) => res.status(404).send(err));
});

router.delete("/:agreementId", (req, res) => {
  const controller = new AgreementsController();
  controller
    .deleteAgreement(req.params.agreementId)
    .then((response) => res.send(response))
    .catch((err) => res.status(404).send(err));
});

router.post("/create", (req, res) => {
  const controller = new AgreementsController();
  controller
    .createAgreement(req.body)
    .then((response) => res.send(response))
    .catch((err) => res.status(422).send(err));
});

router.put("/update/:agreementId", (req, res) => {
  const controller = new AgreementsController();
  controller
    .updateAgreement(req.params.agreementId, req.body)
    .then((response) => res.send(response))
    .catch((err) => res.status(422).send(err));
});

export default router;
