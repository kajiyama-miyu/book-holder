export interface Login {
  email: string;
  password: string;
}

export interface Books {
  bookId: string;
  title: string;
  author: string;
  price: string;
  publisher: string;
  publishedDate: string;
  image: string;
  description: string;
  userId?: string;
}

export interface Likes {
  likeId: number;
  title: string;
  author: string;
  price: string;
  publisher: string;
  publishedDate: string;
  description: string;
  image: string;
  bookId: string;
  userId?: string;
}

export interface Reviews {
  reviewId: number;
  review: string;
  readDate: Date | null;
  star?: number;
  bookId: string;
  userId?: string;
}

export interface ReviewInfo {
  books: Array<Books>;
  reviews: Array<Reviews>;
}
