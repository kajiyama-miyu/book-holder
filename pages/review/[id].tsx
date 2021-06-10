import { GetStaticPaths, GetStaticProps } from "next";
import { getAllBookId, getBookData } from "../../lib/books";
import { Books } from "../../type/type";
import axios from "axios";
import useSWR from "swr";
import Layout from "../../components/Layout";
import { Grid, TextField, Button } from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import SelectBook from "../../components/SelectBook";
import DateFnsUtils from "@date-io/date-fns";
import { useState, useCallback, useEffect } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/router";

type Props = {
  book: Array<Books>;
};

export default function ReviewForm({ book }: Props) {
  console.log("book", book);

  const router = useRouter();
  const [date, setDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [review, setReviews] = useState("");
  const [auth, setAuth] = useState("");
  const [bookInfo, setBookInfo] = useState<Books>({
    bookId: "",
    title: "",
    author: "",
    price: "",
    publisher: "",
    publishedDate: null,
    image: "",
    description: "",
    userId: "",
  });

  const handleSetReview = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setReviews(e.target.value);
    },
    [setReviews]
  );

  useEffect(() => {
    setAuth(localStorage.getItem("token"));

    if (book !== null) {
      const newBook = book.filter(
        (b) => b.userId === localStorage.getItem("token")
      );
      setBookInfo(newBook[0]);
    }
  }, [book]);

  const handleSetDate = useCallback(
    (value: Date) => {
      let newDate = null;
      if (value != null) {
        newDate = dayjs(value);
      }

      setDate(newDate);
    },
    [setDate]
  );

  const handleSave = async () => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_RESTAPI_URL}post-review`, {
        review: review,
        readDate: date,
        bookId: bookInfo.bookId,
        userId: auth,
      })
      .then(() => {
        router.push("/home");
      });
  };

  return (
    <Layout title={"Review Form"}>
      <SelectBook book={bookInfo} />
      <div className="h-7" />
      <Grid
        container
        justify="center"
        alignItems="center"
        className="py-1 pt-5"
        spacing={5}
      >
        <Grid item>読了日</Grid>
        <Grid item>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              value={date}
              onChange={(d) => handleSetDate(d)}
              variant="inline"
              format="yyyy年M月d日"
              animateYearScrolling
              disableToolbar
              fullWidth
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
      <Grid
        container
        justify="center"
        alignItems="center"
        spacing={5}
        className="py-1 pt-7 pb-10"
      >
        <Grid item>レビュー</Grid>
        <Grid item>
          <TextField
            required
            variant="outlined"
            label={"レビュー"}
            fullWidth
            multiline
            rows={5}
            value={review}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleSetReview(e)
            }
            autoComplete={"off"}
            type={"text"}
            name={"review"}
          />
        </Grid>
      </Grid>
      <button
        onClick={() => handleSave()}
        className="group relative w-40 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-200"
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
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
            />
          </svg>
        </span>
        登録
      </button>
      <div className="h-7" />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllBookId();

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params.id;

  const { book } = await getBookData(id);

  return {
    props: {
      book,
    },
    revalidate: 3,
  };
};
