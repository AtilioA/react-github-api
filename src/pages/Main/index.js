import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import { Form, SubmitButton, List } from './styles';

import api from '../../services/api';
import Container from '../../components/Container/index.js';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    repositoryNotFound: false,
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = (event) => {
    this.setState({ newRepo: event.target.value });
  };
  handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const { newRepo, repositories } = this.state;

      this.setState({ loading: true });

      const response = await api.get(`/repos/${newRepo}`);

      const data = { name: response.data.full_name };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: false,
        repositoryNotFound: false,
      });
    } catch (err) {
      console.log('Repository not found:', err);
      this.setState({
        loading: false,
        repositoryNotFound: true,
      });
    }
  };

  render() {
    const { newRepo, repositories, loading, repositoryNotFound } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt /> Repositories
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Add repository"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton
            loading={loading}
            repositoryNotFound={repositoryNotFound}
          >
            {loading ? (
              <FaSpinner color="#EEE" size={14} />
            ) : (
                <FaPlus color="#EEE" size={14} />
              )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map((repository) => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Details
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
