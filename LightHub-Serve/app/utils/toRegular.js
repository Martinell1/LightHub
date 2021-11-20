function toRegular(obj) {
  for(let item in obj){
    obj[item] = new RegExp(obj[item],"gim"); 
  }
  return obj;
}

module.exports = toRegular
