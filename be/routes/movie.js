import express from "express";
import Movie from '../model/Movie.js'
import fetchMovie from "../lib/fetchMovie.js";
const router = express.Router();

// create movie
router.post("/", async (req, res) => {
    try {
        const newMovie = new Movie(req.body)
        await newMovie.save()
        return res.status(200).json({ success: true, message: 'Up load movie success', newMovie })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: 'Up load movie fail' })
    }

});
// lấy mới cập  nhật
router.get("/modified/:year", async (req, res) => {
    try {
        const option = {
            type: { year: req.params.year },
            sort: { modified: -1 }
        }
        fetchMovie(res, option)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'get  movie fail' })
    }

});
// lấy movie đã full
router.get("/full", async (req, res) => {
    try {

        const option = {
            type: { episode_current: 'Full' },
            sort: { year: -1 }
        }
        fetchMovie(res, option)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'get  movie fail' })
    }

});
// lấy movie theo category
router.get("/category/:name", async (req, res) => {
    try {
        const option = {
            type: { category: req.params.name },
            page: req.query.page || 1,
            limit: req.query.limit || 20,
            sort: { year: -1 }
        }
        fetchMovie(res, option)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'get  movie fail' })
    }

});

// lấy movie theo type
router.get("/type/:name", async (req, res) => {
    try {
        const option = {
            type: { type: req.params.name },
            page: req.query.page || 1,
            limit: req.query.limit || 18,
            sort: req.query.top ? { views: -1 } : { name: 'asc' }
        }
        fetchMovie(res, option)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'get  movie fail' })
    }
});


// lấy movie theo country
router.get("/country/:name", async (req, res) => {


    try {
        const option = {
            type: { country: req.params.name },
            page: req.query.page || 1,
            limit: req.query.limit || 18,
            sort: { year: -1 }
        }
        fetchMovie(res, option)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'get  movie fail' })
    }

});

// lấy movie theo nam
router.get("/year/:year", async (req, res) => {
    try {
        const option = {
            type: { year: req.params.year },
            page: req.query.page || 1,
            limit: req.query.limit || 18,
            sort: { name: 'asc' }
        }
        fetchMovie(res, option)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'get  movie fail' })
    }

});

// lấy movie theo actor
router.get("/actor/:name", async (req, res) => {
    try {
        Movie
        const option = {
            type: { actor: req.params.name },
            page: req.query.page || 1,
            limit: req.query.limit || 18,
            sort: { name: 'asc' }
        }
        fetchMovie(res, option)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'get  movie fail' })
    }

});
// lấy trailer
router.get("/trailer", async (req, res) => {
    try {
        const option = {
            type: { status: 'trailer' },
            page: req.query.page || 1,
            limit: req.query.limit || 18,
            sort: { name: 'asc' }
        }
        fetchMovie(res, option)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'get  movie fail' })
    }

});
// lấy chieurap
router.get("/chieurap", async (req, res) => {
    try {
        const option = {
            type: { chieurap: true },
            page: req.query.page || 1,
            limit: req.query.limit || 18,
            sort: { name: 'asc' }
        }
        fetchMovie(res, option)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'get  movie fail' })
    }

});
//lấy 1  movie 
router.get("/detail", async (req, res) => {
    const { slug } = req.query;
    const { id } = req.query;
    try {
        const movie = slug ? await Movie.findOne({ slug: slug }) : await Movie.findOne({ _id: id })
        return res.status(200).json({ success: true, message: 'get  movie success', movie })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'get  movie fail' })
    }

});


//update view
router.put("/views/:id", async (req, res) => {
    const movie = await Movie.findOne({ _id: req.params.id })
    try {
        await Movie.findOneAndUpdate({ _id: req.params.id }, { $set: { views: movie.views + 1 } }, { new: true })
        return res.status(200).json({ success: true, message: 'Update views movies  success ', })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'update views movie fail' })
    }
})
//tìm kiếm
router.get("/search/:key", async (req, res) => {
    const page = req.query.page || 1
    const limit = req.query.limit || 20
    try {
        const movies = await Movie.find({
            "$or": [
                { name: { $regex: req.params.key, $options: 'i' } },
                { actor: { $regex: req.params.key, $options: 'i' } },
                { country: { $regex: req.params.key, $options: 'i' } },
                { category: { $regex: req.params.key, $options: 'i' } },
            ]
        }).skip((limit * page) - limit) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
            .limit(limit)
            .sort({
                name: 'asc'
            })
            .exec((err, movies) => {
                Movie.count({
                    "$or": [
                        { name: { $regex: req.params.key, $options: 'i' } },
                        { actor: { $regex: req.params.key, $options: 'i' } },
                        { country: { $regex: req.params.key, $options: 'i' } },
                        { category: { $regex: req.params.key, $options: 'i' } },
                    ]
                }, (err, count) => { // đếm để tính có bao nhiêu trang
                    if (err) return next(err);
                    return res.json({ success: true, message: 'get chieurap movie success', movies, current_page: page, total_page: Math.ceil(count / limit) }) // Trả về dữ liệu các sản phẩm theo định dạng như JSON, XML,...
                });
            });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'search fail' })
    }
})
export default router
