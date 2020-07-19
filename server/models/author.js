import mongoose from 'mongoose'

const authorSchema = new mongoose.Schema({
    name: { type: String, trim: true, lowercase: true },
    email: { type: String, trim: true, lowercase: true },
    password: { type: String, trim: true, lowercase: true },
    photo: { type: String },
    posts: [{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'posts'
    }],
    favourites: [Object]
})

export default mongoose.model('authors', authorSchema)
