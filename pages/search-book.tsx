import Layout from "../components/Layout";
import SearchBox from "../components/SearchBox";
import { useContext, useState, useEffect } from "react";
import { Books } from "../type/type";
import { Divider, GridList } from "@material-ui/core";
import BookInfo from "../components/BookInfo";
import { BookContext, BookProvider } from "../context/bookContext";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

const SearchBook: React.FC = () => {
  const [books, setBooks] = useState<Books[]>([
    {
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
  ]);
  const router = useRouter();

  const [auth, setAuth] = useState("");

  useEffect(() => {
    setAuth(localStorage.getItem("token"));
  }, []);

  const handleSetBook = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    book: Books
  ) => {
    e.stopPropagation();

    await axios
      .post(`${process.env.NEXT_PUBLIC_RESTAPI_URL}post-book`, {
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
        router.push(`/review/${book.bookId}`);
      });
  };

  return (
    <BookProvider>
      <Layout title="search">
        <div className="h-10" />
        <SearchBox setBooks={setBooks} />

        <div className="h-12" />

        <GridList cols={1} spacing={0} cellHeight="auto" className=" w-3/5">
          {books &&
            books.map((book) => (
              <li key={book.bookId}>
                <BookInfo
                  book={book}
                  handleSetBook={handleSetBook}
                  auth={auth}
                />
              </li>
            ))}
        </GridList>
      </Layout>
    </BookProvider>
  );
};

export default SearchBook;
