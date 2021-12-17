class Service{
  constructor(model){
    this.model = model
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

  remove(id){
    return this.model.updateOne({_id:id},{ status : 0 } )
  }

  delete(obj){
    return this.model.deleteOne(obj);
  }

  findAndUpdate(findObj,updateObj){
    findObj.status = 1
    return this.model.findOneAndUpdate(findObj,updateObj)
  }

  update(obj){
    return this.model.updateOne({_id:obj._id},obj)
  }

  updates(oldObj,newObj){
    oldObj.status = 1
    return this.model.updateMany(oldObj,newObj)
  }
}

module.exports = Service;