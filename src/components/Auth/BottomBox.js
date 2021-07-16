import { Link } from "react-router-dom";
import styled from "styled-components";
import { BaseBox } from "../shared";
import PropTypes from "prop-types";

const SBottomBox = styled(BaseBox)`
  text-align: center;
  padding: 25px 0;
  margin-top: 10px;
  a {
    margin-left: 5px;
    color: ${(props) => props.theme.accent};
    font-weight: 600;
  }
`;

const BottomBox = ({ cta, linkText, link }) => (
  <SBottomBox>
    {cta}
    <Link to={link}>{linkText}</Link>
  </SBottomBox>
);

BottomBox.propTypes = {
  cta: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default BottomBox;
