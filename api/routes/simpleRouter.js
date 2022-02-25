const express=require('express');
const router=express.Router();

const simpleController = require('../controller/simpleController');

 router.post("/", simpleController.create);

  router.get("/", simpleController.getAll);

  router.get("/:id", simpleController.findById);

  router.put("/:id", simpleController.update);

  router.delete("/:id", simpleController.deletet);

  router.delete("/", simpleController.deleteAll);

module.exports=router;