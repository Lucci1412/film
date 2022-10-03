import mongoose from 'mongoose';
const { Schema } = mongoose;

const User = new Schema({
    username: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    googleId: { type: String, allowNull: true, default: null },
    facebookId: { type: String, allowNull: true, default: null },
    sex: { type: String, default: null },
    birthday: { type: String, default: null },
    watch: [{
        movieId: String,
        link_embed: String,
        name: String,
        slug: String,
    }],
    isAdmin: { type: Boolean, default: false },
    avatar: {
        type: String, default: 'https://res.cloudinary.com/duezssb0n/image/upload/v1658746142/avatardefault_osk2qs.webp'
    },
    cloudinary_id: {
        type: String,
        default: null
    },
    favorite: {
        type: Array, default: []
    }
}, { timestamps: true });

export default mongoose.model('User', User);