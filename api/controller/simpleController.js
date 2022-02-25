const router = require('../model/simpleModel');
const express=require('express');


exports.create=(req,res)=>{
    if (!req.body) {
        res.status(400).send({
          message: "Empty request!"
        });
    }
    const newsText=new simpleText({
        router: req.body.simpletext
    });
    router.create(newsText,(err,data)=>{
        if (err)
            res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Tutorial."
        });
        else res.send(data);
    });
}
exports.getAll=(req,res)=>{
    router.getAll(req.query.text, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving texts."
      });
    else res.send(data);
    });
}
exports.findById=(req,res)=>{
    router.findByIds(req.params.id, (err, data) => {
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

  router.updateById(
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
exports.deletet = (req, res) => {
  router.remove(req.params.id, (err, data) => {
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
  router.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all texts."
      });
    else res.send({ message: `All texts were deleted successfully!` });
  });
};

