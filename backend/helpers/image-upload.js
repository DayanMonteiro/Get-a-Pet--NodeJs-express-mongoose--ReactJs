const multer = require("multer");
const path = require("path");

// Destination to store the images
const imagesStorage = multer.diskStorage({
  destination: function (req, file, funCallback) {
    let folder = "";

    if (req.baseUrl.includes("users")) {
      folder = "users";
    } else if (req.baseUrl.includes("pets")) {
      folder = "pets";
    }

    funCallback(null, `public/images/${folder}`);
  },
  filename: function (req, file, funCallback) {
    funCallback(
      null,
      Date.now() +
        String(Math.floor(Math.random() * 1000)) +
        path.extname(file.originalname)
    );
  },
});

const imageUpload = multer({
  storage: imagesStorage,
  fileFilter(req, file, funCallback) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      return funCallback(
        new Error("Por favor, envie apenas imagens jpg ou png!")
      );
    }
    funCallback(undefined, true);
  },
});

module.exports = { imageUpload };
