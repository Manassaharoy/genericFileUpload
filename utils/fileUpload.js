const multer = require("multer");
const path = require("path");

let sourcePath = "./public/uploads/profilePhotos";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, sourcePath);
  },
  filename: async (req, file, cb) => {
    const { originalname } = file;

    // console.log("File ---->", file);
    const filename = Date.now() + "-" + originalname;
    cb(null, filename);
  },
});

function fileFilter(req, file, cb) {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    // You can always pass an error if something goes wrong:
    cb(new Error("Only image"), false);
  }
}

const uploadOne = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1000 * 1000, // mb * kb * byte
    files: 1,
  },
});

const uploadMany = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1000 * 1000, // mb * kb * byte
  },
});

const uploadSingle = uploadOne.single("file");
const uploadMultiple = uploadMany.array("files");

module.exports = {
  uploadSingle,
  uploadMultiple,
  uploadOne,
};
