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
    cb(null, "public/uploads");
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
  const filenames = []
  req.files.forEach(file => {
    filenames.push(file.filename)
  })
  res.send({
    filename: filenames
  })
});

export default handler;