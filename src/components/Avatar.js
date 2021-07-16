import styled from "styled-components";

const SAvatar = styled.div`
  width: ${(props) => (props.lg ? "32px" : "25px")};
  height: ${(props) => (props.lg ? "32px" : "25px")};
  background-color: #ccc;
  border-radius: 50%;
  overflow: hidden;
  img {
    max-width: 100%;
  }
`;

const Avatar = ({ url, lg = false }) => (
  <SAvatar lg={lg}>{url ? <img src={url} /> : null}</SAvatar>
);

export default Avatar;
