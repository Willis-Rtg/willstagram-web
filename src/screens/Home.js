import { gql, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { logUserOut } from "../apollo";
import PageTitle from "../components/PageTitle";
import Photo from "../components/Photo/Photo";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      user {
        id
        username
        avatar
      }
      file
      caption
      likeCount
      commentsCount
      comments {
        id
        payload
        isMine
        user {
          id
          username
          avatar
        }
      }
      isMine
      isLiked
      createdAt
    }
  }
`;
const Photos = styled.div`
  max-width: 614px;
`;

const Home = () => {
  const history = useHistory();
  const { data } = useQuery(FEED_QUERY);

  return (
    <Photos>
      <PageTitle title="Home" />
      {data?.seeFeed.map((photo) => (
        <Photo key={photo.id} {...photo} />
      ))}
      <button onClick={() => logUserOut(history)}>Log Out Now</button>
    </Photos>
  );
};

export default Home;
