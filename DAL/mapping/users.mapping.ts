import { User } from '../common/users.interface'
import { UserEntity } from '../entities/users.entity'

export function mapUserToUserEntity(user: User): UserEntity {
  const userEntity = new UserEntity();
  userEntity.id = user.id;
  userEntity.username = user.username;
  userEntity.email = user.email;
  userEntity.age = user.age;
  userEntity.info = user.info;
  userEntity.address = user.address;
  return userEntity;
}

export function mapUserEntityToUser(userEntity: UserEntity): User {
  const user: User = {
    id: userEntity.id,
    username: userEntity.username,
    email: userEntity.email,
    age: userEntity.age,
    info: userEntity.info,
    address: userEntity.address
  };
  return user;
}