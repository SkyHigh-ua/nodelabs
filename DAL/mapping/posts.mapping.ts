import { Post } from '../common/posts.interface';
import { PostEntity } from '../entities/posts.entity';

export function mapPostToPostEntity(post: Post): PostEntity {
  const postEntity = new PostEntity();
  postEntity.id = post.id;
  postEntity.dateCreation = post.dateCreation
  postEntity.title = post.title
  postEntity.text = post.text
  postEntity.userId = post.userId
  return postEntity;
}

export function mapPostEntityToPost(postEntity: PostEntity): Post {
  const post: Post = {
    id: postEntity.id,
    dateCreation: postEntity.dateCreation,
    title: postEntity.title,
    text: postEntity.text,
    userId: postEntity.userId
  };
  return post;
}