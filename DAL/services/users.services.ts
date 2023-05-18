import { User, Userwithoutid, UserWithUnderfined } from '../common/users.interface'
import * as Dao from '../DAO/db.dao';
import * as mapping from '../mapping/users.mapping'

export async function get(
    id?: number,
    filter?: { age?: number; city?: string; postTitle?: string },
    page?: number,
    limit?: number
  ) {
    if (id) {
      const user = await Dao.findUserById(id);
      if (!user) {
        throw new Error(`User with id ${id} not found`);
      }
      return mapping.mapUserEntityToUser(user);
    } else {
      const users = await Dao.findAllUsers(filter, page, limit);
      return users.map((user) => mapping.mapUserEntityToUser(user));
    }
  }

export async function create(user_data: User){
    let user = await Dao.createUser(mapping.mapUserToUserEntity(user_data));
    return mapping.mapUserEntityToUser(user);
}

export async function update(id: number, user_data: UserWithUnderfined){
    let old_user_entity = await Dao.findUserById(id);
    if (!old_user_entity) {
      throw new Error(`User with id ${id} not found`)
    }
    let old_user = mapping.mapUserEntityToUser(old_user_entity);
    let updatedUser = await Dao.updateUser(mapping.mapUserToUserEntity({
        id: id,
        username: user_data.username ? user_data.username : old_user.username, 
        email: user_data.email ? user_data.email : old_user.email,
        age: user_data.age ? user_data.age : old_user.age,
        info: user_data.info ? user_data.info : old_user.info,
        address: user_data.address ? {
          city: user_data.address.city ? user_data.address.city : old_user.address.city,
          street: user_data.address.street ? user_data.address.street : old_user.address.street
        } : old_user.address
    }));
    return mapping.mapUserEntityToUser(updatedUser);
}

export async function remove(id: number){
    await Dao.deleteUser(id);
    return 'user deleted';
}