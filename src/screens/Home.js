import { gql, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { logUserOut } from "../apollo";
import PageTitle from "../components/PageTitle";
import Photo from "../components/Photo/Photo";
import { COMMNET_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      ...PhotoFragment
      user {
        id
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      isMine
      createdAt
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMNET_FRAGMENT}
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
