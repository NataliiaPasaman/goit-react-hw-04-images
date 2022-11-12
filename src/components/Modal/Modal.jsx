import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import css from "components/Modal/Modal.module.css";

export class Modal extends Component {

  componentDidMount() {
    window.addEventListener("keydown", this.onEscapeClose);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onEscapeClose);
  }

  onEscapeClose = evt => {
    console.log('Code', evt.code);

    if (evt.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  onBackdropClose = (evt) => {
    if(evt.target === evt.currentTarget) {
      this.props.onCloseModal();
    }
  }

  render() {
    const { largeImageURL, tag } = this.props;

    return (
      <div className={css.overlay} onClick={this.onBackdropClose}>
        <div className={css.modal}>
          <img src={largeImageURL} alt={tag} />
        </div>
      </div>
    );
  }
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};