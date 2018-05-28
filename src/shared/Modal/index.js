import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Portal } from 'shared';
import './style.css';

const bodyElement = document.body;

export default class Modal extends Component {
    static propTypes = {
        onToggle: PropTypes.func,
        open: PropTypes.bool,
    }

    static defaultProps = {
        open: false,
    }

    componentWillUnmount() {
        bodyElement.className = '';
    }

    componentDidUpdate(prevProps) {
        const{ open: prevOpen } = prevProps;
        const { open } = this.props;

        if (open !== prevOpen) {
            if (open) {
                bodyElement.className = 'hiddenClass';
            } else {
                bodyElement.className = '';
            }
        }
    }

    render() {
        const { onToggle, children, open } = this.props;
        return (
            <Fragment>
                {open &&
                    <Portal>
                        <div className="whats-showing-modal" >
                            <div className="whats-showing-modal-content">
                                {children}
                            </div>
                            <div className="whats-showing-modal-background" onClick={onToggle}></div>
                        </div>
                    </Portal>
                }
            </Fragment>
        )
    }
}