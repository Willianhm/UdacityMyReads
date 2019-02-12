import React from 'react';
import PropTypes from 'prop-types';

import If from './If';

const propTypes = {
    show: PropTypes.bool.isRequired,
    text: PropTypes.string
};

const Loading = ({ show, text }) => (
    <If test={show}>
        <div className="fixed-top d-flex justify-content-center" 
            style={{
                'width': '100%',
                'height': '100%',
                'background': 'rgba(0, 0, 0, 0.15)',
                'alignItems': 'center'
            }}>
            <div className="card shadow p-3 mb-5 bg-white rounded" 
                style={{   
                    width: '200px',
                    height: '130px'
                }}>
                <div className="card-body">
                    <div className="d-flex justify-content-center card-title">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                    <p className="card-text text-center">{ text || 'Loading...' }</p>
                </div>
            </div>

        </div>
    </If>
);

Loading.propTypes = propTypes;

export default Loading;