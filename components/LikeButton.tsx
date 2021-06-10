import { IconButton } from "@material-ui/core";
import { FavoriteBorder } from "@material-ui/icons";

type Props = {
  handleLike: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  isLike: boolean;
};

const LikeButton: React.FC<Props> = (props) => {
  const { handleLike, isLike } = props;
  return (
    // <IconButton aria-label="like" onClick={(e) => handleLike(e)}>
    //   <FavoriteBorder className={isLike ? "text-red-500" : ""}  />
    // </IconButton>
    <div onClick={(e) => handleLike(e)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={
          isLike
            ? "h-6 w-6 text-red-500 cursor-pointer"
            : "h-6 w-6 cursor-pointer"
        }
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </div>
  );
};

export default LikeButton;
