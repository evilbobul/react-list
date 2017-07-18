import React from 'react';
import { toSentenceCase } from '../helpers/helpers';

const Post = ({ title, body, id, author, handleRemove }) => {
  return (
    <article>
      <h2>{ toSentenceCase(title) }</h2>
      <span>{ author.name }</span> - <span>{ author.company.name }</span> - <span>{ author.address.city }</span>
      <p>{ toSentenceCase(body) }</p>
      <button onClick={() => handleRemove(id)}>X</button>
    </article> );
}

export default Post;
