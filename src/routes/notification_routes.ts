import express from "express";
import NotificationController from "../controllers/notification_controller";

const router = express.Router();

router.get("/", (_req, res) => {
  const controller = new NotificationController();

  controller
    .getNotifications()
    .then((Response) => {
      res.send(Response);
    })
    .catch((err) => {
      res.status(422).send(err);
    });
});

router.get("/:notificationId", (req, res) => {
  const controller = new NotificationController();
  controller
    .getNotification(req.params.notificationId)
    .then((Response) => {
      res.send(Response);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send("the requested notification not found");
    });
});

router.delete("/:notificationId", (req, res) => {
  const controller = new NotificationController();
  controller
    .deleteNotification(req.params.notificationId)
    .then((_) => {
      res.send("deleted");
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send("the requested notification not found ");
    });
});

router.post("/create", (req, res) => {
  const controller = new NotificationController();
  controller
    .createNotification(req.body)
    .then((_) => {
      res.send("Created");
    })
    .catch((err) => {
      console.log("err");
      res.status(422).send(err);
    });
});

router.put("/update/:notificationId", (req, res) => {
  const controller = new NotificationController();
  controller
    .updateNotification(req.params.notificationId, req.body)
    .then((response) => {
      if (response != null) res.send("updated");
      else res.status(422).send("the requested notification in not found");
    })
    .catch((err) => {
      res.status(422).send(err);
    });
});

export default router;
