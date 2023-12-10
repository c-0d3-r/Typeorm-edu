import type { DataSource } from 'typeorm';

export async function seedData(dataSource: DataSource) {
  const userRepo = dataSource.getRepository('User');
  const commentRepo = dataSource.getRepository('Comment');
  const postRepo = dataSource.getRepository('Post');

  await dataSource.dropDatabase();
  await dataSource.synchronize();

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
        authorId: users.identifiers[0].id,
      },
      {
        title: 'title2',
        content: 'content2',
        authorId: users.identifiers[1].id,
      },
      {
        title: 'title3',
        content: 'content3',
        authorId: users.identifiers[2].id,
      },
    ]);

    await commentRepo.insert([
      {
        text: 'comment1',
        authorId: users.identifiers[0].id,
        postId: posts.identifiers[0].id,
      },
      {
        text: 'comment2',
        authorId: users.identifiers[1].id,
        postId: posts.identifiers[1].id,
      },
      {
        text: 'comment3',
        authorId: users.identifiers[2].id,
        postId: posts.identifiers[2].id,
      },
    ]);
  }
}
