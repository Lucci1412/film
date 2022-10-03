import Movie from '../model/Movie.js'
const fetchMovie = async (res,option) => {
    const type = option.type || null
    const page = option.page || 1
    const limit = option.limit || 18
    const sort = option.search || null
    await Movie.find(type)
        .skip((limit * page) - limit)
        .limit(limit)
        .sort(sort)
        .exec((err, movies) => {
            Movie.count(type, (err, count) => {
                if (err) return next(err);
                res.json({ success: true, message: 'get movie success', movies,total_page: Math.ceil(count / limit) })
               
            });
        });
       
}

export default fetchMovie