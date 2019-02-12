import PropTypes from 'prop-types';

const propTypes = {
    test: PropTypes.any.isRequired
};

const If = (props) => {
    if(props.test){
        return (props.children);
    }
    return null;
}

If.propTypes = propTypes;

export default If;