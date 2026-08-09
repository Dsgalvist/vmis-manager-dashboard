import { useEffect, useState } from 'react'
import './App.css'
import { getTickets } from './services/api'
import type { Ticket } from './types/Ticket'

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
          <button className="nav-item active">Tickets</button>
          <button className="nav-item">History</button>
        </nav>
      </aside>

      <main className="main-content">
        <header className="page-header">
          <div>
            <p className="eyebrow">Voice Maintenance Intake Station</p>
            <h2>Maintenance Tickets</h2>
          </div>

          <div className="header-badge">Manager View</div>
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
              <p>Review and manage maintenance requests.</p>
            </div>

            <select defaultValue="All">
              <option>All</option>
              <option>Pending Review</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </div>

          {loading && (
            <div className="empty-state">
              <h4>Loading tickets...</h4>
            </div>
          )}

          {error && (
            <div className="empty-state">
              <h4>{error}</h4>
            </div>
          )}

          {!loading && !error && tickets.length === 0 && (
            <div className="empty-state">
              <h4>No tickets available</h4>
            </div>
          )}

          {!loading && !error && tickets.length > 0 && (
            <div className="ticket-table">
              <div className="ticket-row ticket-header">
                <span>Ticket</span>
                <span>Location</span>
                <span>Equipment</span>
                <span>Status</span>
                <span>Created</span>
              </div>

              {tickets.map((ticket) => (
                <div className="ticket-row" key={ticket.ticket_id}>
                  <span>{ticket.ticket_id.slice(0, 8)}</span>

                  <span>
                    {ticket.location ?? `Unit ${ticket.unit_code ?? 'N/A'}`}
                  </span>

                  <span>{ticket.equipment ?? 'Not classified'}</span>

                  <span>{ticket.status}</span>

                  <span>
                    {new Date(ticket.created_at).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App