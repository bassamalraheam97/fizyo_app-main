import express from 'express';
import DisputeController from '../controllers/dispute_controller';

const router = express.Router();

router.get('/', (req, res) => {
  const controller = new DisputeController();
  controller
    .getDisputes()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.status(422).send(err);
    });
});

router.get('/:disputeId', (req, res) => {
  const controller = new DisputeController();
  controller
    .getDispute(req.params.disputeId)
    .then((response) => res.send(response))
    .catch((err) => res.status(404).send(err));
});

router.delete('/:disputeId', (req, res) => {
  const controller = new DisputeController();
  controller
    .deleteDispute(req.params.disputeId)
    .then((response) => res.send(response))
    .catch((err) => res.status(404).send(err));
});

router.post('/create', (req, res) => {
  const controller = new DisputeController();
  controller
    .createDispute(req.body)
    .then((response) => res.send(response))
    .catch((err) => res.status(422).send(err));
});

router.put('/update/:disputeId', (req, res) => {
  const controller = new DisputeController();
  controller
    .updateDispute(req.params.disputeId, req.body)
    .then((response) => res.send(response))
    .catch((err) => res.status(422).send(err));
});

export default router;
