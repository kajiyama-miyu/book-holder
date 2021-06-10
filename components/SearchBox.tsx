import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
} from "@material-ui/core";
import TextInput from "./TextInput";
import { useState, useEffect } from "react";
import axios from "axios";
import { Books } from "../type/type";
import { Book } from "@material-ui/icons";

type Props = {
  setBooks: React.Dispatch<React.SetStateAction<Books[]>>;
};

const SearchBox: React.FC<Props> = (props) => {
  const { setBooks } = props;
  const [title, setTitle] = useState("");
  // const [books, setBooks] = useState<Books[]>([
  //   {
  //     id: "",
  //     title: "",
  //     author: "",
  //     price: "",
  //     publisher: "",
  //     publishedDate: "",
  //     image: "",
  //     description: "",
  //   },
  // ]);

  const searchBooks = async () => {
    await axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${title}`)
      .then((res) => res.data)
      .then((data) => {
        let bookList: Array<Books> = [];
        for (let b of data.items) {
          let authors = b.volumeInfo.authors;
          let price = b.saleInfo.listPrice;
          let img = b.volumeInfo.imageLinks;
          let publisher = b.volumeInfo.publisher;
          let date = b.volumeInfo.publishedDate;

          bookList.push({
            bookId: b.id,
            title: b.volumeInfo.title,
            author: authors ? authors.join(",") : "",
            price: price ? price.amount : "-",
            publisher: publisher ? publisher : "",
            publishedDate: date ? date : "",
            image: img ? img.smallThumbnail : "",
            description: b.volumeInfo.description
              ? b.volumeInfo.description
              : "",
            userId: "",
          });
        }
        setBooks(bookList);
      });
  };

  return (
    <Card className="w-2/5">
      <CardHeader title="タイトルを検索する" className="text-center" />
      <CardContent>
        <TextInput
          fullwidth={true}
          label={"タイトル"}
          multiline={false}
          name={"title"}
          required={true}
          rows={1}
          type={"text"}
          autoComplete={"off"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </CardContent>

      <CardActions>
        <button
          onClick={() => searchBooks()}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-200"
          type="submit"
        >
          <span className="absolute left-0 inset-y-0 flex items-center text-center pl-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-yellow-100 group-hover:text-yellow-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          検索
        </button>
      </CardActions>
    </Card>
  );
};

export default SearchBox;
