import express from "express";
import SessionController from "../controllers/session_controller";

const router = express.Router();

router.get("/", (_req, res) => {
  const controller = new SessionController();

  controller
    .getSessions()
    .then((Response) => {
      res.send(Response);
    })
    .catch((err) => {
      res.status(422).send(err);
    });
});

router.get("/:sessionId", (req, res) => {
  const controller = new SessionController();
  controller
    .getSession(req.params.sessionId)
    .then((Response) => {
      res.send(Response);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send("the requested session not found");
    });
});

router.delete("/:sessionId", (req, res) => {
  const controller = new SessionController();
  controller
    .deleteSession(req.params.sessionId)
    .then((_) => {
      res.send("deleted");
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send("the requested session not found ");
    });
});

router.post("/create", (req, res) => {
  const controller = new SessionController();
  controller
    .createSession(req.body)
    .then((_) => {
      res.send("Created");
    })
    .catch((err) => {
      console.log("err");
      res.status(422).send(err);
    });
});

router.put("/update/:sessionId", (req, res) => {
  const controller = new SessionController();
  controller
    .updateSession(req.params.sessionId, req.body)
    .then((response) => {
      if (response != null) res.send("updated");
      else res.status(422).send("the requested session in not found");
    })
    .catch((err) => {
      res.status(422).send(err);
    });
});

export default router;
