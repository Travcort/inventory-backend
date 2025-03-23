import mongoose from 'mongoose';
import Joi from 'joi';
import jwt from 'jsonwebtoken'

const userSchema =  new mongoose.Schema({
  name:{type: String,required: true,minlength: 5,maxlength: 50},
  email:{type: String,required: true,unique: true,minlength: 5,maxlength: 255},
  password:{type: String,required: true,minlength: 8,maxlength: 1024},
  isAdmin:{
    type: Boolean,
    required: true
  }
});

userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({_id:this._id, isAdmin: this.isAdmin}, process.env.JWT_PRIVATE_KEY);
  return token;
}

export const User = mongoose.model('User', userSchema)

export function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).max(1024).required(),
    isAdmin: Joi.boolean().required()
  });
  return schema.validate(user);
}
