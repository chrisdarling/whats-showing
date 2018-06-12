import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Icon } from 'antd';
import { Portal } from 'shared';
import './style.css';

const bodyElement = document.body;

export default class Modal extends Component {
    constructor() {
        super();
        this.ModalEl = null;
    }

    static propTypes = {
        onToggle: PropTypes.func,
        open: PropTypes.bool,
    }

    static defaultProps = {
        open: false,
    }

    componentWillUnmount() {
        bodyElement.className = '';
        this.ModalEl.removeEventListener('touchmove', this.disableScroll);
    }

    componentDidUpdate(prevProps) {
        const{ open: prevOpen } = prevProps;
        const { open } = this.props;

        if (open !== prevOpen) {
            if (open) {
                bodyElement.className = 'hiddenClass';
                this.ModalEl.addEventListener('touchmove', this.disableScroll);
            } else {
                bodyElement.className = '';
                this.ModalEl.removeEventListener('touchmove', this.disableScroll);
            }
        }
    }
    
    disableScroll = e => e.preventDefault();

    render() {
        const { onToggle, children, open } = this.props;
        const cn = classnames('whats-showing-modal', { 'open': open });
        return (
            <Fragment>
                    <Portal>
                        <div className={cn} ref={node => this.ModalEl = node}>
                            <div className="whats-showing-modal-content">
                                {children}
                                <Icon type="close" className="close-icon" onClick={onToggle}/>
                            </div> 
                            <div className="whats-showing-modal-background" ></div>
                        </div>
                    </Portal>
            </Fragment>
        )
    }
}