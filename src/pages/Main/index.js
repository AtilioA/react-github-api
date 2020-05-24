import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import { Form, SubmitButton, List } from './styles';

import api from '../../services/api';
import Container from '../../components/Container/index.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: false,
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

      for (let repository of repositories) {
        if (repository.name.toLowerCase() === newRepo.toLowerCase()) {
          throw new Error('Error: duplicated repository');
        }
      }

      this.setState({ loading: true });

      const response = await api.get(`/repos/${newRepo}`);

      const data = { name: response.data.full_name };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: false,
        error: false,
      });
    } catch (err) {
      toast.error('Duplicated repository or repository not found!', {
        position: 'bottom-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.log('Duplicated repository or repository not found:', err);
      this.setState({
        loading: false,
        error: true,
      });
      console.log(this.state.error);
    }
  };

  render() {
    const { newRepo, repositories, loading, error } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt /> Repositories
        </h1>

        <Form onSubmit={this.handleSubmit} error={error}>
          <input
            type="text"
            placeholder="Add repository"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading ? 1 : 0}>
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
        <ToastContainer />
      </Container>
    );
  }
}
