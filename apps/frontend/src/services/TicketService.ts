import Ticket, { TicketSortKey } from "../types/ticket";
import HttpClientService from "./httpClientService";

export default class TicketService {
  static async fetchTickets(searchKey?: string): Promise<{ data: Ticket[] }> {
    const httpClient = new HttpClientService(
      process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:8080"
    );
    try {
      return await httpClient.get<Ticket[]>(
        `api/tickets${searchKey ? `?title=${searchKey}` : ""}`
      );
    } catch (err) {
      throw new Error("Failed to fetch tickets.");
    }
  }

  static sortByKey(tickets: Ticket[], key: TicketSortKey): Ticket[] {
    const sortedTickets = [...tickets];
    if (key === "title") {
      sortedTickets.sort((a, b) => a.title.localeCompare(b.title));
    } else if (key === "price") {
      sortedTickets.sort((a, b) => a.price - b.price);
    }
    return sortedTickets;
  }
}
