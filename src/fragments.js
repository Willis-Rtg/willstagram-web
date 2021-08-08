import { gql } from "@apollo/client";

export const PHOTO_FRAGMENT = gql`
  fragment PhotoFragment on Photo {
    id
    file
    likeCount
    commentsCount
    isLiked
  }
`;

export const COMMNET_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    payload
    isMine
    user {
      id
      username
      avatar
    }
  }
`;
