type IProduct = {
  _id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  isShow: boolean;
  bids: IBid[];
  startAt: Date;
  endAt: Date;
  bidPriceMax: number;
};

type ProductForm = Pick<
  IProduct,
  'title' | 'price' | 'description' | 'image' | 'isShow'
>;

type IUser = {
  email: string;
  role?: string;
  password: string;
};

type LoginRegisterForm = Pick<IUser, 'email' | 'password'>;

type UserLoginRes = {
  token: string;
};

type BidForm = {
  product: string;
  bids: string[];
  user: string;
  price: number;
  bidPriceMax: number;
};

type IBid = BidForm & {
  _id: string;
  user: User;
  createdAt: Date;
  isWinBid: Boolean;
};
