import express from "express";
import AlarmController from "../controllers/alarm_controller";

const router = express.Router();

router.get("/", (_req, res) => {
  const controller = new AlarmController();

  controller
    .getAlarms()
    .then((Response) => {
      res.send(Response);
    })
    .catch((err) => {
      res.status(422).send(err);
    });
});

router.get("/:alarmId", (req, res) => {
  const controller = new AlarmController();
  controller
    .getAlarm(req.params.alarmId)
    .then((Response) => {
      res.send(Response);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send("the requested alarm not found");
    });
});

router.delete("/:alarmId", (req, res) => {
  const controller = new AlarmController();
  controller
    .deleteAlarm(req.params.alarmId)
    .then((_) => {
      res.send("deleted");
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send("the requested alarm not found ");
    });
});

router.post("/create", (req, res) => {
  const controller = new AlarmController();
  controller
    .createAlarm(req.body)
    .then((_) => {
      res.send("Created");
    })
    .catch((err) => {
      console.log("err");
      res.status(422).send(err);
    });
});

router.put("/update/:alarmId", (req, res) => {
  const controller = new AlarmController();
  controller
    .updateAlarm(req.params.alarmId, req.body)
    .then((response) => {
      if (response != null) res.send("updated");
      else res.status(422).send("the requested alarm in not found");
    })
    .catch((err) => {
      res.status(422).send(err);
    });
});

export default router;
