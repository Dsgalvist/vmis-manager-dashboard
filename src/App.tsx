import { useEffect, useState } from 'react'
import './App.css'
import {
  getTickets,
  getTicketById,
} from './services/api'
import type { Ticket } from './types/Ticket'

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [statusFilter, setStatusFilter] = useState('All')

  useEffect(() => {
    async function loadTickets() {
      try {
        const data = await getTickets()
        setTickets(data)
      } catch (err) {
        console.error(err)
        setError('Could not load tickets.')
      } finally {
        setLoading(false)
      }
    }

    loadTickets()
  }, [])

  const pendingCount = tickets.filter(
    (ticket) => ticket.status === 'Pending Review'
  ).length

  const openCount = tickets.filter(
    (ticket) => ticket.status === 'Open'
  ).length

  const inProgressCount = tickets.filter(
    (ticket) => ticket.status === 'In Progress'
  ).length

  const resolvedCount = tickets.filter(
    (ticket) => ticket.status === 'Resolved'
  ).length

  const filteredTickets =
    statusFilter === 'All'
      ? tickets
      : tickets.filter(
          (ticket) => ticket.status === statusFilter
        )

  async function handleSelectTicket(ticketId: string) {
    try {
      setDetailLoading(true)
      setError(null)

      const ticket = await getTicketById(ticketId)

      setSelectedTicket(ticket)
    } catch (err) {
      console.error(err)
      setError('Could not load ticket details.')
    } finally {
      setDetailLoading(false)
    }
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">VM</div>

          <div>
            <h1>VMIS</h1>
            <p>Manager Dashboard</p>
          </div>
        </div>

        <nav className="nav-menu">
          <button className="nav-item active">
            Tickets
          </button>

          <button className="nav-item">
            History
          </button>
        </nav>
      </aside>

      <main className="main-content">
        <header className="page-header">
          <div>
            <p className="eyebrow">
              Voice Maintenance Intake Station
            </p>

            <h2>Maintenance Tickets</h2>
          </div>

          <div className="header-badge">
            Manager View
          </div>
        </header>

        <section className="stats-grid">
          <article className="stat-card">
            <span>Pending Review</span>
            <strong>{pendingCount}</strong>
          </article>

          <article className="stat-card">
            <span>Open</span>
            <strong>{openCount}</strong>
          </article>

          <article className="stat-card">
            <span>In Progress</span>
            <strong>{inProgressCount}</strong>
          </article>

          <article className="stat-card">
            <span>Resolved</span>
            <strong>{resolvedCount}</strong>
          </article>
        </section>

        <section className="tickets-panel">
          <div className="panel-header">
            <div>
              <h3>All Tickets</h3>
              <p>
                Review and manage maintenance requests.
              </p>
            </div>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              <option value="All">All</option>
              <option value="Pending Review">
                Pending Review
              </option>
              <option value="Open">Open</option>
              <option value="In Progress">
                In Progress
              </option>
              <option value="Resolved">
                Resolved
              </option>
            </select>
          </div>

          {loading && (
            <div className="empty-state">
              <h4>Loading tickets...</h4>
            </div>
          )}

          {error && !detailLoading && (
            <div className="empty-state">
              <h4>{error}</h4>
            </div>
          )}

          {!loading && !error && tickets.length === 0 && (
            <div className="empty-state">
              <h4>No tickets available</h4>
            </div>
          )}

          {!loading &&
            !error &&
            tickets.length > 0 &&
            filteredTickets.length === 0 && (
              <div className="empty-state">
                <h4>
                  No tickets found for this status
                </h4>
              </div>
            )}

          {!loading &&
            !error &&
            filteredTickets.length > 0 && (
              <div className="ticket-table">
                <div className="ticket-row ticket-header">
                  <span>Ticket</span>
                  <span>Location</span>
                  <span>Equipment</span>
                  <span>Status</span>
                  <span>Created</span>
                </div>

                {filteredTickets.map((ticket) => (
                  <div
                    className="ticket-row clickable"
                    key={ticket.ticket_id}
                    onClick={() =>
                      handleSelectTicket(ticket.ticket_id)
                    }
                  >
                    <span>
                      {ticket.ticket_id.slice(0, 8)}
                    </span>

                    <span>
                      {ticket.location ??
                        `Unit ${
                          ticket.unit_code ?? 'N/A'
                        }`}
                    </span>

                    <span>
                      {ticket.equipment ??
                        'Not classified'}
                    </span>

                    <span>
                      {ticket.status}
                    </span>

                    <span>
                      {new Date(
                        ticket.created_at
                      ).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
        </section>

        {detailLoading && (
          <section className="ticket-detail">
            <div className="empty-state">
              <h4>Loading ticket details...</h4>
            </div>
          </section>
        )}

        {selectedTicket && !detailLoading && (
          <section className="ticket-detail">
            <div className="detail-header">
              <div>
                <p className="eyebrow">
                  Ticket Detail
                </p>

                <h3>
                  {selectedTicket.ticket_id.slice(0, 8)}
                </h3>
              </div>

              <button
                className="close-button"
                onClick={() =>
                  setSelectedTicket(null)
                }
              >
                Close
              </button>
            </div>

            <div className="detail-grid">
              <div className="detail-card">
                <span>Location</span>

                <strong>
                  {selectedTicket.location ??
                    `Unit ${
                      selectedTicket.unit_code ??
                      'N/A'
                    }`}
                </strong>
              </div>

              <div className="detail-card">
                <span>Equipment</span>

                <strong>
                  {selectedTicket.equipment ??
                    'Not classified'}
                </strong>
              </div>

              <div className="detail-card">
                <span>Status</span>

                <strong>
                  {selectedTicket.status}
                </strong>
              </div>

              <div className="detail-card">
                <span>Assigned To</span>

                <strong>
                  {selectedTicket.assigned_to ??
                    'Not assigned'}
                </strong>
              </div>

              <div className="detail-card">
                <span>Confidence</span>

                <strong>
                  {selectedTicket.confidence !== null
                    ? `${Math.round(
                        selectedTicket.confidence *
                          100
                      )}%`
                    : 'Not available'}
                </strong>
              </div>

              <div className="detail-card">
                <span>Human Review</span>

                <strong>
                  {selectedTicket.requires_human_review ===
                  null
                    ? 'Not evaluated'
                    : selectedTicket.requires_human_review
                      ? 'Required'
                      : 'Not required'}
                </strong>
              </div>
            </div>

            <div className="transcript-card">
              <h4>Transcript</h4>

              <p>
                {selectedTicket.transcript ||
                  'No transcript available.'}
              </p>
            </div>

            <div className="transcript-card">
              <h4>Issue Summary</h4>

              <p>
                {selectedTicket.issue_summary ??
                  'No issue summary available.'}
              </p>
            </div>

            <div className="audio-card">
              <h4>Audio Recording</h4>

              <audio
                controls
                src={selectedTicket.audio_url}
              >
                Your browser does not support audio playback.
              </audio>
            </div>

            <div className="manager-actions">
              <button className="approve-button">
                Approve
              </button>

              <button className="edit-button">
                Edit
              </button>

              <button className="reject-button">
                Reject
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default App