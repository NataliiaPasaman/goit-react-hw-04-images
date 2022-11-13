import React from 'react';
import { useState, useEffect } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { pixabayAPI } from '../services/PixabayAPI';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { LoadButton } from './Button/Button';
import { Modal } from 'components/Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    setIsLoader(true);
      pixabayAPI(searchQuery, page).then(res => {
        if (searchQuery) {
          setImages(prevImages => [...prevImages, ...res.hits]);
          setShowButton(page < Math.ceil(res.totalHits / 12));
        }
        if (res.hits.length === 0) {
          const notify = () => toast.error(
              `Sorry, we didn't find anything for your request ${searchQuery}`,
              { position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
              });
          setError(notify());
          return;
        }
      })
      .catch (error => console.log(error.message))
      .finally (() => setIsLoader(false))
  }, [page, searchQuery]);
  

  const onSubmit = searchField => {
    if (!searchField) {
      alert('Enter data in the search field');
      return;
    }
    setSearchQuery(searchField);
    setPage(1);
    setImages([]);
    setError(null);
    setIsLoader(false);
  };

  const onClickLoad = () => setPage(prevPage => prevPage + 1);

  const toogleModal = largeImageURL => {
    setShowModal(!showModal);
    setLargeImage(largeImageURL);
  };

  return (
    <div
      style={{
        height: '100vh',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <SearchBar handleSubmit={onSubmit} />
      {error && <ToastContainer />}
      {searchQuery && (
        <ImageGallery images={images} toogleModal={toogleModal} />
      )}
      {isLoader && <Loader />}
      {!isLoader && showButton && images.length !== 0 && (
        <LoadButton onClickLoad={onClickLoad} />
      )}
      {showModal && (
        <Modal
          tag={searchQuery}
          largeImageURL={largeImage}
          onCloseModal={toogleModal}
        />
      )}
    </div>
  );
};
