const express = require("express");
const app = express();
const path = require("path");
const {
  uploadSingle,
  uploadMultiple,
  uploadOne,
  compressImage,
} = require("./utils/fileUpload");
const {
  uploadSingleImage,
  uploadMultipleFiles,
} = require("./utils/advancedFileUpload");
const port = process.env.PORT || 6000;

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.put("/single/", uploadSingle, (req, res) => {
  res.send("hello darkness my old friend");
});
app.put("/multi/", uploadMultiple, (req, res) => {
  res.send("hello darkness my old friend");
});

app.put("/single/one", uploadSingleImage, (req, res) => {
  res.send("hello darkness my old friend");
});
app.put("/multi/many", uploadMultipleFiles, (req, res) => {
  res.send("hello darkness my old friend");
});

app.listen(port, () => {
  console.log("Server running on " + port);
});
