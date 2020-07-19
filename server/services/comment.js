import Model from '../models/comments'

class CommentService {
    static async newComment(data) {
        try {
            return await Model.create(data)
        } catch (e) {
            throw e
        }
    }

    static async getComments() {
        try {
            return await Model.find({}).sort({ "_id": -1 })
        } catch (e) {
            throw e
        }
    }

    static async getComment(id) {
        try {
            return await Model.findOne({ _id: id })
        } catch (e) {
            throw e
        }
    }

    static async deleteComment(id) {
        try {
            return await Model.findOneAndDelete({ _id: id })
        } catch (e) {
            throw e
        }
    }
}

export default CommentService;
