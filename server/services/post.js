import Model from '../models/posts'

class PostService {
    static async createPost(data) {
        try {
            return await Model.create(data)
        } catch (e) {
            throw e
        }
    }

    static async getPosts() {
        try {
            return await Model.find({}).sort({"_id": -1})
        } catch (e) {
            throw e
        }
    }

    static async getPost(id) {
        try {
            return await Model.findOne({ _id: id})
        } catch (e) {
            throw e
        }
    }

    static async deletePost(id) {
        try {
            return await Model.findOneAndDelete({ _id: id })
        } catch (e) {
            throw e
        }
    }

    static async loopLikeArray(post_likes, idIsFalse, idIsTrue, newId ) {
        try {
            for(let i = 0; i < post_likes.length; i++) {
                if(post_likes[i] !== newId) {
                    idIsFalse.push('false')
                }
                else {
                    idIsTrue.push('true')
                }
            }
        } catch (e) {
            throw e
        }
    }
}

export default PostService;
