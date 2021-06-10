import { BookContext, BookProvider } from "../context/bookContext";
import { useCallback, useContext, useEffect, useState } from "react";
import BookInfo from "../components/BookInfo";
import { Button, Grid, TextField } from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import dayjs from "dayjs";
import TextInput from "../components/TextInput";
import axios from "axios";
import { useRouter } from "next/router";
import { Books } from "../type/type";
import Layout from "../components/Layout";
import SelectBook from "../components/SelectBook";

const styles: { [key: string]: React.CSSProperties } = {
  saveButton: {
    backgroundColor: "#FFD700",
  },
};

const BookForm: React.FC = () => {
  const router = useRouter();
  const { book } = useContext(BookContext);
  const [date, setDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [review, setReviews] = useState("");
  const [bookInfo, setBookInfo] = useState<Books>(book);
  const [auth, setAuth] = useState("");

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

  useEffect(() => {
    setBookInfo(book);
    setAuth(localStorage.getItem("token"));
  }, [book]);

  const handleSetReview = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setReviews(e.target.value);
    },
    [setReviews]
  );

  const handleSave = async () => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_RESTAPI_URL}post-reviewInfo`, {
        book: {
          bookId: book.bookId,
          title: book.title,
          author: book.author,
          price: book.price,
          publisher: book.publisher,
          publishedDate: book.publishedDate,
          image: book.image,
          description: book.description,
          userId: auth,
        },
        review: {
          review: review,
          readDate: date,
          bookId: book.bookId,
          userId: auth,
        },
      })
      .then(() => {
        router.push("/home");
      });
  };

  return (
    <BookProvider>
      <Layout title={"Review Form"}>
        <SelectBook book={book} />
        <Grid
          container
          justify="center"
          alignItems="center"
          className="py-1"
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
          className="py-1 pt-5 pb-5"
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
        <Grid container justify="center" alignItems="center">
          <Grid>
            <Button
              size="medium"
              variant="outlined"
              onClick={() => handleSave()}
              style={styles.saveButton}
            >
              登録
            </Button>
          </Grid>
        </Grid>
      </Layout>
    </BookProvider>
  );
};

export default BookForm;
