import mongoose from 'mongoose'

var userInfoModels = mongoose.Schema({
 userId:{
   type:String,
   required:true
 },
  name:{
    type:String,
    required:true
  },
  username:{
    type:String,
    required:true
  },
  description: {
    type: String,
    required: false,
  },
  category:{
    type:String,
    required:false
  },
  image:[{
    type:String,
    required:true
  }],
  comments:[{
    type:String,
    required:false
  }],
  time:{
    type:Number,
    required:true
  }
})


export var UserInfoModel = mongoose.model('details', userInfoModels)

