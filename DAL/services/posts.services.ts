import { Post, PostWithoutId, PartialPost } from '../common/posts.interface'
import * as Dao from '../DAO/posts.dao';
import * as mapping from '../mapping/posts.mapping'
import { HttpError } from '../common/error.class';

export async function get(id?: number){
    if (id) {
        let post = await Dao.findPostById(id);
        if (!post) {
            throw new HttpError(`Post with id ${id} not found`, 404);
        }
        return mapping.mapPostEntityToPost(post);
    } else {
        let posts = await Dao.findAllPosts();
        return posts.map(post => mapping.mapPostEntityToPost(post));
    }
}

export async function create(post_data: Post){
    let post = await Dao.createPost(mapping.mapPostToPostEntity(post_data));
    return mapping.mapPostEntityToPost(post);
}

export async function update(id: number, postData: PartialPost){
    let oldPostEntity = await Dao.findPostById(id);
    if (!oldPostEntity) {
        throw new HttpError(`Post with id ${id} not found`, 404);
    }
    let oldPost = mapping.mapPostEntityToPost(oldPostEntity);
    let post = await Dao.updatePost(mapping.mapPostToPostEntity({
        id: id,
        dateCreation: postData.dateCreation ?? oldPost.dateCreation,
        title: postData.title ?? oldPost.title,
        text: postData.text ?? oldPost.text,
        userId: postData.userId ?? oldPost.userId
    }));
    return mapping.mapPostEntityToPost(post);
}

export async function remove(id: number){
    await Dao.deletePost(id);
    return 'user deleted';
}