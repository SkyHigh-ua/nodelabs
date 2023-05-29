import { User, UserWithoutId, PartialUser } from '../common/users.interface'
import * as Dao from '../DAO/users.dao';
import * as mapping from '../mapping/users.mapping'
import { HttpError } from '../common/error.class';

export async function get(
    id?: number,
    filter?: { age?: number; city?: string; postTitle?: string },
    page?: number,
    limit?: number
  ) {
    if (id) {
      const user = await Dao.findUserById(id);
      if (!user) {
        throw new HttpError(`User with id ${id} not found`, 404);
      }
      return mapping.mapUserEntityToUser(user);
    } else {
      const users = await Dao.findAllUsers(filter, page, limit);
      return users.map((user) => mapping.mapUserEntityToUser(user));
    }
  }

export async function create(userData: User){
    let user = await Dao.createUser(mapping.mapUserToUserEntity(userData));
    return mapping.mapUserEntityToUser(user);
}

export async function update(id: number, userData: PartialUser){
    let oldUserEntity = await Dao.findUserById(id);
    if (!oldUserEntity) {
      throw new HttpError(`User with id ${id} not found`, 404);
    }
    let oldUser = mapping.mapUserEntityToUser(oldUserEntity);
    let updatedUser = await Dao.updateUser(mapping.mapUserToUserEntity({
        id: id,
        username: userData.username ?? oldUser.username, 
        email: userData.email ?? oldUser.email,
        age: userData.age ?? oldUser.age,
        info: userData.info ?? oldUser.info,
        address: userData.address ? {
          city: userData.address.city ?? oldUser.address.city,
          street: userData.address.street ?? oldUser.address.street
        } : oldUser.address
    }));
    return mapping.mapUserEntityToUser(updatedUser);
}

export async function remove(id: number){
    await Dao.deleteUser(id);
    return 'user deleted';
}