//IMPORTS:
const fs = require(`fs`);
const multer = require(`multer`);
const {TesseractWorker} = require(`tesseract.js`);

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


//ROUTES:
async function imageToData(req, res, err) {
  const noDuplicates = await upload(req,res,err => {
    console.log(req.file);
    const dataToReturnOne = fs.readFile(`./uploads/${req.file.originalname}`, async (err, data) => {
      if(err) return console.log(`this is your error:`, err);
      const result = await worker.recognize(data, "eng", {tessjs_create_pdf: '1'})
      // .progress(progress => {
      //   console.log("====================================================TXT FROM IMG===============================================================");
      //   console.log(progress);
      // })
      // .recognize(data, "eng", {tessjs_create_pdf: '1'})
      
      
      console.log("WHAT IS RESULT??", result.text)
      // res.redirect('/download')

      console.log("================================================== REGEX FROM TXT ==============================================================");
      const paragraph = result.text;
      const found = paragraph.match(/[E]\d{3}/gi);
      console.log(`first extraction attempt:`,found);

      const theseNoDuplicates = [...new Set(found)];
      console.log(`first no duplicates:`,theseNoDuplicates);


      await worker.terminate();
      return theseNoDuplicates;
    })
    console.log(`second no duplicates:`,{ dataToReturnOne })
    return dataToReturnOne
  })
  console.log(`third and last no duplicates:`, noDuplicates)
  return noDuplicates
}

module.exports.imageToData = imageToData;