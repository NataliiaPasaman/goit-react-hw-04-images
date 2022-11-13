import React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from "components/Modal/Modal.module.css";

export const Modal = ({ tag, largeImageURL, onCloseModal }) => {

  useEffect(() => {

    const onEscapeClose = evt => {
      if (evt.code === 'Escape') onCloseModal();
    };
    window.addEventListener("keydown", onEscapeClose);
    
    return () => {
      window.removeEventListener("keydown", onEscapeClose);
    }
  }, [onCloseModal])

  const onBackdropClose = (evt) => {
    if(evt.target === evt.currentTarget) {
      onCloseModal();
    }
  }
    return (
      <div className={css.overlay} onClick={onBackdropClose}>
        <div className={css.modal}>
          <img src={largeImageURL} alt={tag} />
        </div>
      </div>
    );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};