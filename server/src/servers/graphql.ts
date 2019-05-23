export const resolvers = {
  Query: {
    publishedPosts(parent: any, args: any, context: any, infos: any) {
      return context.prisma.posts({ where: { published: true } });
    },
    post(parent: any, args: any, context: any, infos: any) {
      return context.prisma.post({ id: args.postId });
    },
    postsByUser(parent: any, args: any, context: any, infos: any) {
      return context.prisma
        .user({
          id: args.userId
        })
        .posts();
    }
  },
  Mutation: {
    createDraft(parent: any, args: any, context: any, infos: any) {
      return context.prisma.createPost({
        title: args.title,
        author: {
          connect: { id: args.userId }
        }
      });
    },
    publish(parent: any, args: any, context: any, infos: any) {
      return context.prisma.updatePost({
        where: { id: args.postId },
        data: { published: true }
      });
    },
    createUser(parent: any, args: any, context: any, infos: any) {
      return context.prisma.createUser({ name: args.name, email: args.email });
    }
  },
  User: {
    posts(parent: any, args: any, context: any, infos: any) {
      return context.prisma
        .user({
          id: parent.id
        })
        .posts();
    }
  },
  Post: {
    author(parent: any, args: any, context: any, infos: any) {
      return context.prisma
        .post({
          id: parent.id
        })
        .author();
    }
  }
};
