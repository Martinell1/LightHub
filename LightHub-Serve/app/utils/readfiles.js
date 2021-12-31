const { resolve } = require('path')
const fs = require('fs')

const dirname = resolve();

function autoReadFiles(fileName){
  const path = dirname + '/app/' + fileName;
  let files = fs.readdirSync(path);
  let result = [];
  for(let file of files){
    if(file !==  'index.js'){
      file = file.replace('.js',"");
      result.push(file)
    }
  }
  return result;
}

function autoImport(fileName){
  let files = autoReadFiles(fileName);
  for(let file of files){
    //item 导出的名字
    let item = file;
    // if(fileName === "model"){
    //   item += "Model"
    // }else if(fileName === "service"){
    //   item += "Service"
    // }else if(fileName === "controller"){
    //   item += "Controller"
    // }
    const prePath = dirname + '\\app\\' + fileName;
    let path = prePath + "\\" + file;
    files[item] = require(path);
  }
  return files;
}

module.exports = {
  autoReadFiles,
  autoImport
}
