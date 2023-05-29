import { connection } from '../datasource/db.datasource';
import { UserEntity } from '../entities/users.entity';

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
  return connection.manager.merge(UserEntity, user);
}

export async function deleteUser(id: number): Promise<void> {
  await connection.manager.delete(UserEntity, id);
}