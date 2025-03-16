import Joi from "joi";
import bcrypt from "bcrypt";
import express from "express";
const router = express.Router();
import { User } from "../models/user.js";

router.post('/', async (req, res) => {
  const {error}=validate(req.body);
  if (error) return res.status(400).send({ success: false, message: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send({ success: false, message: 'User does not exist!' });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send({ success: false, message: 'Invalid email or password' });

  const token = user.generateAuthToken();
  return res.send({ success: true, token });
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).max(1024).required()
  });
  return schema.validate(req);
}

export { router as authRoutes };