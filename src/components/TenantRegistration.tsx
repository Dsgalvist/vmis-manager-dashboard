import { useState, type FormEvent } from "react";
import "./TenantRegistration.css";

export default function TenantRegistration() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // The backend endpoint will be added here when it is ready.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="registration-page">
        <div className="registration-card registration-success">
          <div className="registration-check">✓</div>
          <h2>Registration submitted</h2>
          <p>Your information is pending manager approval.</p>

          <button
            className="registration-button"
            onClick={() => setSubmitted(false)}
          >
            Submit another registration
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="registration-page">
      <header className="registration-header">
        <p>VOICE MAINTENANCE INTAKE STATION</p>
        <h2>Tenant Registration</h2>
      </header>

      <div className="registration-card">
        <h3>Register your unit</h3>

        <p className="registration-description">
          Enter your contact information. A manager will review it before it
          becomes active.
        </p>

        <form onSubmit={handleSubmit}>
          <label className="registration-label">
            Unit number
            <input
              className="registration-input"
              name="unit"
              placeholder="Example: 204"
              required
            />
          </label>

          <label className="registration-label">
            Full name
            <input
              className="registration-input"
              name="name"
              placeholder="Your full name"
              required
            />
          </label>

          <label className="registration-label">
            Email address
            <input
              className="registration-input"
              name="email"
              type="email"
              placeholder="name@example.com"
              required
            />
          </label>

          <label className="registration-label">
            Phone number
            <input
              className="registration-input"
              name="phone"
              type="tel"
              placeholder="(000) 000-0000"
              required
            />
          </label>

          <button className="registration-button" type="submit">
            Submit for approval
          </button>
        </form>
      </div>
    </section>
  );
}