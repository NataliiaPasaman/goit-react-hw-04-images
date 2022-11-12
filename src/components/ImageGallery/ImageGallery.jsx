import PropTypes from "prop-types";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import css from "components/ImageGallery/ImageGallery.module.css";

export const ImageGallery = ({ images, toogleModal }) => {
  return (
    <ul className={css.ImageGallery}>
      <ImageGalleryItem images={images} toogleModal={toogleModal} />
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array,
  toogleModal: PropTypes.func,
}