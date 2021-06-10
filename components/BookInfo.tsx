import { Grid } from "@material-ui/core";
import Image from "next/image";
import { useState } from "react";
import { Books, Likes } from "../type/type";
import LikeButton from "./LikeButton";
import axios from "axios";

type Props = {
  book: Books | Likes;
  handleSetBook: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    book: Books | Likes
  ) => void;
  auth?: string;
};

const BookInfo: React.FC<Props> = (props) => {
  const { book, handleSetBook, auth } = props;
  const [isLike, setIsLike] = useState(false);

  const handleLike = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (isLike) {
      await axios
        .get(`${process.env.NEXT_PUBLIC_RESTAPI_URL}delete_like`, {
          params: {
            bookId: book.bookId,
            userId: auth,
          },
        })
        .then(() => {
          console.log("delete!");
          setIsLike(false);
        });
    } else {
      await axios
        .post(`${process.env.NEXT_PUBLIC_RESTAPI_URL}add_like`, {
          bookId: book.bookId,
          title: book.title,
          author: book.author,
          price: book.price,
          publisher: book.publisher,
          publishedDate: book.publishedDate,
          image: book.image,
          description: book.description,
          userId: auth,
        })
        .then(() => {
          console.log("insert!");
          setIsLike(true);
        });
    }
  };

  return (
    <>
      {book.bookId !== "" && (
        <div
          className="hover:bg-yellow-100 hover:bg-opacity-70 border-t border-solid border-gray-200"
          onClick={(e) => handleSetBook(e, book)}
        >
          <Grid container alignItems="center" justify="center" className="pb-3">
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
          <Grid container alignItems="center" justify="center" className="pb-3">
            <Grid item>
              <LikeButton handleLike={handleLike} isLike={isLike} />
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

export default BookInfo;
