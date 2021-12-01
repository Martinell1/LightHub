class Service{
  constructor(model){
    this.model = model
  }

  findOne(obj){
    return this.model.findOne(obj);
  }

  find(obj){
    return this.model.find(obj);
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

  update(obj){
    return this.model.updateOne({_id:obj._id},obj)
  }

  updates(oldObj,newObj){
    return this.model.updateMany(oldObj,newObj)
  }
}

module.exports = Service;