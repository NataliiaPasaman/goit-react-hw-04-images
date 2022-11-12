import PropTypes from "prop-types";
import css from "components/ImageGalleryItem/ImageGalleryItem.module.css";

export const ImageGalleryItem = ({ images, toogleModal }) => {

  return images.map(img => {
    const { id, webformatURL, tags, largeImageURL } = img;

    return (
      <li key={id} className={css.ImageGalleryItem}>
        <img
        onClick={() => toogleModal(largeImageURL)}
          className={css.ImageGalleryItem_image}
          src={webformatURL}
          alt={tags}
        />
      </li>
    );
  });
};

ImageGalleryItem.propTypes = {
  images: PropTypes.array.isRequired,
  toogleModal: PropTypes.func.isRequired,
};
