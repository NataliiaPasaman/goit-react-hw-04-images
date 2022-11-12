import React from 'react';
import { Component } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { pixabayAPI } from '../services/PixabayAPI';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { LoadButton } from './Button/Button';
import { Modal } from 'components/Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    isLoader: false,
    error: null,
    page: 1,
    showModal: false,
    showButton: true,
    largeImage: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery) {
      this.setState({
        isLoader: true,
        images: [],
        error: null,
        page: 1,
        showButton: true,
      });

      try {
        if (page === 1) {
          const imagesResult = await pixabayAPI(searchQuery, page);
          this.setState({
            images: imagesResult.hits,
            showButton: page < Math.ceil(imagesResult.totalHits / 12),
          });

          if (imagesResult.hits.length === 0) {
            const notify = () => toast.error(
                `Sorry, we didn't find anything for your request ${searchQuery}`,
                {
                  position: 'top-center',
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: 'colored',
                });
            this.setState({
              error: notify(),
            });
            return;
          }
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        this.setState({ isLoader: false });
      }
    }

    if (prevState.page !== this.state.page && prevState.searchQuery === searchQuery) {
      this.setState({ isLoader: true, error: null, showButton: true });
      try {
        const imagesResult = await pixabayAPI(searchQuery, page);

        this.setState(prevState => ({
          images: [...prevState.images, ...imagesResult.hits],
          showButton: page < Math.ceil(imagesResult.totalHits / 12),
        }));
      } catch (error) {
        console.log(error.message);
      } finally {
        this.setState({ isLoader: false });
      }
    }
  }

  onSubmit = searchField => {
    if (!searchField) {
      alert('Enter data in the search field');
      return;
    }
    this.setState(({ searchQuery }) => ({ searchQuery: searchField }));
  };

  onClickLoad = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toogleModal = largeImageURL => {
    this.setState(({ showModal, largeImage }) => ({
      showModal: !showModal,
      largeImage: largeImageURL,
    }));
  };

  render() {
    const {
      searchQuery,
      isLoader,
      error,
      images,
      showModal,
      showButton,
      largeImage,
    } = this.state;

    return (
      <div
        style={{
          height: '100vh',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <SearchBar onSubmit={this.onSubmit} />

        {error && <ToastContainer />}

        {searchQuery && (
          <ImageGallery images={images} toogleModal={this.toogleModal} />
        )}
        {isLoader && <Loader />}

        {!isLoader && showButton && images.length !== 0 && (
          <LoadButton onClickLoad={this.onClickLoad} />
        )}
        {showModal && (
          <Modal
            tag={searchQuery}
            largeImageURL={largeImage}
            onCloseModal={this.toogleModal}
          />
        )}
      </div>
    );
  }
}
