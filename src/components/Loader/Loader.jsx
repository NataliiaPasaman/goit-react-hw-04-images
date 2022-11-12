import { RotatingLines } from  'react-loader-spinner';
import css from "components/Loader/Loader.module.css";

export const Loader = () => {
  return (
    <div className={css.Box_Loader}>
      <RotatingLines
        strokeColor="blue"
        strokeWidth="5"
        animationDuration="0.9"
        width="150"
        visible={true}
      />
    </div>
  );
};