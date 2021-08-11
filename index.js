const fs = require('fs');
const PNG = require('pngjs').PNG;
const colors = require('./assets/colors');

let newFile = new PNG({width: 16, height: 16});

for(let y = 0; y < newFile.height; y++){
  for(let x = 0; x < newFile.width; x++){
    let idx = (newFile.width * y + x) << 2;
    let color = assignColor(colors);
    if(y < 5){
      color = assignColor([colors[1], colors[0]]);
    }else if(y > 10){
      color = assignColor([colors[2], colors[3]]);
    }
  newFile.data[idx] = color[0];
  //blue
  newFile.data[idx+1] = color[1];
  //green
  newFile.data[idx+2] = color[2];
  //opacity
  newFile.data[idx+3] = 255;
}
}

newFile
  .pack()
  .pipe(fs.createWriteStream(__dirname + "/newfile.png"))
  .on("finish", function () {
    console.log("Written!");
  });

function generateColor(upperBound = 255, lowerBound = 0){
  return Math.floor(Math.random() * upperBound) + lowerBound;
}

function assignColor(colorArray){
  return colorArray[Math.floor(Math.random() * colorArray.length)];
}
