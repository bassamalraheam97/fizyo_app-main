import express from "express";
import AnnouncementController from "../controllers/announcement_controller";

const router = express.Router();

router.get("/", (_req, res) => {
  const controller = new AnnouncementController();

  controller
    .getAnnouncements()
    .then((Response) => {
      res.send(Response);
    })
    .catch((err) => {
      res.status(422).send(err);
    });
});

router.get("/:announcementId", (req, res) => {
  const controller = new AnnouncementController();
  controller
    .getAnnouncement(req.params.announcementId)
    .then((Response) => {
      res.send(Response);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send("the requested announcement not found");
    });
});

router.delete("/:announcementId", (req, res) => {
  const controller = new AnnouncementController();
  controller
    .deleteAnnouncement(req.params.announcementId)
    .then((_) => {
      res.send("deleted");
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send("the requested announcement not found ");
    });
});

router.post("/create", (req, res) => {
  const controller = new AnnouncementController();
  controller
    .createAnnouncement(req.body)
    .then((_) => {
      res.send("Created");
    })
    .catch((err) => {
      console.log("err");
      res.status(422).send(err);
    });
});

router.put("/update/:announcementId", (req, res) => {
  const controller = new AnnouncementController();
  controller
    .updateAnnouncement(req.params.announcementId, req.body)
    .then((response) => {
      if (response != null) res.send("updated");
      else res.status(422).send("the requested announcement in not found");
    })
    .catch((err) => {
      res.status(422).send(err);
    });
});

export default router;
