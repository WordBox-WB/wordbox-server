import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
    title: { type: String, trim: true, lowercase: true },
    content: { type: String, trim: true, lowercase: true },
    author: { type: String, trim: true, lowercase: true },
    authorImage: { type: String },
    postImage: { type: String },
    date: { type: Date, default: Date.now() },
    comment: [{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'comments'
    }],
    views: { type: Number, default: 0 },
    like: [String]
})

export default mongoose.model('posts', PostSchema)
