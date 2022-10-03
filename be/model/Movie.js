import mongoose from 'mongoose'
const { Schema } = mongoose;

const MovieSchema = new Schema({
    modified: { type: Date, default: Date.now() },
    name: { type: String, require: true },
    views: { type: Number, default: 0 },
    origin_name: { type: String, default: 'Đang cập nhật' },
    content: { type: String, default: 'Đang cập nhật' },
    type: { type: String, default: 'Đang cập nhật' },
    status: { type: String, default: 'Đang cập nhật' },
    chieurap: { type: Boolean, default: false },
    thumb_url: { type: String, require: true, default: '' },
    poster_url: { type: String, default: '' },
    trailer: { type: String, default: '' },
    time: { type: String, default: 'Đang cập nhật' },
    episode_current: { type: String, default: '1' },
    episode_total: { type: String, default: 'Đang cập nhật' },
    quality: { type: String, default: 'HD' },
    lang: { type: String, default: 'Vietsub' },
    slug: { type: String, require: true, },
    year: { type: Number },
    actor: { type: Array, default: [] },
    director: { type: Array, default: [] },
    category: { type: Array, default: [] },
    country: { type: Array, default: [] },
    server_name: { type: String, default: '' },
    server_data: [{
        name: String,
        slug: String,
        link_embed: String
    }]


}, { timestamps: true });

// MovieSchema.index({name: 'text', 'actor': 'text'});
const Movie = mongoose.model('Movie', MovieSchema)
// Movie.createIndexes({name: 'text', 'actor': 'text'})

export default Movie