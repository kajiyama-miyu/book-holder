import axios from "axios";
import { Books, ReviewInfo } from "../type/type";

export const getAllBooks = async () => {
  const res = await axios.get<Array<Books>>(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}all-books`
  );
  return res.data;
};

export const getBookData = async (bookId: string | string[]) => {
  const res = await axios.get<Array<Books>>(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}find-book/${bookId}`
  );

  const book = {
    book: res.data,
  };

  return book;
};

export const getReviewInfo = async (bookId: string | string[]) => {
  const res = await axios.get<ReviewInfo>(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}all-review/${bookId}`
  );
  const review = {
    review: res.data,
  };

  return review;
};

export const getAllBookId = async () => {
  const res = await axios.get<Array<Books>>(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}all-books`
  );

  const books = res.data;

  return books.map((book) => {
    return {
      params: {
        id: book.bookId,
      },
    };
  });
};
