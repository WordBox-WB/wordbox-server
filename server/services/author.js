import Model from '../models/author'

class AuthorService {
    static async newAuthor(data) {
        try {
            return await Model.create(data)
        } catch (e) {
            throw e
        }
    }

    static async getAuthors() {
        try {
            return await Model.find({}).sort({ "_id": -1 })
        } catch (e) {
            throw e
        }
    }

    static async getAuthor(authorId) {
        try {
            return await Model.findOne({ _id: authorId })
        } catch (e) {
            throw e
        }
    }

    static async deleteAuthor(authorId) {
        try {
            return await Model.findOneAndDelete({ _id: authorId })
        } catch (e) {
            throw e
        }
    }

    static async authorEmail(email) {
        try {
            return await Model.findOne({ email: email })
        } catch (e) {
            throw e
        }
    }
}

export default AuthorService;
