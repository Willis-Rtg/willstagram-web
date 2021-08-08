import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import useUser from "../../hooks/useUser";
import Comment from "./Comment";

const CommentWrapper = styled.div``;
const CommentCount = styled.span`
  opacity: 0.7;
  font-size: 0.6rem;
`;
const SComments = styled.div``;
const CommentForm = styled.form`
  margin-top: 2vh;
`;
const CommentInput = styled.input`
  width: 100%;
  &::placeholder {
    opacity: 0.7;
  }
`;

const CREATE_COMMENT = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      id
      ok
      error
    }
  }
`;
const Comments = ({ photoId, comments, commentsCount }) => {
  const { register, handleSubmit, getValues, setValue } = useForm();
  const {
    data: { me },
  } = useUser();
  const [createComment] = useMutation(CREATE_COMMENT, {
    update: (cache, data) => {
      const {
        data: {
          createComment: { ok, id },
        },
      } = data;
      const { payload } = getValues();
      setValue("payload", "");
      const newComment = {
        id,
        payload,
        isMine: true,
        user: me,
      };
      if (ok) {
        const cacheComment = cache.writeFragment({
          id: `Comment:${id}`,
          fragment: gql`
            fragment BSName on Comment {
              id
              payload
              isMine
              user
            }
          `,
          data: newComment,
        });
        cache.modify({
          id: `Photo:${photoId}`,
          fields: {
            comments: (prev) => {
              return [...prev, cacheComment];
            },
          },
        });
      }
    },
  });
  const onSubmitValid = async (data) => {
    await createComment({
      variables: { ...data, photoId },
    });
  };
  return (
    <CommentWrapper>
      <CommentCount>
        {commentsCount === 1 ? "1 comment" : `${commentsCount} comments`}
      </CommentCount>
      <SComments>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            id={comment.id}
            author={comment.user.username}
            payload={comment.payload}
            isMine={comment.isMine}
            photoId={photoId}
          />
        ))}
      </SComments>
      <CommentForm onSubmit={handleSubmit(onSubmitValid)}>
        <CommentInput
          {...register("payload", { required: true })}
          placeholder="Wirte comment..."
        />
      </CommentForm>
    </CommentWrapper>
  );
};

export default Comments;
