//IMPORTS:
const express = require(`express`);
const fs = require(`fs`);
const multer = require(`multer`);
const {TesseractWorker} = require(`tesseract.js`);

const app = express();

const worker = new TesseractWorker();
console.log(worker)

//STORAGE:
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req,file,cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({storage: storage}).single(`avatar`);

app.set("views", "./views");
app.set('view engine', 'ejs');


//ROUTES:
app.get("/", (req, res) => res.render("index"));

app.post("/upload", (req,res) => {
  upload(req,res,err => {
    console.log(req);
    // console.log(req.file);
    fs.readFile(`./uploads/${req.file.originalname}`, (err, data) => {
      if(err) return console.log(`this is your error:`, err);

      worker
      .recognize(data, "eng", {tessjs_create_pdf: '1'})
      .progress(progress => {
        console.log(progress);
      })
      .then(result => {
        console.log("WHAT IS RESULT??", result.text)
        // res.redirect('/download')

        console.log("=========================================== REGEX FROM TXT ====================================================");
        const paragraph = result.text;
        const found = paragraph.match(/[E]\d{3}/gi);
        console.log(`first extraction attempt:`,found);

        const noDuplicates = [...new Set(found)];
        console.log(`no duplicates:`,noDuplicates);
      })
      .finally(()=> worker.terminate());
    })
  })
})

//START UP SERVER
const PORT = 5001 || process.env.PORT;

app.listen(PORT, ()=> console.log(`hey, I'm listening on port ${PORT}`));