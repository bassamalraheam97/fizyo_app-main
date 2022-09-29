import express from "express";
import ServiceProvidersController from "../controllers/service_providers_controller";

const router = express.Router();

router.get("/", async (req, res) => {
  const controller = new ServiceProvidersController();
  controller
    .getServiceProviders()
    .then(async (response) => {
      await res.send(response);
    })
    .catch((err) => {
      res.status(422).send(err);
    });
});

router.get("/:serviceProviderId", (req, res) => {
  const controller = new ServiceProvidersController();
  controller
    .getServiceProvider(req.params.serviceProviderId)
    .then(async (response) => await res.send(response))
    .catch((err) => res.status(404).send(err));
});

router.delete("/:serviceProviderId", (req, res) => {
  const controller = new ServiceProvidersController();
  controller
    .deleteServiceProvider(req.params.serviceProviderId)
    .then(async (response) => await res.send(response))
    .catch((err) => res.status(404).send(err));
});

router.post("/create", async (req, res) => {
  const controller = new ServiceProvidersController();
  await controller
    .createServiceProvider(req.body)
    .then((response) => res.send(response))
    .catch((err) => res.status(422).send(err));
});

router.put("/update/:serviceProviderId", async (req, res) => {
  const controller = new ServiceProvidersController();
  await controller
    .updateServiceProvider(req.params.serviceProviderId, req.body)
    .then(async (response) => await res.send(response))
    .catch((err) => res.status(422).send(err));
});

export default router;
