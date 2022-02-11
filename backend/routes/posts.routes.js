import Router from 'express';
import postController from '../controllers/postController.js'

const router = Router();

router.get('/', postController.getPosts);
router.post('/', postController.createPost);
router.patch('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.patch('/:id/likePost', postController.likePost)

export default router;