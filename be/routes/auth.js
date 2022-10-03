import express from 'express'
import argon2 from 'argon2';
const router = express.Router()
import User from '../model/User.js'
import jwt from 'jsonwebtoken'
import { verifyToken } from '../middleware/verifyToken.js'

//kiểm tra người dùng google,facebook
router.get("/", (req, res) => { 
    if (req.user) {
        return res.status(200).json({ success: true, message: 'user login', user: req.user });
    }
    else {
        return res.status(200).json({ success: false, message: 'user not login', user: null });
    }
});

//Kiểm tra người dùng 
router.get('/token', verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.userId }).select('-password')
        if (!user) return res.status(400).json({ success: false, message: 'User not found',user:null })
        res.json({ success: true, user })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})
// đăng kí
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body
    try {
        if (!username || !email || !password) return res.status(200).json({ success: false, message: 'Vui lòng điền đủ thông tin' })
        if (username.length < 3 || username.length > 50) return res.status(200).json({ success: false, message: 'Tên nhân vật quá ngắn hoặc quá dài' })
        if (password.length < 6) return res.status(200).json({ success: false, message: 'Mật khẩu tối thiểu 6 kí tự' })
        if (await User.findOne({ email })) return res.status(200).json({ success: false, message: 'Email đã được sử dụng' })
        const hash = await argon2.hash(password);
        const registerUser = new User({ username, email, password: hash })
        await registerUser.save();
        const token = jwt.sign({ userId: registerUser._id }, process.env.ACCESS_TOKEN_SECRET)
        return res.status(200).json({ success: true, message: 'Đăng kí thành công',registerUser, token })

    } catch (error) {
        return res.status(500).json({ success: false, error })
    }
})

//đăng nhập
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) return res.status(200).json({ success: false, message: 'Vui lòng nhập email hoặc mật khẩu' });
        const user = await User.findOne({ email })
        if (!user) return res.status(200).json({ success: false, message: 'Sai email hoặc mật khẩu' });
        if (password) {
            const isVerifyPassword = await argon2.verify(user.password, password)
            if (!isVerifyPassword) return res.status(200).json({ success: false, message: 'Sai email hoặc mật khẩu' })
        }
        const token = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET
        )
        return res.status(200).json({ success: true, message: 'Đăng nhập thành công', user, token })

    } catch (error) {
        return res.status(500).json({ success: false, message: 'error', error })
    }

})

export default router