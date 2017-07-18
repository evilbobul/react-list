import _ from 'lodash';

const toSentenceCase = (str) => str.replace(str[0], str[0].toUpperCase());

const sortPosts = (array, criteria) => {
  switch (criteria) {
    case 'Author':
      return _.sortBy(array, ((o) => o.author.name));
    case 'City':
      return _.sortBy(array, ((o) => o.author.address.city));
    case 'Company':
      return _.sortBy(array, ((o) => o.author.company.name));
    default:
      return array;
  };
}

export { toSentenceCase, sortPosts };
