import { useState } from "react";

function App() {
  const [entering, setEntering] = useState(false);

  return (
    <main className={`bonfire ${entering ? "entering" : ""}`}>
      <div className="fire">
        <div className="flame flame-one" />
        <div className="flame flame-two" />
        <div className="flame flame-three" />
        <div className="ember-glow" />
      </div>

      <section className="intro">
        <h1>bonfire</h1>
        <p>Your fire is waiting.</p>

        <button onClick={() => setEntering(true)}>
          Enter the fire
        </button>
      </section>

      <section className={`login ${entering ? "show-login" : ""}`}>
        <div className="login-content">
          <span className="small-flame">🔥</span>

          <h2>Find your people.</h2>

          <p>
            Bonfire is a place for the people
            <br />
            you actually want around.
          </p>

          <button className="login-button">
            Continue with Google
          </button>

          <button className="login-button secondary">
            Continue with email
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;