import { gql, useMutation, useQuery } from "@apollo/client";
import { faCommentAlt, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PageTitle from "../components/PageTitle";
import { FatText } from "../components/shared";
import { PHOTO_FRAGMENT } from "../fragments";
import useUser from "../hooks/useUser";

const SEE_PROFILE = gql`
  query seeProfile($username: String) {
    seeProfile(username: $username) {
      id
      firstName
      lastName
      username
      password
      bio
      avatar
      photos {
        ...PhotoFragment
      }
      totalFollowing
      totalFollowers
      isFollowing
      isMe
    }
  }
  ${PHOTO_FRAGMENT}
`;
const SProfile = styled.section`
  display: flex;
  flex-direction: column;
`;
const ProfileInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const AvatarWrapper = styled.div`
  width: 35%;
  display: flex;
  justify-content: center;
`;
const AvatarBig = styled.img`
  border-radius: 50%;
  width: 150px;
  height: 150px;
`;
const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
`;
const Row = styled.div`
  display: flex;
`;
const Username = styled.span`
  font-size: 2rem;
`;
const Button = styled.button`
  background-color: ${(props) => props.theme.accent};
  text-align: center;
  padding: 3px 10px;
  border-radius: 6px;
  color: white;
  font-weight: 600;
  margin-left: 2vw;
`;

const CountInfo = styled.div`
  margin-top: 3vh;
  display: flex;
`;
const CountColumn = styled.div`
  margin-right: 40px;
  font-size: 1rem;
`;
const FullName = styled.div`
  margin-top: 4.5vh;
  display: flex;
  flex-direction: column;
  span {
    font-size: 1.1rem;
  }
  p {
    margin-top: 1.5vh;
    font-size: 1rem;
  }
`;
const Gellery = styled.div`
  padding-top: 4vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  row-gap: 15px;
`;
const GelleryPhotoWrapper = styled.div`
  overflow: hidden;
  /* max-width: 293px; */
  max-height: 293px;
  position: relative;
  &:hover {
    div {
      visibility: visible;
    }
  }
`;

const GelleryPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const PhotoOverlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  position: absolute;
  top: 0;
  opacity: 1;
  visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    color: white;
    font-size: 1.1rem;
    margin-left: 0.5vw;
  }
  svg {
    font-size: 1rem;
  }
`;
const Icon = styled.div`
  &:nth-child(2) {
    margin-left: 1vw;
  }
`;

const FOLLOW_USER = gql`
  mutation followUser($toFollow: String) {
    followUser(toFollow: $toFollow) {
      ok
      error
    }
  }
`;

const UNFOLLOW = gql`
  mutation unfollow($toUnfollow: String) {
    unfollow(toUnfollow: $toUnfollow) {
      ok
      error
    }
  }
`;

const Profile = () => {
  const { username } = useParams();
  const { data: meData } = useUser();
  const { data } = useQuery(SEE_PROFILE, { variables: { username } });
  const getButton = (seeProfile) => {
    const { isMe, isFollowing } = seeProfile;
    if (isMe) return <Button>Edit Profile</Button>;
    if (isFollowing) return <Button onClick={unFollow}>Unfollow</Button>;
    else return <Button onClick={follow}>Follow</Button>;
  };
  const [follow] = useMutation(FOLLOW_USER, {
    variables: { toFollow: username },
    update: (cache, result) => {
      const {
        data: {
          followUser: { ok },
        },
      } = result;
      if (!ok) return;
      cache.modify({
        id: `User:${username}`,
        fields: {
          isFollowing: (prev) => !prev,
          totalFollowers: (prev) => ++prev,
        },
      });
      cache.modify({
        id: `User:${meData?.me?.username}`,
        fields: {
          totalFollowing: (prev) => ++prev,
        },
      });
    },
  });
  const [unFollow] = useMutation(UNFOLLOW, {
    variables: { toUnfollow: username },
    update: (cache, result) => {
      const {
        data: {
          unfollow: { ok },
        },
      } = result;
      if (!ok) return;
      cache.modify({
        id: `User:${username}`,
        fields: {
          isFollowing: (prev) => !prev,
          totalFollowers: (prev) => --prev,
        },
      });
      cache.modify({
        id: `User:${meData?.me?.username}`,
        fields: {
          totalFollowing: (prev) => --prev,
        },
      });
    },
  });

  return (
    <SProfile>
      <PageTitle title={username} />
      <ProfileInfoWrapper>
        <AvatarWrapper>
          <AvatarBig src={data?.seeProfile.avatar} />
        </AvatarWrapper>
        <ProfileInfo>
          <Row>
            <Username>{data?.seeProfile?.username}</Username>
            {data?.seeProfile && getButton(data?.seeProfile)}
          </Row>
          <CountInfo>
            <CountColumn>
              <span>게시물 </span>
              <FatText>{data?.seeProfile?.photos?.length}</FatText>
            </CountColumn>
            <CountColumn>
              <span>팔로워 </span>
              <FatText>{data?.seeProfile?.totalFollowers}</FatText>
            </CountColumn>
            <CountColumn>
              <span>팔로잉 </span>
              <FatText>{data?.seeProfile?.totalFollowing}</FatText>
            </CountColumn>
          </CountInfo>
          <FullName>
            <FatText>
              {data?.seeProfile?.firstName} {data?.seeProfile?.lastName}
            </FatText>
            <p>{data?.seeProfile?.bio}</p>
          </FullName>
        </ProfileInfo>
      </ProfileInfoWrapper>
      <Gellery>
        {data?.seeProfile.photos.map((photo) => (
          <GelleryPhotoWrapper key={photo.id}>
            <GelleryPhoto src={photo.file} />
            <PhotoOverlay>
              <Icon>
                <FontAwesomeIcon icon={faCommentAlt} color="white" />
                <span>{photo.commentsCount}</span>
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faHeart} color="white" />
                <span>{photo.likeCount}</span>
              </Icon>
            </PhotoOverlay>
          </GelleryPhotoWrapper>
        ))}
      </Gellery>
    </SProfile>
  );
};

export default Profile;
