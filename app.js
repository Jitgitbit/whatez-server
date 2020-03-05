//IMPORTS:
const express = require(`express`);
const fs = require(`fs`);
const multer = require(`multer`);
const {TesseractWorker} = require(`tesseract.js`);
// const Regex = require("regex");
// const regex = new Regex(/[E]/gi);

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

// app.set("view", "ejs");
app.set("views", "./views");
app.set('view engine', 'ejs');

// app.get(`/`, (req, res)=>{
//   res.render(`index`);
// });

//ROUTES:
app.get("/", (req, res) => res.render("index"));

app.post("/upload", (req,res) => {
  upload(req,res,err => {
    console.log(req.file);
    fs.readFile(`./uploads/${req.file.originalname}`, (err, data) => {
      if(err) return console.log(`this is your error:`, err);

      worker
      .recognize(data, "eng", {tessjs_create_pdf: '1'})
      .progress(progress => {
        console.log(progress);
      })
      .then(result => {
        // console.log("WHAT IS RESULT??", Object.keys(result))  // VERY IMPORTANT: ESSENTIAL TO FIND THE OBJECT PROPERTY YOU NEED !!
        console.log("WHAT IS RESULT??", result.text)
        // console.log("WHAT IS RESULT??", result.words)
        res.redirect('/download')

        // const regex = new Regex(result.text);
        // console.log(`first extraction attempt:`,regex);
        console.log("some string");

        const paragraph = result.text;
        // const regex = /[A-Z]/g;
        const found = paragraph.match(/[E]\d{3}/gi);
        console.log(`first extraction attempt:`,found);
        // console.log(regex.test(result.text));
        const noDuplicates = [...new Set(found)];
        console.log(`no duplicates:`,noDuplicates);
      })
      .finally(()=> worker.terminate());
    })
  })
})

//START UP SERVER
const PORT = 5000 || process.env.PORT;

app.listen(PORT, ()=> console.log(`hey, I'm listening on port ${PORT}`));