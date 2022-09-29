import express from "express";
import EnumController from "../controllers/enum_value_controller";

const router = express.Router();

router.get("/", (_req, res) => {
  const controller = new EnumController();

  controller
    .getEnums()
    .then((Response) => {
      res.send(Response);
    })
    .catch((err) => {
      res.status(422).send(err);
    });
});

router.get("/:enumId", (req, res) => {
  const controller = new EnumController();
  controller
    .getEnum(req.params.enumId)
    .then((Response) => {
      res.send(Response);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send("the requested enum not found");
    });
});

router.delete("/:enumId", (req, res) => {
  const controller = new EnumController();
  controller
    .deleteEnum(req.params.enumId)
    .then((_) => {
      res.send("deleted");
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send("the requested enum not found ");
    });
});

router.post("/create", (req, res) => {
  const controller = new EnumController();
  controller
    .createEnum(req.body)
    .then((_) => {
      res.send("Created");
    })
    .catch((err) => {
      console.log("err");
      res.status(422).send(err);
    });
});

router.put("/update/:enumId", (req, res) => {
  const controller = new EnumController();
  controller
    .updateEnum(req.params.enumId, req.body)
    .then((response) => {
      if (response != null) res.send("updated");
      else res.status(422).send("the requested enum in not found");
    })
    .catch((err) => {
      res.status(422).send(err);
    });
});

export default router;
