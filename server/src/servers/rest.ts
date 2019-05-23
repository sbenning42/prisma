import { prisma } from "../generated/prisma-client";
import { Application } from "express";

export function applyRestEndpoints(app: Application) {

  // All published posts
  app.get(`/posts/published`, async (req, res) => {
    const publishedPosts = await prisma.posts({ where: { published: true } });
    res.json(publishedPosts);
  });

  // A post by it's id
  app.get(`/post/:postId`, async (req, res) => {
    const { postId } = req.params;
    const post = await prisma.post({ id: postId });
    res.json(post);
  });

  // All post of user userId
  app.get(`/posts/user/:userId`, async (req, res) => {
    const { userId } = req.params;
    const postsByUser = await prisma.user({ id: userId }).posts();
    res.json(postsByUser);
  });

  // Create an user
  app.post(`/user`, async (req, res) => {
    const newUser = await prisma.createUser(req.body);
    res.json(newUser);
  });

  // Create a post
  app.post(`/post/draft`, async (req, res) => {
    const input = {
      title: req.body.title,
      author: {
        connect: { id: req.body.userId },
      },
    }
    const newPost = await prisma.createPost(input);
    res.json(newPost);
  });

  // Publish a post
  app.put(`/post/publish/:postId`, async (req, res) => {
    const { postId } = req.params;
    const updatedPost = await prisma.updatePost({
      where: { id: postId },
      data: { published: true }
    });
    res.json(updatedPost);
  });

}
