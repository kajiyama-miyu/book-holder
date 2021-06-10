import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import { getAllBooks } from "../lib/books";
import useSWR from "swr";
import { Books } from "../type/type";
import { useEffect, useState } from "react";
import { GridList } from "@material-ui/core";
import ReviewBook from "../components/ReviewBook";
import { useRouter } from "next/router";
import axios from "axios";

const fetcher = (url: string) =>
  axios.get<Array<Books>>(url).then((res) => res.data);
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}/all-books`;

type Props = {
  books: Array<Books>;
};

export default function Home({ books }: Props) {
  const [auth, setAuth] = useState("");
  const { data, mutate } = useSWR(apiUrl, fetcher, {
    initialData: books,
  });

  const router = useRouter();

  useEffect(() => {
    mutate();
    setAuth(localStorage.getItem("token"));
  }, []);

  const handleChandePage = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    bookId: string
  ) => {
    e.stopPropagation();
    router.push(`/detail/${bookId}`);
  };

  let newBook: Array<Books> = [
    {
      bookId: "",
      title: "",
      author: "",
      price: "",
      publisher: "",
      publishedDate: null,
      image: "",
      description: "",
      userId: "",
    },
  ];
  if (data.length !== 0) {
    console.log("null");
    newBook = data.filter((b) => b.userId === auth);
  }

  return (
    <Layout title="home">
      <GridList cols={1} spacing={0} cellHeight="auto" className="w-3/5">
        {newBook !== null &&
          newBook.map((book) => (
            <li key={book.bookId}>
              <ReviewBook book={book} handleSetBookId={handleChandePage} />
            </li>
          ))}
      </GridList>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const books = await getAllBooks();

  return {
    props: {
      books,
    },
    revalidate: 3,
  };
};
