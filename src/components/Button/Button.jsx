import PropTypes from 'prop-types';
import css from 'components/Button/Button.module.css';

export const LoadButton = ({ onClickLoad }) => {
  return (
    <button className={css.Button} type="button" onClick={onClickLoad}>
      Load more
    </button>
  );
};

LoadButton.propTypes = {
  onClickLoad: PropTypes.func.isRequired,
};
