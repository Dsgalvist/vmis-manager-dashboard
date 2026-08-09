import type { Ticket } from '../types/Ticket'

const API_BASE_URL = '/api'

export async function getTickets(): Promise<Ticket[]> {
  const response = await fetch(`${API_BASE_URL}/tickets`)

  if (!response.ok) {
    throw new Error(
      `Failed to fetch tickets. Status: ${response.status}`
    )
  }

  const data: Ticket[] = await response.json()

  return data
}