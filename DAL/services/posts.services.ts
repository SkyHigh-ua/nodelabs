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

export async function update(id: number, post_data: PartialPost){
    let old_post_entity = await Dao.findPostById(id);
    if (!old_post_entity) {
        throw new HttpError(`Post with id ${id} not found`, 404);
    }
    let old_post = mapping.mapPostEntityToPost(old_post_entity);
    let post = await Dao.updatePost(mapping.mapPostToPostEntity({
        id: id,
        dateCreation: post_data.dateCreation ? post_data.dateCreation : old_post.dateCreation,
        title: post_data.title ? post_data.title : old_post.title,
        text: post_data.text ? post_data.text : old_post.text,
        userId: post_data.userId ? post_data.userId : old_post.userId
    }));
    return mapping.mapPostEntityToPost(post);
}

export async function remove(id: number){
    await Dao.deletePost(id);
    return 'user deleted';
}