import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { AUTH_TOKEN } from '../../config/constants';


class Header extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    const { history } = this.props;
    return (
      <div className="flex pa1 justify-between nowrap orange">
        <div className="flex flex-fixed black">
          <div className="fw7 mr1">Hacker News</div>
          <Link to="/" className="ml1 no-underline black">
            Feed
          </Link>
          <div className="ml1">|</div>
          <Link to="/create" className="ml1 no-underline black">
            Add New
          </Link>
        </div>
        <div className="flex flex-fixed">
          {authToken ? (
            <div
              role="button"
              tabIndex={0}
              className="ml1 pointer black"
              onClick={() => {
                localStorage.removeItem(AUTH_TOKEN);
                history.push('/');
              }}
            >
              logout
            </div>
          ) : (
            <Link to="/login" className="ml1 no-underline black">
              login
            </Link>
          )}
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Header);
