//IMPORTS:
const fs = require(`fs`);
const multer = require(`multer`);
const { TesseractWorker } = require(`tesseract.js`);

const worker = new TesseractWorker();
console.log(worker);

//STORAGE:
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage }).single(`avatar`);

//FN AND ROUTE:
async function imageToData(fileName) {
  // console.log('req user', req.user)
  // console.log('file',req.file);

  const dataToReturnOne = fs.readFileSync(`./uploads/${fileName}`);
  console.log("WHAT IS data one??", dataToReturnOne);

  const result = await worker
    .recognize(dataToReturnOne, "eng", { tessjs_create_pdf: "1" })
    .progress(progress => {
      console.log(progress);
    });
  console.log("WHAT IS RESULT??", result.text);

  console.log(
    "================================================== REGEX FROM TXT =============================================================="
  );
  const paragraph = result.text;
  // const found = paragraph.match(/[eE]\d{3,4}|[eE]\d{3,4}[a-z]|[eE]\d{3,4}[a-z]{2}/g);
  const found = paragraph.match(/([E]\d{3,4})([a-z])?/g);
  console.log(`first extraction attempt:`, found);

  const theseNoDuplicates = [...new Set(found)];
  console.log(`=============>> WHAT WE NEED, NO DUPLICATES:`, theseNoDuplicates);

  await worker.terminate();
  return theseNoDuplicates;
}

module.exports.imageToData = imageToData;
