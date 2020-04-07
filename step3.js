const fs = require("fs");
const axios = require('axios');

const input = process.argv;
let path;
let outputFile;

/** reads a file and prints to the console */
function cat(filePath, outputFile){

  fs.readFile(filePath, 'utf8', function(err, data) {
    if (err) {
      console.log("No good! Can't read file", err);
      process.exit(1);
    } else {
        outputData(data, outputFile)
    }
  })
}

function outputData(data, outputFile=undefined){
  if (outputFile === undefined) {
    console.log(data);
    process.exit(0);
  }else{
    fs.writeFile(outputFile, data, 'utf8', function (err){
      if (err){
        console.log(`Couldn't write ${outputFile}: ${err}`);
        process.exit(1);
      }
    })
  }
}

/** Reads a webpage and calls the outputData function if successful */
function webCat(url, outputFile) {
  
  axios.get(url)
    .then(function(data){
      outputData(data.data, outputFile)
    })
    .catch(err => {console.log(`Error fetching ${url}: Error: ${err}`)
                   process.exit(1)});
}


/** handle flags and assign paths */
if (input[2].startsWith("--")){
  /** handle flags */
  if (input[2] === "--out") {
    outputFile = input[3];
    path = input[4];
  }
} else {
    path = input[2];
}

if (path.startsWith('http://') || path.startsWith('https://')){
  webCat(path, outputFile);
}else{
  cat(path, outputFile);
}

