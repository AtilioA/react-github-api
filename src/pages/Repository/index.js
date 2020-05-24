import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import parse from 'parse-link-header';
import api from '../../services/api';

import { FaSpinner, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { MdArrowBack } from 'react-icons/md';
import { Loading, Owner, IssuesList, Button, PageController } from './styles';
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
    page: 1,
    previousPage: 1,
    nextPage: 1,
    lastPage: 1,
    firstPage: 1,
    issuesState: 'open',
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

    const parsedHeaderLink = parse(issues.headers.link);
    console.log(parsedHeaderLink);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
      page: 1,
      lastPage: parseInt(parsedHeaderLink?.last?.page),
      nextPage: parseInt(parsedHeaderLink?.next?.page),
      firstPage: parseInt(parsedHeaderLink?.first?.page),
      previousPage: parseInt(parsedHeaderLink?.prev?.page),
    });
  }

  async getIssues(state) {
    const repoName = decodeURIComponent(this.props.match.params.repositoryName);

    const issues = await api.get(`repos/${repoName}/issues`, {
      params: {
        state: state,
        per_page: 5,
      },
    });

    this.setState({
      issues: issues.data,
      state: state,
    });
  }

  async getPage(page) {
    console.log(this.props.match.params.repositoryName);
    const repoName = decodeURIComponent(this.props.match.params.repositoryName);

    const issues = await api.get(`repos/${repoName}/issues`, {
      params: {
        state: this.state.issueState,
        per_page: 5,
        page: page,
      },
    });

    const parsedHeaderLink = parse(issues.headers.link);
    console.log(parsedHeaderLink);

    this.setState({
      issues: issues.data,
      page: page,
      lastPage: parseInt(parsedHeaderLink?.last?.page),
      nextPage: parseInt(parsedHeaderLink?.next?.page),
      firstPage: parseInt(parsedHeaderLink?.first?.page),
      previousPage: parseInt(parsedHeaderLink?.prev?.page),
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
          <h2
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            Issues
          </h2>
          <br />
          <Button>
            <button onClick={() => this.getIssues('open')}>Open</button>
            <button onClick={() => this.getIssues('closed')}>Closed</button>
            <button onClick={() => this.getIssues('all')}>All</button>
          </Button>
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

        <PageController>
          <button onClick={() => this.getPage(this.state['previousPage'])}>
            <FaAngleLeft color="#FFF" size={20} />
          </button>
          <small>{this.state['page']}</small>
          <button onClick={() => this.getPage(this.state['nextPage'])}>
            <FaAngleRight color="#FFF" size={20} />
          </button>
        </PageController>
      </Container>
    );
  }
}
