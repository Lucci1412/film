import express from 'express'
const router = express.Router()
import User from '../model/User.js'
import Movie from '../model/Movie.js'
import cloudinary from '../utils/cloundinary.js'
import upload from "../utils/multe.js"
import argon2 from 'argon2';
router.get("/:userId", async (req, res) => {

    try {
        const user = await User.findOne({ _id: req.params.userId })
        return res.status(200).json({ success: true, message: 'get  user success', user })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'get  user fail' })
    }
});

//update info user
router.put('/info/:userId', async (req, res) => {
    try {
        if (req.body.password) {
            if (req.body.password.length < 6) return res.status(200).json({ success: false, message: 'Mật khẩu tối thiểu 6 kí tự' })
            req.body.password = await argon2.hash(req.body.password);
        }
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { new: true }).select('-password')
        return res.status(200).json({ success: true, message: 'Cập nhật thông tin thành công', user })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'error', error })

    }
})
//update avatar user
router.put('/avatar/:userId', upload.single("avatar"), async (req, res) => {
    try {
        if (req.file) {
            const currentUser= await User.findOne({ _id: req.params.userId })
            if (currentUser.avatar === 'https://res.cloudinary.com/duezssb0n/image/upload/v1658746142/avatardefault_osk2qs.webp') {
                const result = await cloudinary.uploader.upload(req.file.path)

                const data = {
                    avatar: result.secure_url,
                    cloudinary_id: result.public_id,
                }
              const user = await User.findByIdAndUpdate({ _id: req.params.userId }, { $set: data }, { new: true }).select('-password')
                return res.status(200).json({ success: true, message: 'Cập nhật ảnh đại diên thành công ',user })
            }
            else {
                
                currentUser.cloudinary_id!==null && await cloudinary.uploader.destroy(currentUser.cloudinary_id);
                const result = await cloudinary.uploader.upload(req.file.path)
                const data = {
                    avatar: result.secure_url,
                    cloudinary_id: result.public_id,
                }
               const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $set: data }, { new: true }).select('-password')
                return res.status(200).json({ success: true, message: 'Update avatar success ',user })
            }

        }
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Update avatar fail', error })
    }

})
// favorite  movie
router.put('/favorite/:userId/:movieId', async (req, res) => {
    console.log(req.params)
    try {

        const movie = await Movie.findOne({ _id: req.params.movieId })
        const currentUser = await User.findOne({ _id: req.params.userId })
        if (!currentUser.favorite.includes(movie._id)) {
            const user = await User.findByIdAndUpdate({ _id: currentUser._id }, { $push: { favorite: movie._id } }, { new: true }).select('-password')
            return res.status(200).json({ success: true, message: 'Đã thêm vào danh sách yêu thích', user })
        }
        else {
            const user = await User.findByIdAndUpdate({ _id: currentUser._id }, { $pull: { favorite: movie._id } }, { new: true }).select('-password')
            return res.status(200).json({ success: true, message: 'Hủy yêu thích thành công', user })
        }
        return res.status(200).json({ success: true, message: 'Hủy yêu thích thành công' })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'error', error })
    }
})

// watching  movie
router.put('/watch/:userId', async (req, res) => {
    try {

        // const movie = await Movie.findOne({ _id: req.params.movieId })
        const currentUser = await User.findOne({ _id: req.params.userId })
        if (!currentUser.watch.map(item => item.movieId).includes(req.body.movieId)) {
            const user = await User.findByIdAndUpdate({ _id: currentUser._id }, { $push: { watch: req.body } }, { new: true }).select('-password')
            return res.status(200).json({ success: true, message: ' add watch success', user })
        }
        else {
            console.log(true)
            const newList = [...currentUser.watch.filter(item => item.movieId !== req.body.movieId)]
            const user = await User.findByIdAndUpdate({ _id: currentUser._id }, { $set: { watch: [req.body, ...newList] } }, { new: true }).select('-password')
            return res.status(200).json({ success: true, message: 'add watch success', user })
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: 'error', error })
    }
})
// watching  movie
router.delete('/watch/:userId/:movieId', async (req, res) => {
    try {
        const currentUser = await User.findOne({ _id: req.params.userId })
        if (currentUser.watch.map(item => item.movieId).includes(req.params.movieId)) {
            const newList = [...currentUser.watch.filter(item => item.movieId !== req.params.movieId)]
            const user = await User.findByIdAndUpdate({ _id: currentUser._id }, { $set: { watch: [...newList] } }, { new: true }).select('-password')
            return res.status(200).json({ success: true, message: ' add watch success', user })
        }


    } catch (error) {
        return res.status(500).json({ success: false, message: 'error', error })
    }
})
export default router;


//login