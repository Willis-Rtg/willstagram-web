import { gql, useMutation } from "@apollo/client";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FatText } from "../shared";

const SComment = styled.div`
  padding-top: 2vh;

  & > span {
    margin-right: 0.5vw;
  }
  a {
    background: inherit;
    color: ${(props) => props.theme.accent};
    &:hover {
      text-decoration: underline;
    }
  }
`;
const Delete = styled.span`
  opacity: 0.5;
  cursor: pointer;
`;
const DELETE_COMMENT = gql`
  mutation deleteComment($commentId: Int!) {
    deleteComment(commentId: $commentId) {
      ok
    }
  }
`;

const Comment = ({ photoId, id, author, payload, isMine }) => {
  const [deleteComment] = useMutation(DELETE_COMMENT, {
    variables: { commentId: id },
    update: (cache, result) => {
      const {
        data: {
          deleteComment: { ok },
        },
      } = result;
      if (ok) {
        cache.evict({ id: `Comment:${id}` });
        cache.modify({
          id: `Photo:${photoId}`,
          fields: {
            commentsCount: (prev) => prev - 1,
          },
        });
      }
    },
  });
  return (
    <SComment>
      <Link to={`/user/${author}`}>
        <FatText>{author}</FatText>
      </Link>{" "}
      <span>
        {payload.split(" ").map((word, index) => {
          const hash = /#[\w]+/g.test(word);
          const profile = /@[\w]+/g.test(word);
          if (hash)
            return (
              <Fragment key={index}>
                <Link to={`/hashtag/${word}`}>{word}</Link>{" "}
              </Fragment>
            );
          else if (profile)
            return (
              <Fragment key={index}>
                <Link to={`/profile/${word}`}>{word}</Link>{" "}
              </Fragment>
            );
          else return <Fragment key={index}>{word} </Fragment>;
        })}
      </span>
      {isMine && <Delete onClick={() => deleteComment()}>x</Delete>}
    </SComment>
  );
};

export default Comment;
