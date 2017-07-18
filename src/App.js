import React, { Component } from 'react';
import _ from 'lodash';
import { sortPosts } from './helpers/helpers'
import List from './components/List';
import Dropdown from './components/Dropdown';
import SearchInput from './components/SearchInput';
import { compose, curry } from 'ramda';

import './App.css';

import posts from './stubs/posts';
import users from './stubs/users';

class App extends Component {
  constructor(props) {
    super(props);
    this.setCityFilter = this.setCityFilter.bind(this);
    this.setCompanyFilter = this.setCompanyFilter.bind(this);
    this.setSorting = this.setSorting.bind(this);
    this.filterByCity = this.filterByCity.bind(this);
    this.filterByCompany = this.filterByCompany.bind(this);
    this.filterByTitle = this.filterByTitle.bind(this);
    this.setSearchText = this.setSearchText.bind(this);
    this.removePost = this.removePost.bind(this);

    this.state = {
      mergedPosts: [],
      cityFilter: '',
      companyFilter: '',
      sortingCriteria: '',
      searchText: ''
    }

  }

  createPosts(posts, users) {
    const merged = posts.map((post) => {
      const author = users.find((user) => (user.id == post.userId));
      return Object.assign({}, post, { author: author });
    })
    this.setState({ mergedPosts: merged })
  }

  componentDidMount() {
    //get data from backend here - so here we should have some api call that on success would update the state
    this.createPosts(posts, users);
  }

  setCityFilter(event) {
    this.setState({ cityFilter: event.target.value });
  }

  setCompanyFilter(event) {
    this.setState({ companyFilter: event.target.value });
  }

  setSorting(event) {
    this.setState({ sortingCriteria: event.target.value });
  }

  setSearchText(event) {
    this.setState({ searchText: event.target.value });
  }

  filterByCity(posts) {
    return this.state.cityFilter ? (posts.filter((post) => (post.author.address.city === this.state.cityFilter))) : posts;
  }

  filterByCompany(posts) {
    return this.state.companyFilter ? (posts.filter((post) => (post.author.company.name === this.state.companyFilter))) : posts;
  }

  filterByTitle(posts) {
    return this.state.searchText ? (posts.filter((post) => (post.title.includes(this.state.searchText)))) : posts;
  }

  removePost(id) {
    this.setState({ mergedPosts: _.without(this.state.mergedPosts, _.remove(this.state.mergedPosts, ((o) => (o.id === id)))) });
  }

  render() {
    const currySort = curry(sortPosts);
    const generatePosts = compose(
      currySort, 
      this.filterByTitle, 
      this.filterByCompany, 
      this.filterByCity)(this.state.mergedPosts);
      
    return (
      <div className="App">
        <h1>Posts</h1>

        {/*  this can be moved to a Nav component to make it cleaner */}

        <nav>
          <Dropdown label="City filter: " keys={_.uniq(users.map((user) => user.address.city))} handleChange={this.setCityFilter} />
          <Dropdown label="Company filter: " keys={_.uniq(users.map((user) => user.company.name))} handleChange={this.setCompanyFilter} />
          <SearchInput label="Quick search by post title " type="text" handleChange={this.setSearchText} />
          <hr />
          <Dropdown label="Sort by: " keys={['Author', 'City', 'Company']} handleChange={this.setSorting} />
        </nav>

        {/*  this was ugly 
        <List posts={sortPosts(this.filterByTitle(this.filterByCompany(this.filterByCity(this.state.mergedPosts))), this.state.sortingCriteria)} 
          handleRemove={this.removePost} /> 
            so I tried to do this with more functional approach
            even this is not purely functional as relates to the state - at least compose make this nesting look nicer :)
        */}

        <List posts={generatePosts(this.state.sortingCriteria)} 
          handleRemove={this.removePost} /> 
      </div>
    );
  }
}

export default App;
