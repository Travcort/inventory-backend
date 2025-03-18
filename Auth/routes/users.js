import bcrypt from 'bcrypt';
import _ from 'lodash';
import { User, validateUser } from '../models/user.js';
import express from 'express';
const router = express.Router();

router.post('/register', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).json({ success: false, message: 'User already registered..' });
  //hash
  user = new User(_.pick(req.body, ['name', 'email', 'password', 'isAdmin']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  res.send({ success: true, user: _.pick(user, ['name', 'email',]) });
});

export{ router as userRoutes } ;