import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    name: { type: String, trim: true, lowercase: true },
    text: { type: String, trim: true, lowercase: true },
    date: { type: Date, default: Date.now() }
})

export default mongoose.model('comments', commentSchema)
