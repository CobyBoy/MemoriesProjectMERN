import PostMessage from "../models/postMessage.js";
import mongoose from 'mongoose';
const postController = {
    getPosts: async (req, res) => {
        const { method, url, headers } = req;
        console.log(method)
        console.log(url)
        console.log(headers);
        console.log("responsa", res.getHeaderNames());
        try {
            const postMessage = await PostMessage.find();
            res.status(200).json(postMessage);
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    },

    createPost: async (req, res) => {
        const post = req.body;
        const newPost = new PostMessage(post);

        try {
            await newPost.save();
            res.status(201).json(newPost);
        } catch (error) {
            res.status(409).json({ message: error.message })
        }
    },
    updatePost: async (req, res) => {
        const { id: _id } = req.params;
        const post = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
        try {
            const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
            res.json(updatedPost);
        } catch (error) {
            res.status(409).json({ message: error.message })
        }
        
        
    },
    deletePost: async(req, res) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
        try {
            await PostMessage.findByIdAndRemove(id);
            res.json({message: 'Post deleted successfully'});
        } catch (error) {
            res.status(409).json({ message: error.message })
        }
    },
    likePost: async (req, res) => {
        const { id } = req.params;
        const post = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
        try {
            const post = await PostMessage.findById(id);
            const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1}, { new: true });
            res.json(updatedPost);
        } catch (error) {
            console.log(error);
        }
    }
}

export default postController;