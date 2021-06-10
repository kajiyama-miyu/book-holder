import { Books } from "../type/type";
import { Grid } from "@material-ui/core";
import Image from "next/image";

type Props = {
  book: Books;
  handleSetBookId: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    bookId: string
  ) => void;
};

const ReviewBook: React.FC<Props> = (props) => {
  const { book, handleSetBookId } = props;

  return (
    <>
      {book.bookId !== "" && (
        <div
          className="hover:bg-yellow-100 hover:bg-opacity-70 border-t border-b border-solid border-gray-200 w-full flex"
          onClick={(e) => handleSetBookId(e, book.bookId)}
        >
          <Grid container alignItems="center" justify="center">
            <Grid item>
              {book.image && (
                <Image
                  priority
                  src={book.image}
                  height={200}
                  width={150}
                  alt="book"
                />
              )}
            </Grid>
          </Grid>
          <ul className="text-center list-none pt-2 ">
            <li className="text-xl font-bold">{book.title}</li>
            <li className="pt-2 pb-1">{book.price}円</li>
            <li>{book.author}　著</li>
            <li>{book.publisher}　/刊</li>
            <li className="pb-2">{book.publishedDate}　/発売</li>
            <li className="py-1">{book.description}</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default ReviewBook;
