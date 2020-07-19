import PostService from '../services/post'
import CommentService from '../services/comment'
import AuthorService from '../services/author'

class PostController {
    static async createPost(req, res) {
        try {
            const { authorId } = req.params
            const author = await AuthorService.getAuthor(authorId)
            if(!author) {
                return res.status(400).json({
                    success: false
                })
            }
            else {
                const { title, content } = req.body
                if(!title || !content) {
                    return res.status(400).json({
                        success: false
                    })
                }
                else {
                    const data = req.body
                    const info = await PostService.createPost(data)
                    info.author = author.name
                    info.authorImage = author.photo
                    await info.save()
                    var authorPosts = author.posts
                    authorPosts.push(info)
                    await author.save()
                    return res.status(201).json({
                        success: true,
                        info: info,
                        author: author
                    })
                }
            }
        } catch (e) {
            return res.status(500).json({
                message: e.message
            })
        }
    }

    static async getPosts(_req, res) {
        try {
            const info = await PostService.getPosts()
            if(info.length > 0) {
                return res.status(200).json({
                    info: info,
                    success: true
                })
            }
            else {
                return res.status(400).json({
                    success: false
                })
            }
        } catch (e) {
            return res.status(500).json({
                message: e.message
            })
        }
    }

    static async getPost(req, res) {
        try {
            const { id } = req.params
            const info = await PostService.getPost(id)
            if(!info) {
                return res.status(400).json({
                    success: false
                })
            }
            else {
                info.views++
                await info.save()
                return res.status(200).json({
                    info: info,
                    success: true
                })
            }
        } catch (e) {
            return res.status(500).json({
                message: e.message
            })
        }
    }

    static async deletePost(req, res) {
        try {
            const { id } = req.params
            const info = await PostService.deletePost(id)
            if(info){
                return res.status(200).json({
                    success: true
                })
            }
            else {
                return res.status(400).json({
                    success: false
                })
            }
        } catch (e) {
            return res.status(500).json({
                message: e.message
            })
        }
    }

    static async updatePost(req, res) {
        try {
            const { id } = req.params
            const info = await PostService.getPost(id)
            if(!info) {
                return res.status(400).json({
                    success: false
                })
            }
            else {
                const { title, content } = req.body
                info.title = title || info.title
                info.content = content || info.content
                await info.save()
                return res.status(200).json({
                    success: true,
                    info: info
                })
            }
        } catch (e) {
            return res.status(500).json({
                message: e.message
            })
        }
    }

    static async newComment(req, res) {
        try {
            const { postId } = req.params
            const post = await PostService.getPost(postId)
            if(!post) {
                return res.status(400).json({
                    success: false,
                    message: "Post"
                })
            }
            else {
                const { name, text } = req.body
                if(!name || !text) {
                    return res.status(400).json({
                        success: false,
                        message: "Comment"
                    })
                }
                else {
                    const comment = await CommentService.newComment(req.body)
                    const comments = post.comment
                    comments.push(comment)
                    await post.save()
                    return res.status(201).json({
                        success: true
                    })
                }
            }
        } catch (e) {
            return res.status(500).json({
                message: e.message
            })
        }
    }

    static async getComments(_req, res) {
        try {
            const info = await CommentService.getComments()
            if(info.length > 0) {
                return res.status(200).json({
                    success: true,
                    info: info
                })
            }
            else {
                return res.status(400).json({
                    success: false
                })
            }
        } catch (e) {
            return res.status(500).json({
                message: e.message
            })
        }
    }

    static async getComment(req, res) {
        try {
            const { id } = req.params
            const info = await CommentService.getComment(id)
            if(!info) {
                return res.status(400).json({
                    success: false
                })
            }
            else {
                return res.status(200).json({
                    success: true,
                    info: info
                })
            }
        } catch (e) {
            return res.status(500).json({
                message: e.message
            })
        }
    }

    static async deleteComment(req, res) {
        try {
            const { id } = req.params
            const info = await CommentService.deleteComment(id)
            if(!info) {
                return res.status(400).json({
                    success: false
                })
            }
            else {
                return res.status(200).json({
                    success: true
                })
            }
        } catch (e) {
            return res.status(500).json({
                message: e.message
            })
        }
    }

    static async likePost(req, res) {
        try {
            const { postId, authorId } = req.params
            const post_info = await PostService.getPost(postId)
            if(!post_info) {
                return res.status(400).json({
                    success: false
                })
            }
            else if(!authorId) {
                return res.status(400).json({
                    success: false
                })
            }
            else {
                let postLike = post_info.like
                let idIsFalse = []
                let idIsTrue = []
                PostService.loopLikeArray(postLike, idIsFalse, idIsTrue, authorId)
                if(idIsTrue.length === 0) {
                    postLike.push(authorId)
                    await post_info.save()
                    return res.status(200).json({
                        success: true,
                        message: "Liked"
                    })
                }
                else {
                    let getIdIndex = postLike.indexOf(authorId)
                    postLike.splice(getIdIndex, 1)
                    await post_info.save()
                    return res.status(200).json({
                        success: true,
                        message: "Unliked"
                    })
                }
            }
        } catch (e) {
            return res.status(500).json({
                message: e.message
            })
        }
    }

    static async unLikePost(req, res) {
        try {
            const { postId, authorId } = req.params
            const post_info = await PostService.getPost(postId)
            if(!post_info) {
                return res.status(400).json({
                    success: false,
                    message: 'no post'
                })
            }
            else if(!authorId) {
                return res.status(400).json({
                    success: false,
                    message: 'no author'
                })
            }
            else {
                let postLike = post_info.like
                let idIsFalse = []
                let idIsTrue = []
                PostService.loopLikeArray(postLike, idIsFalse, idIsTrue, authorId)
                if(idIsTrue.length > 0) {
                    let getIdIndex = postLike.indexOf(authorId)
                    postLike.splice(getIdIndex, 1)
                    await post_info.save()
                    return res.status(200).json({
                        success: true,
                        message: "Unliked"
                    })
                }
                else {
                    return res.status(400).json({
                        success: false,
                        message: 'after unlike'
                    })
                }
            }
        } catch (e) {
            return res.status(500).json({
                message: e.message
            })
        }
    }

    static async chooseFavouritePost(req, res) {
        try {
            const { authorId, postId } = req.params
            const author_info = await AuthorService.getAuthor(authorId)
            if(!author_info) {
                return res.status(400).json({
                    success: false
                })
            }
            else {
                const post_info = await PostService.getPost(postId)
                if(!post_info) {
                    return res.status(400).json({
                        success: false
                    })
                }
                else {
                    let authorFavourites = author_info.favourites
                    for(let k = 0; k < authorFavourites.length; k++) {
                        if(authorFavourites[k]._id == postId) {
                            authorFavourites.splice(k, 1)
                            await author_info.save()
                            return res.status(200).json({
                                success: true,
                                info: author_info
                            })
                        }
                    }

                    authorFavourites.push(post_info)
                    await author_info.save()
                    return res.status(200).json({
                        success: true,
                        info: author_info
                    })
                }
            }
        } catch (e) {
            return res.status(500).json({
                message: e.message
            })
        }
    }
}

export default PostController;
