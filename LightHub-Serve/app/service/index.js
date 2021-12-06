class Service{
  constructor(model){
    this.model = model
  }

  findOne(obj,fields){
    return this.model.findOne(obj,fields);
  }

  find(obj,fields){
    return this.model.find(obj,fields);
  }

  list(){
    return this.model.find({status:1});
  }

  add(obj){
    return this.model.create(obj);
  }

  remove(id){
    return this.model.updateOne({_id:id},
    { status : 0 } )
  }

  findAndUpdate(fndObj,updateObj){
    return this.model.findOneAndUpdate(fndObj,updateObj)
  }

  update(obj){
    return this.model.updateOne({_id:obj._id},obj)
  }

  updates(oldObj,newObj){
    return this.model.updateMany(oldObj,newObj)
  }
}

module.exports = Service;