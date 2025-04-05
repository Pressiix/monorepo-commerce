import { useState, useEffect } from "react";
import HttpClientService from "../services/httpClientService";
import Ticket from "../types/ticket";
import TicketService from "@/services/TicketService";

export default function useTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await TicketService.fetchTickets();
        setTickets(response.data);
      } catch (err) {
        setError("Failed to fetch tickets.");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return { tickets, loading, error };
}
