const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Pharmacist = require("../models/Pharmacist");
const Patient = require("../models/Patient");
const Applicant = require("../models/Applicant");

const registerPatient = asyncHandler(async (req, res) => {

  const existingPatient = await Patient.findOne({ email: req.body.email });

  if (existingPatient) {
    return res.status(400).json({ message: "Email already registered" });
  }

  const saltRounds = await bcrypt.genSalt(10); // You can adjust the number of salt rounds for security
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

  const patient = await Patient.create({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    dateOfBirth: req.body.dateOfBirth,
    gender: req.body.gender,
    mobileNumber: req.body.mobileNumber,
    emergencyContact: req.body.emergencyContact,
  });

  res.status(200).json(patient);
});

const registerPharmacist = asyncHandler(async (req, res) => {
  try {
    const existingPharmacist = await Applicant.findOne({email:req.body.email})
    const existPharm = await Pharmacist.findOne({email:req.body.email})
    if(existingPharmacist || existPharm){
      return res.status(400).json({ message: "Email already registered" });
    }
    const saltRounds = await bcrypt.genSalt(10); // You can adjust the number of salt rounds for security
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    console.log("FROM CONTROLLER: ", req.body.username);
    const pharmacist = await Applicant.create({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      dateOfBirth: req.body.dateOfBirth,
      hourlyRate: req.body.hourlyRate,
      affiliation: req.body.affiliation,
      educationalBackground: req.body.educationalBackground,
      status: "pending",
    });

    res.status(200).json(pharmacist);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});
module.exports = { registerPatient, registerPharmacist };
