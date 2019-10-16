import User from '../models/User';

export default async (req, res, next) => {
  const checkAdmin = await User.findOne({
    where: { id: req.userId, is_superuser: true },
  });

  if (!checkAdmin) {
    return res.status(401).json({
      message: 'Permission Denied. Only admins can access this resource.',
    });
  }

  return next();
};
