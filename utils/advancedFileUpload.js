const multer = require("multer");
const path = require("path");

let sourcePath = "./public/uploads/profilePhotos";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determine the destination folder based on the file type
    let destination;
    if (file.mimetype.split("/")[0] === "image") {
      destination = "./public/uploads/images";
    } else {
      destination = "./public/uploads/documents";
    }
    cb(null, destination);
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    const filename = Date.now() + "-" + originalname;
    cb(null, filename);
  },
});

function fileFilter(req, file, cb) {
  // Check the file type to allow specific formats
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else if (file.mimetype.split("/")[0] === "application") {
    // Allow only PDF and DOCX files as an example, modify as per your requirements
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF and DOCX files are allowed."), false);
    }
  } else {
    cb(new Error("Only image and document files are allowed."), false);
  }
}

const uploadOne = (fileType) => {
  return multer({
    storage,
    fileFilter,
    limits: {
      fileSize: 2 * 1000 * 1000, // 2MB
      files: 1,
    },
  }).single(fileType);
};

const uploadMany = (fileType) => {
  return multer({
    storage,
    fileFilter,
    limits: {
      fileSize: 2 * 1000 * 1000, // 2MB
    },
  }).array(fileType);
};

module.exports = {
  uploadSingleImage: uploadOne("image"),
  uploadSingleDocument: uploadOne("document"),
  uploadMultipleFiles: uploadMany("files"),
};
