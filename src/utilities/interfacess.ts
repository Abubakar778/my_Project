export interface Event {
  _id: string;
  title: string;
  price: number;
  date: string;
  description: string;
  creator: {
    name: string;
    email: string;
  };
}
