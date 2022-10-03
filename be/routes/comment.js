import express from 'express'
const router = express.Router()
import Comment from '../model/Comment.js'

router.post('/', async (req, res) => {
    try {
        const comment = new Comment(req.body)
        await comment.save()
        return res.status(200).json({ success: true, message: 'comment success', comment })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'comment fail', error })
    }
})
router.delete('/:id', async (req, res) => {
    try {
        await Comment.findOneAndDelete({ _id: req.params.id })
        return res.status(200).json({ success: true, message: 'delete comment success' })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'delete comment fail', error })
    }
})
//get all comment movie

router.get("/:movieId", async (req, res) => {
    const movieId = req.params.movieId
    const parentId = req.query.parentId || null
    const limit = req.query.limit || 10
    const page = req.query.page || 1
    try {
       const comments=await Comment
            .find(parentId? {parentId}:{ movieId: movieId }) // find tất cả các data
            .skip((limit * page) - limit) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
            .limit(limit)
            .sort({
                createdAt: -1
            })
            .exec((err, comments) => {
                Comment.count(parentId? {parentId}:{ movieId: movieId }, (err, count) => { // đếm để tính có bao nhiêu trang
                    if (err) return next(err);
                    res.json({ success: true, message: 'get chieurap movie success',comments,total_comment:count, current_page: page, total_page: Math.ceil(count / limit) }) // Trả về dữ liệu các sản phẩm theo định dạng như JSON, XML,...
                });
            });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'get  comment fail' })
    }
});
//like comment
router.put("/like/:commentId", async (req, res) => {
    console.log(req.body.userId)
    console.log(req.params.commentId)
    try {
        const isComment = await Comment.findOne({
            _id: req.params.commentId,
        });
        if (isComment.like.includes(req.body.userId)) {
            const comment = await Comment.findByIdAndUpdate({ _id: req.params.commentId }, { $pull: { like:req.body.userId } }, { new: true })
            return res.status(200).json({ success: true, message: 'dislike comments success', comment })
        }
        else {
            const comment = await Comment.findByIdAndUpdate({ _id: req.params.commentId }, { $push: { like: req.body.userId } }, { new: true })
            return res.status(200).json({ success: true, message: 'like comments success', comment })
        }
    } catch (err) {
        return res.status(500).json({ success: true, message: 'send comments fail', err })
    }
});

export default router