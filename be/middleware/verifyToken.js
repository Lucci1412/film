import jwt from "jsonwebtoken"


export const verifyToken = (req, res, next) => {
	const authHeader = req.header('Authorization')
	const token = authHeader && authHeader.split(' ')[1]
	try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) res.status(403).json({message:'Token không tồn tại'});
      req.user = user;
      next();
    });
	} catch (error) {
		console.log(error)
		return res.status(403).json({ success: false, message: 'Token lởm' })
	}
}

