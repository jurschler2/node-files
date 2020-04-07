const path = process.argv[2];
const fs = require("fs");
const axios = require("axios");

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
    console.log(`File contents: ${data}`);
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
  console.log(`File contents: ${response.data}`);
}