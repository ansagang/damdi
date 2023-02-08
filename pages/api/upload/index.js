import nc from "next-connect";
import multer from "multer";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nc();

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

let upload = multer({
  storage: storage,
});

handler.use(upload.array("images"));
handler.post(async (req, res) => {
  res.send({
    filename: req.files[0].filename
  })
});

export default handler;