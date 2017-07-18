import React from 'react';
import Post from './Post';

const List = (props) => {
  let posts = props.posts.map((post) => (<Post title={post.title} 
                                      body={post.body} 
                                      author={post.author} 
                                      id={post.id}
                                      handleRemove={props.handleRemove} />)
  );
  return (
    <div>{posts}</div>
  )
}

export default List;
