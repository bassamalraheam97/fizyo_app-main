import express from "express";
import EmployeesController from "../controllers/employees_controller";

const router = express.Router();

router.get("/", async (req, res) => {
  const controller = new EmployeesController();
  controller
    .getEmployees()
    .then(async (response) => {
      await res.send(response);
    })
    .catch((err) => {
      res.status(422).send(err);
    });
});

router.get("/:employeeId", (req, res) => {
  const controller = new EmployeesController();
  controller
    .getEmployee(req.params.employeeId)
    .then(async (response) => await res.send(response))
    .catch((err) => res.status(404).send(err));
});

router.delete("/:employeeId", (req, res) => {
  const controller = new EmployeesController();
  controller
    .deleteEmployee(req.params.employeeId)
    .then(async (response) => await res.send(response))
    .catch((err) => res.status(404).send(err));
});

router.post("/create", async (req, res) => {
  const controller = new EmployeesController();
  await controller
    .createEmployee(req.body)
    .then((response) => res.send(response))
    .catch((err) => res.status(422).send(err));
});

router.put("/update/:employeeId", async (req, res) => {
  const controller = new EmployeesController();
  await controller
    .updateEmployee(req.params.employeeId, req.body)
    .then(async (response) => await res.send(response))
    .catch((err) => res.status(422).send(err));
});

export default router;