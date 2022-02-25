const simpleText = require('../model/simpleModel');

exports.create=(req,res)=>{
    if (!req.body) {
        res.status(400).send({
          message: "Empty request!"
        });
    }
    const newsText=new simpleText({
        simpletext: req.body.simpletext
    });
    simpleText.create(newsText,(err,data)=>{
        if (err)
            res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Tutorial."
        });
        else res.send(data);
    });
};
exports.getAll=(req,res)=>{
    simpleText.getAll(req.query.simpletext, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving texts."
      });
    else res.send(data);
    });
}
exports.findById=(req,res)=>{
    simpleText.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found text with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving text with id " + req.params.id
        });
      }
    } else res.send(data);
  });
}
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  simpleText.updateById(
    req.params.id,
    new simpletext(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found text with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating text with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};
exports.delete = (req, res) => {
  simpleText.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found text with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete text with id " + req.params.id
        });
      }
    } else res.send({ message: `Tutorial was deleted successfully!` });
  });
};
exports.deleteAll = (req, res) => {
  simpleText.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all texts."
      });
    else res.send({ message: `All texts were deleted successfully!` });
  });
};
