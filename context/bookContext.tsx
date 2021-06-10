import { createContext, useState } from "react";
import { Books } from "../type/type";

type BookContextType = {
  book: Books;
  setBookInfo: (book: Books) => void;
};

export const BookContext = createContext<BookContextType>({
  book: {
    bookId: "",
    title: "",
    author: "",
    price: "",
    publisher: "",
    publishedDate: "",
    image: "",
    description: "",
    userId: "",
  },
  setBookInfo: () => {},
});

export const BookProvider: React.FC = ({ children }) => {
  const [book, setBook] = useState<Books>({
    bookId: "",
    title: "",
    author: "",
    price: "",
    publisher: "",
    publishedDate: "",
    image: "",
    description: "",
    userId: "",
  });

  const setBookInfo = (book: Books) => {
    console.log("ctxBook", book);
    setBook(book);
  };

  return (
    <BookContext.Provider value={{ book, setBookInfo: setBookInfo }}>
      {children}
    </BookContext.Provider>
  );
};
