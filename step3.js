const fs = require("fs");
const axios = require("axios");
let path, outPut, doWrite;

if (process.argv[2] === '--out') {
  doWrite = true;
  outPut = process.argv[3];
  path = process.argv[4];
} else {
  doWrite = false;
  path = process.argv[2];
}

if (path.slice(0, 4) === 'http') {
  webCat(path);
} else {
  cat(path);
}

function cat(path) {

  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    if (!doWrite) {
      console.log(`File contents: ${data}`)
    } else {
      writeToFile(data);
      process.exit(0);
    }
  });
}

async function webCat(path) {
  let response;
  try {
    response = await axios.get(path);
  } catch(e) {
    console.log(e);
    process.exit(1);
  }
  if (!doWrite) {
    console.log(`File contents: ${response.data}`);
    } else {
      writeToFile(response.data);
      process.exit(0);
    }
}

function writeToFile(data) {

  fs.writeFile(outPut, data, 'utf8', function(err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`no output, but ${outPut} contains the contents of ${path}`);
  })
}