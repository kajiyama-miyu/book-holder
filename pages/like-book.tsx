import { GridList } from "@material-ui/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BookInfo from "../components/BookInfo";
import Layout from "../components/Layout";
import { Likes } from "../type/type";
import axios from "axios";

type Props = {
  likes: Array<Likes>;
};

export default function Favolite({ likes }: Props) {
  const [auth, setAuth] = useState("");

  const router = useRouter();

  useEffect(() => {
    setAuth(localStorage.getItem("token"));
  }, []);

  const handleSetBook = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    book: Likes
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
    <Layout title={"Like Book"}>
      <GridList cols={1} spacing={0} cellHeight="auto" className="w-3/5">
        {likes !== null &&
          likes.map((like) => (
            <li key={like.likeId}>
              <BookInfo book={like} handleSetBook={handleSetBook} />
            </li>
          ))}
      </GridList>
    </Layout>
  );
}
