const express = require("express");
const { personModel } = require("../models/person.model.");

const personRouter = express.Router();

personRouter.get("/persons", async (req, res) => {
  try {
    const persons = await personModel.find();
    if (!persons) {
      return res.status(404).json({status:false, message: "No person found" });
    }
    return res.status(200).json({ status: true, result: persons });
  } catch (err) {
    res
      .status(500)
      .json({ status:false,message: "Internal Server Error", error: err.message });
  }
});

personRouter.get("/person/:id", async (req, res) => {
  try {
    const person = await personModel.find({_id:req.params.id});
    if (!person) {
      return res.status(404).json({status:false, message: "No person found" });
    }
    return res.status(200).json({ status: true, result: person });
  } catch (err) {
    res
      .status(500)
      .json({ status:false,message: "Internal Server Error", error: err.message });
  }
});

personRouter.post("/person/add", async (req, res) => {
  try {
    const { name, age, gender, mobileNumber } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ status: false, message: "Name is required." });
    }

    if (!age) {
      return res
        .status(400)
        .json({ status: false, message: "Age is required." });
    }

    if (!gender) {
      return res
        .status(400)
        .json({ status: false, message: "Gender is required." });
    }

    if (!mobileNumber) {
      return res
        .status(400)
        .json({ status: false, message: "Mobile number is required." });
    }
    const newPerson = new personModel({ name, age, gender, mobileNumber });
    await newPerson.save();
    return res
      .status(201)
      .json({ status: true, message: "Person added successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({
        status: false,
        message: "Internal Server Error",
        error: err.message,
      });
  }
});

personRouter.put("/person/update/:id", async (req, res) => {
  const personId = req.params.id;
  const payload = req.body;
  console.log(payload, personId)
  try {
    if(!personId){
      return res.status(400).json({status:false, message: "Person id is required." });
    }
   
    const updatedPersion = await personModel.findByIdAndUpdate(
      { _id: personId },
      payload,{ new: true }
    );
    if (!updatedPersion) {
      return res
        .status(404)
        .json({status:false, message: `Persion with id: ${personId}, not found !` });
    }
    res.status(200).json({status:true,
      message: `Persion with id ${personId} updated successfully`,
      result: updatedPersion,
    });
  } catch (err) {
    res
      .status(500)
      .send({stauts:false, message: "Internal Server Error", error: err.message });
  }
});

personRouter.delete("/person/delete/:id", async (req, res) => {
  const personId = req.params.id;
  try {
    if(!personId){
      return res.status(400).json({status:false, message: "Person id is required." });
    }
    const personDeleted = await personModel.findByIdAndDelete({ _id: personId });
    if (!personDeleted) {
      return res
        .status(404)
        .json({ status:false, message: `Person with id ${personId} not found !` });
    }
    return res.status(200).json({status:true, message: `Person with id ${personId} deleted successfully.` });
  } catch (err) {
    res
      .status(500)
      .json({status:false, message: "Internal Server Error", error: err.message });
  }
});

module.exports = { personRouter };
