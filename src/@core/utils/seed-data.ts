import type { DataSource } from 'typeorm';

import { Product }         from 'src/modules/products/domain/entities/product.entity';
import { User }            from 'src/modules/users/domain/entities/user.entity';

export async function seedData(dataSource: DataSource) {
  const userRepo = dataSource.getRepository('User');
  const commentRepo = dataSource.getRepository('Comment');
  const postRepo = dataSource.getRepository('Post');

  await dataSource.dropDatabase();
  await dataSource.synchronize();

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

  const product1 = new Product();
  product1.title = 'Sherlock Holmes';
  product1.users = [{ id: users.identifiers[2].id } as User];
  await dataSource.manager.save(product1);

  const product2 = new Product();
  product2.title = 'The Hobbit';
  product2.users = [{ id: users.identifiers[1].id } as User];
  await dataSource.manager.save(product2);

  const product3 = new Product();
  product3.title = 'The Lord of the Rings';
  product3.users = [{ id: users.identifiers[0].id } as User];
  await dataSource.manager.save(product3);

  const product4 = new Product();
  product4.title = 'Spider Man';
  product4.users = [{ id: users.identifiers[0].id } as User];
  await dataSource.manager.save(product4);

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
