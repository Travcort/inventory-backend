export function admin(req, res, next) {
  if(!req.user.isAdmin) return res.status(403).send({ success: false, message: 'Access Denied' });
  next();
};


//allows only the admin to perform certain tasks