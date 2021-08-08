import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart,
  faBookmark,
  faComment,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import Avatar from "../Avatar";
import { FatText } from "../shared";
import { gql, useMutation } from "@apollo/client";
import Comments from "./Comments";
import Comment from "./Comment";
import { Link } from "react-router-dom";

const SPhoto = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 5vh;
  display: flex;
  flex-direction: column;
`;

const PhotoHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1.7vh 1vw;
  span {
    margin-left: 0.8vw;
    color: ${(props) => props.theme.fontColor};
  }
`;
const PhotoImg = styled.img`
  min-width: 100%;
`;
const PhotoData = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1vh 1vw 2.5vh 1vw;
`;
const PhotoAction = styled.div`
  display: flex;
  justify-content: space-between;
  svg {
    &:not(:last-child) {
      margin-right: 0.3vw;
    }
  }
`;

const Likes = styled(FatText)`
  margin-top: 1vh;
  color: ${(props) => props.theme.fontColor};
`;

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
    }
  }
`;

const Photo = ({
  id,
  user,
  file,
  likeCount,
  isLiked,
  caption,
  comments,
  commentsCount,
}) => {
  const [toggleLike] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: { id },
    update: (cache, result) => {
      const {
        data: {
          toggleLike: { ok },
        },
      } = result;
      if (ok) {
        cache.modify({
          id: `Photo:${id}`,
          fields: {
            isLiked: (prev) => {
              return !prev;
            },
            likeCount: (prev) => {
              return isLiked ? prev - 1 : prev + 1;
            },
          },
        });
      }
    },
  });

  return (
    <SPhoto>
      <PhotoHeader>
        <Link to={`/user/${user.username}`}>
          <Avatar url={user.avatar} lg={true} />
        </Link>
        <Link to={`/user/${user.username}`}>
          <FatText>{user.username}</FatText>
        </Link>
      </PhotoHeader>
      <PhotoImg src={file} />
      <PhotoData>
        <PhotoAction>
          <div>
            <FontAwesomeIcon
              style={{ color: isLiked ? "tomato" : "inherit" }}
              icon={isLiked ? faHeartSolid : faHeart}
              size="lg"
              onClick={toggleLike}
            />
            <FontAwesomeIcon icon={faComment} size="lg" />
            <FontAwesomeIcon icon={faPaperPlane} size="lg" />
          </div>
          <div>
            <FontAwesomeIcon icon={faBookmark} size="lg" />
          </div>
        </PhotoAction>
        <Likes>{likeCount === 1 ? "1 like" : `${likeCount} likes`}</Likes>
        <Comment author={user.username} payload={caption} />
        <Comments
          photoId={id}
          comments={comments}
          commentsCount={commentsCount}
        />
      </PhotoData>
    </SPhoto>
  );
};

export default Photo;
