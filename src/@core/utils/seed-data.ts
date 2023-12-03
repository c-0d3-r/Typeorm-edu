import type { DataSource } from 'typeorm';

export async function seedData(dataSource: DataSource) {
  const userRepo = dataSource.getRepository('User');
  const commentRepo = dataSource.getRepository('Comment');
  const postRepo = dataSource.getRepository('Post');

  const usersCount = await userRepo.count();

  if (!usersCount) {
    const users = await userRepo.insert([
      {
        username: 'bob',
        email: 'bob@gmail.com',
      },
      {
        username: 'alice',
        email: 'alice@gmail.com',
      },
      {
        username: 'eve',
        email: 'eve@gmail.com',
      },
    ]);

    const posts = await postRepo.insert([
      {
        title: 'title1',
        content: 'content1',
        author: users.identifiers[0].id,
      },
      {
        title: 'title2',
        content: 'content2',
        author: users.identifiers[1].id,
      },
      {
        title: 'title3',
        content: 'content3',
        author: users.identifiers[2].id,
      },
    ]);

    await commentRepo.insert([
      {
        text: 'comment1',
        author: users.identifiers[0].id,
        post: posts.identifiers[0].id,
      },
      {
        text: 'comment2',
        author: users.identifiers[1].id,
        post: posts.identifiers[1].id,
      },
      {
        text: 'comment3',
        author: users.identifiers[2].id,
        post: posts.identifiers[2].id,
      },
    ]);
  }
}
