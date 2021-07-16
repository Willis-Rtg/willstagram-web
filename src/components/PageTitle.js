import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

const PageTitle = ({ title }) => (
  <Helmet>
    <title>{title}</title>
  </Helmet>
);

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageTitle;
