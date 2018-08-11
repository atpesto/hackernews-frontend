import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import { gql } from 'apollo-boost';

import Link from '../Link';


const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      links {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

class Search extends Component {
  state = {
    links: [],
    filter: '',
    searchCount: undefined,
  }

  executeSearch = async () => {
    const { filter } = this.state;
    const { client } = this.props;
    const result = await client.query({
      query: FEED_SEARCH_QUERY,
      variables: { filter },
    });
    const { links } = result.data.feed;
    this.setState({
      links,
      searchCount: links.length,
    });
  }

  render() {
    const { links, searchCount } = this.state;
    return (
      <div>
        <div>
          Search
          <input
            type="text"
            onChange={e => this.setState({ filter: e.target.value })}
          />
          <button type="button" onClick={() => this.executeSearch()}>OK</button>
        </div>
        {
          (searchCount !== undefined && searchCount === 0)
          && (
            <div style={{ marginTop: '20px' }}>
              No links found. Try a different search query?
            </div>
          )
        }
        {
          (links.length > 0)
          && (
            <div style={{ marginTop: '20px' }}>
              {
                links.map((link, index) => (
                  <Link key={link.id} link={link} index={index} />
                ))
              }
            </div>
          )
        }
      </div>
    );
  }
}

export default withApollo(Search);
