import { connection } from '../datasouce/db.datasouce';
import { UserEntity } from '../entities/users.entity';
import { PostEntity } from '../entities/posts.entity';

export async function createUser(user: UserEntity): Promise<UserEntity> {
  return connection.manager.save(UserEntity, user);
}

export async function findAllUsers(
  filter?: { age?: number; city?: string; postTitle?: string },
  page?: number,
  limit?: number
) {
  const query = connection.createQueryBuilder(UserEntity, 'User');

  if (filter?.age) {
    query.andWhere('User.age = :age', { age: filter.age });
  }

  if (filter?.city) {
    query.andWhere('User.address.city = :city', { city: filter.city });
  }

  if (filter?.postTitle) {
    query.innerJoin('User.posts', 'Post').andWhere('Post.title = :title', { title: filter.postTitle });
  }

  if (page && limit) {
    query.skip((page - 1) * limit).take(limit);
  }

  const users = await query.getMany();
  return users;
}
export async function findUserById(id: number): Promise<UserEntity | null> {
  return connection.manager.findOne(UserEntity, {
    where: { id },
  });
}

export async function updateUser(user: UserEntity): Promise<UserEntity> {
  return connection.manager.save(UserEntity, user);
}

export async function deleteUser(id: number): Promise<void> {
  await connection.manager.delete(UserEntity, id);
}

export async function createPost(post: PostEntity): Promise<PostEntity> {
  return connection.manager.save(PostEntity, post);
}

export async function findAllPosts(): Promise<PostEntity[]> {
  return connection.manager.find(PostEntity);
}

export async function findPostById(id: number): Promise<PostEntity | null> {
  return connection.manager.findOne(PostEntity, {
    where: { id },
  });
}

export async function updatePost(post: PostEntity): Promise<PostEntity> {
  return connection.manager.save(PostEntity, post);
}

export async function deletePost(id: number): Promise<void> {
  await connection.manager.delete(PostEntity, id);
}