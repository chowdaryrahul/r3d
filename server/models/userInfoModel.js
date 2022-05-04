import mongoose from 'mongoose'

var userInfoModels = mongoose.Schema({
 
  name:{
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
    required:false
  }]
})


export var UserInfoModel = mongoose.model('details', userInfoModels)

