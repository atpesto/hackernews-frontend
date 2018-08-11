import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { timeDifferenceForDate } from '../../utils/timeDifference';
import { AUTH_TOKEN } from '../../config/constants';


const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

class Link extends Component {
  render() {
    const { link, index, updateStoreAfterVote } = this.props;
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return (
      <div className="flex mt2 items-start">
        <div className="flex items-center">
          <span className="gray">{index + 1}.</span>
          {
            authToken
            && (
              <Mutation
                mutation={VOTE_MUTATION}
                variables={{ linkId: link.id }}
                update={(store, { data: { vote } }) =>
                  updateStoreAfterVote(store, vote, link.id)
                }
              >
                {
                  voteMutation => (
                    <div
                      role="button"
                      tabIndex={0}
                      className="ml1 gray f11"
                      onClick={voteMutation}
                    >
                      ▲
                    </div>
                  )
                }
              </Mutation>
            )
          }
        </div>
        <div className="ml1">
          <div>
            {link.description} ({link.url})
          </div>
          <div className="f6 lh-copy gray">
            {link.votes.length} votes | by{' '}
            {link.postedBy
              ? link.postedBy.name
              : 'Unknown'}{' '}
            {
              timeDifferenceForDate(link.createdAt)
            }
          </div>
        </div>
      </div>
    );
  }
}


Link.propTypes = {
  link: PropTypes.shape({
    description: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  updateStoreAfterVote: PropTypes.func.isRequired,
};

export default Link;
