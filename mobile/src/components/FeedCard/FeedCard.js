import React from 'react';
import styled from 'styled-components/native';
import { graphql } from 'react-apollo';

import FeedCardHeader from './FeedCardHeader';
import FeedCardFooter from './FeedCardFooter';
import FAVORITE_TWEET_MUTATION from '../../graphql/mutations/favoriteTweet';

const Root = styled.View`
  minHeight: 180;
  width: 100%;
  backgroundColor: ${props => props.theme.WHITE};
  shadowColor: ${props => props.theme.SECONDARY}
  shadowOffset: 0px 2px;
  shadowRadius: 2;
  shadowOpacity: 0.1;
  padding: 7px;
  marginVertical: 5px;
`;

const CardContentContainer = styled.View`
  flex: 1;
  padding: 20px 20px 10px 0px;
`;

const CardContentText = styled.Text`
  color: ${props => props.theme.SECONDARY};
  fontSize: 14;
  fontWeight: 500;
  textAlign: left;
`;

function FeedCard({
  text,
  user,
  createdAt,
  favoriteCount,
  favorite,
  isFavorited
}) {
  return (
    <Root>
      <FeedCardHeader {...user} createdAt={createdAt} />
      <CardContentContainer>
        <CardContentText>
          {text}
        </CardContentText>
      </CardContentContainer>
      <FeedCardFooter
        isFavorited={isFavorited}
        favoriteCount={favoriteCount}
        onFavoritePress={favorite}
      />
    </Root>
  )
}

export default graphql(FAVORITE_TWEET_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    favorite: () =>
      mutate({
        variables: { _id: ownProps._id },
        optimisticResponse: {
          __typename: 'Mutation',
          favoriteTweet: {
            __typename: 'Tweet',
            _id: ownProps._id,
            favoriteCount: ownProps.isFavorited
              ? ownProps.favoriteCount - 1
              : ownProps.favoriteCount + 1,
            isFavorited: !ownProps.isFavorited,
          },
        },
      }),
  }),
})(FeedCard);
