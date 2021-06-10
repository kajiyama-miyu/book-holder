import { GetStaticPaths, GetStaticProps } from "next";
import { getAllBookId, getReviewInfo } from "../../lib/books";
import axios from "axios";
import { Books, ReviewInfo, Reviews } from "../../type/type";
import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import SelectBook from "../../components/SelectBook";
import { Grid } from "@material-ui/core";
import useSWR from "swr";
import { useRouter } from "next/router";
import EditReviewDialog from "../../components/EditReviewDialog";

const fetcher = (url: string) =>
  axios.get<ReviewInfo>(url).then((res) => res.data);

type Props = {
  id: string;
  review: ReviewInfo;
};

export default function Review({ id, review }: Props) {
  console.log("review", review);
  const router = useRouter();
  const { data, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}all-review/${id}`,
    fetcher,
    {
      initialData: review,
    }
  );
  const [bookInfo, setBookInfo] = useState<Books>({
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
  const [reviewInfo, setReviewInfo] = useState<Reviews>({
    reviewId: 0,
    review: "",
    readDate: null,
    bookId: "",
    userId: "",
  });
  const [isOpen, setOpen] = useState(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleColose = () => {
    setOpen(false);
  };

  if (router.isFallback || !data) {
    return <div>Loading...</div>;
  }

  const handleDelete = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_RESTAPI_URL}delete`, {
      reviewId: reviewInfo.reviewId,
      bookId: reviewInfo.bookId,
      userId: reviewInfo.userId,
    });

    router.push("/home");
  };

  useEffect(() => {
    const books = data.books.filter(
      (b) => b.userId === localStorage.getItem("token")
    );
    const reviews = data.reviews.filter(
      (r) => r.userId === localStorage.getItem("token")
    );
    setBookInfo(books[0]);
    setReviewInfo(reviews[0]);
  }, [reviewInfo]);

  useEffect(() => {
    mutate();
  }, []);

  return (
    <Layout title={"detail"}>
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
        <Grid item>{reviewInfo.readDate}</Grid>
      </Grid>
      <Grid
        container
        justify="center"
        alignItems="center"
        className="py-1 pt-7 pb-14"
        spacing={5}
      >
        <Grid item>レビュー</Grid>
        <Grid item>{reviewInfo.review}</Grid>
      </Grid>
      <Grid container justify="center" alignItems="center" spacing={5}>
        <Grid item>
          <div className="flex cursor-pointer ">
            <svg
              onClick={() => handleOpen()}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
        </Grid>
        <Grid item>
          <div className="flex cursor-pointer ">
            <svg
              onClick={() => handleDelete()}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
        </Grid>
      </Grid>

      <EditReviewDialog
        isOpen={isOpen}
        doClose={handleColose}
        reviewInfo={data}
        mutate={mutate}
      />
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

  const { review } = await getReviewInfo(id);

  return {
    props: {
      id: review.books[0].bookId,
      review,
    },
    revalidate: 3,
  };
};
