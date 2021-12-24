class Service{
  constructor(model){
    this.model = model
  }

  findAll(obj,fields){
    return this.model.find(obj,fields);
  }

  findOne(obj,fields){
    obj.status = 1
    return this.model.findOne(obj,fields);
  }

  find(obj,fields){
    obj.status = 1
    return this.model.find(obj,fields);
  }

  list(){
    return this.model.find({status:1});
  }

  add(obj){
    return this.model.create(obj);
  }

  remove(obj){
    return this.model.updateMany(obj,{ status : 0 } )
  }

  delete(obj){
    return this.model.deleteMany(obj);
  }

  findAndUpdate(findObj,updateObj){
    return this.model.findOneAndUpdate(findObj,updateObj,{ runValidators: true })
  }

  update(obj){
    return this.model.updateOne({_id:obj._id},obj,{ runValidators: true })
  }

  updates(oldObj,newObj){
    oldObj.status = 1
    return this.model.updateMany(oldObj,newObj)
  }
}

module.exports = Service;