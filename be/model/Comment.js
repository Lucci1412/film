import mongoose from 'mongoose';
const { Schema } = mongoose;

const Comment = new Schema({
    userId: { type: String, require: true },
    movieId: { type: String, default:null },
    parentId: { type: String, default:null },
    text: { type: String, require: true },
    like: { type: Array, default:[] },
    report:{ type: Array, default:[] },
    
},{ timestamps: true });

export default mongoose.model('Comment', Comment);