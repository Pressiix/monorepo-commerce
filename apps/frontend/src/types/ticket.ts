export type TicketSortKey = "title" | "price";

export default interface Ticket {
  id: number;
  title: string;
  img: string;
  price: number;
}
