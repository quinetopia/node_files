const fs = require("fs");
const axios = require('axios');

const path = process.argv[2];

/** reads a file and prints to the console */
function cat(filePath){

  fs.readFile(filePath, 'utf8', function(err, data) {
    if (err) {
      console.log("No good! Can't read file", err);
      process.exit(1);
    } else {
      console.log(data);
      process.exit(0);
    }
  })
}

/** Reads a webpage and prints to the console */
function webCat(url) {
  
  axios.get(url)
    .then(data => {console.log(data.data);
                   process.exit(0)})
    .catch(err => {console.log(`Error fetching ${url}: Error: Request failed with ${err.response.status}`)
                   process.exit(1)});
}

if (path.startsWith('http://') || path.startsWith('https://')){
  webCat(path);
}else{
  cat(path);
}

