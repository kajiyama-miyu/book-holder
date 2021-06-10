import DateFnsUtils from "@date-io/date-fns";
import {
  Dialog,
  DialogContent,
  Grid,
  TextField,
  DialogActions,
} from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ReviewInfo, Reviews } from "../type/type";
import { useState, useCallback, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";

type Props = {
  isOpen: boolean;
  doClose: () => void;
  mutate: any;
  reviewInfo: ReviewInfo;
};

const EditReviewDialog: React.FC<Props> = (props) => {
  const { isOpen, doClose, mutate, reviewInfo } = props;
  const [date, setDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [review, setReviews] = useState("");
  const [auth, setAuth] = useState("");
  const [oneReview, setOneReview] = useState<Reviews>({
    reviewId: 0,
    review: "",
    readDate: null,
    bookId: "",
    userId: "",
  });

  useEffect(() => {
    const reviews = reviewInfo.reviews.filter(
      (r) => r.userId === localStorage.getItem("token")
    );
    setOneReview(reviews[0]);
    setAuth(localStorage.getItem("token"));
    setReviews(reviews[0].review);
    setDate(dayjs(reviews[0].readDate));
  }, []);

  const handleSetReview = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setReviews(e.target.value);
    },
    [setReviews]
  );

  const handleClose = () => {
    setReviews(oneReview.review);
    setDate(dayjs(oneReview.readDate));

    doClose();

    mutate();
  };
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
      .put(`${process.env.NEXT_PUBLIC_RESTAPI_URL}update`, {
        review: review,
        reviewId: oneReview.reviewId,
        readDate: date,
        bookId: oneReview.bookId,
        userId: auth,
      })
      .then(() => {
        setReviews("");
        setDate(dayjs());

        doClose();
        mutate();
      });
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogContent>
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
      </DialogContent>
      <DialogActions>
        <Grid container justify="center" alignItems="center">
          <Grid item>
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
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default EditReviewDialog;
