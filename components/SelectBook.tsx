import { Grid } from "@material-ui/core";
import Image from "next/image";
import { Books, Likes } from "../type/type";

type Props = {
  book: Books | Likes;
};

const SelectBook: React.FC<Props> = (props) => {
  const { book } = props;

  return (
    <>
      {book.bookId !== "" && (
        <div className="pt-10">
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

export default SelectBook;
