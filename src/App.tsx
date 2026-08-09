import './App.css'

function App() {
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
            <strong>0</strong>
          </article>

          <article className="stat-card">
            <span>Open</span>
            <strong>0</strong>
          </article>

          <article className="stat-card">
            <span>In Progress</span>
            <strong>0</strong>
          </article>

          <article className="stat-card">
            <span>Resolved</span>
            <strong>0</strong>
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

          <div className="empty-state">
            <div className="empty-icon">🎙️</div>
            <h4>No tickets loaded yet</h4>
            <p>
              The dashboard will display maintenance tickets from the VMIS API.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App