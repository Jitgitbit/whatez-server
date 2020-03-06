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
async function imageToData(image) {
  const noDuplicates = await upload(image,res,err => {
    console.log(image);
    const dataToReturnOne = fs.readFile(`./uploads/${image.originalname}`, (err, data) => {
      if(err) return console.log(`this is your error:`, err);
      const dataToReturn = worker
      // .recognize(data, "eng", {tessjs_create_pdf: '1'})
      .recognize(data, "eng", {tessjs_create_pdf: '1'})
      .progress(progress => {
        console.log("====================================================TXT FROM IMG===============================================================");
        console.log(progress);
      })
      .then(result => {
        console.log("WHAT IS RESULT??", result.text)
        // res.redirect('/download')

        console.log("================================================== REGEX FROM TXT ==============================================================");
        const paragraph = result.text;
        const found = paragraph.match(/[E]\d{3}/gi);
        console.log(`first extraction attempt:`,found);

        const noDuplicates = [...new Set(found)];
        console.log(`no duplicates:`,noDuplicates);
        return noDuplicates
      })
      .finally(()=> worker.terminate());
      return dataToReturn;
    })
    console.log({ dataToReturnOne })
    return dataToReturnOne
  })
  return noDuplicates
}

module.exports.imageToData = imageToData;