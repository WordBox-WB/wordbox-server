import express from 'express'
const router = express.Router()
import PostController from '../controllers/postcontroller'
import AuthorController from '../controllers/authorcontroller'
import { catchErrors } from '../handlers/errorHandler'

// POST ROUTES
router.post('/api/v1/post/create/:authorId', PostController.createPost)
router.get('/api/v1/posts', catchErrors(PostController.getPosts))
router.get('/api/v1/post/:id', catchErrors(PostController.getPost))
router.put('/api/v1/update/post/:id', catchErrors(PostController.updatePost))
router.delete('/api/v1/delete/post/:id', catchErrors(PostController.deletePost))
router.post('/api/v1/newcomment/:postId', PostController.newComment)
router.get('/api/v1/comments', catchErrors(PostController.getComments))
router.get('/api/v1/comment/:id', catchErrors(PostController.getComment))
router.delete('/api/v1/delete/comment/:id', catchErrors(PostController.deleteComment))
router.put('/api/v1/post/like/:postId/:authorId', catchErrors(PostController.likePost))
router.put('/api/v1/post/unlike/:postId/:authorId', catchErrors(PostController.unLikePost))
router.put('/api/v1/favourites/:authorId/:postId', catchErrors(PostController.chooseFavouritePost))

//AUTHOR ROUTES
router.post('/api/v1/author', AuthorController.newAuthor)
router.get('/api/v1/authors', catchErrors(AuthorController.getAuthors))
router.get('/api/v1/author/:authorId', catchErrors(AuthorController.getAuthor))
router.delete('/api/v1/author/delete/:authorId', catchErrors(AuthorController.deleteAuthor))
router.put('/api/v1/author/update/:authorId', catchErrors(AuthorController.deleteAuthor))
router.post('/api/v1/author/login', AuthorController.authorLogin)

export default router;
