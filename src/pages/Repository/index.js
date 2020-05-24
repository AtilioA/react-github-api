import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import { FaSpinner } from 'react-icons/fa';
import { MdArrowBack } from 'react-icons/md';
import { Loading, Owner, IssuesList } from './styles';
import Container from '../../components/Container/index';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };
  state = {
    repository: {},
    issues: [],
    loading: true,
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repositoryName);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  render() {
    const { repository, issues, loading } = this.state;

    if (loading) {
      return (
        <Loading>
          <FaSpinner color="#EEE" size={48} />
        </Loading>
      );
    }

    return (
      <Container>
        <Owner>
          <Link to="/">
            {' '}
            <MdArrowBack size={16} />
            Back to repositories
          </Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <small>Author: {repository.owner.login}</small>

          <h1>
            <a href={repository.html_url}>{repository.name}</a>
          </h1>
          <p>{repository.description}</p>
        </Owner>

        <IssuesList>
          {issues.map((issue) => (
            <li key={String(issue.id)}>
              <a href={issue.user.html_url}>
                <img src={issue.user.avatar_url} alt={issue.user.login} />
              </a>
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map((label) => (
                    <a href={label.url}>
                      <span key={String(label.id)}>{label.name}</span>
                    </a>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssuesList>
      </Container>
    );
  }
}
