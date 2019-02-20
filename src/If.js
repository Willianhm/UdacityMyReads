import PropTypes from 'prop-types';

const propTypes = {
    test: PropTypes.any.isRequired
};

const If = ({ test, children }) => test ? children : null;

If.propTypes = propTypes;

export default If;