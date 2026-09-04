import { useState } from "react";

type Memory = {
  id: number;
  type: "photo" | "note" | "song";
  title: string;
  text: string;
  position: string;
};

const memories: Memory[] = [
  {
    id: 1,
    type: "photo",
    title: "last summer",
    text: "some memories deserve to stay warm.",
    position: "memory-one",
  },
  {
    id: 2,
    type: "note",
    title: "a little note",
    text: "don't forget tonight.",
    position: "memory-two",
  },
  {
    id: 3,
    type: "song",
    title: "our song",
    text: "press play and stay awhile.",
    position: "memory-three",
  },
  {
    id: 4,
    type: "photo",
    title: "11:47 PM",
    text: "we should probably do this again.",
    position: "memory-four",
  },
];

function App() {
  const [lit, setLit] = useState(false);
  const [selected, setSelected] = useState<Memory | null>(null);

  const [showIdentity, setShowIdentity] = useState(true);

  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");

  const [profileCreated, setProfileCreated] = useState(false);

  function createProfile() {
    if (!displayName.trim() || !username.trim()) {
      return;
    }

    setProfileCreated(true);
    setShowIdentity(false);
  }

  return (
    <main className={`bonfire-page ${lit ? "lit" : ""}`}>
      <div className="grain" />
      <div className="background-glow" />

      {/* HEADER */}

      <header className="top-bar">
        <div className="wordmark">bonfire</div>

        <button
          className="profile-button"
          aria-label="Profile"
          onClick={() => setShowIdentity(true)}
        >
          ✦
        </button>
      </header>

      {/* MAIN WORLD */}

      <section className="bonfire-world">
        <div className="intro-copy">
          <span className="eyebrow">your little corner</span>

          <h1>
            {profileCreated && displayName
              ? `Welcome, ${displayName}.`
              : "Stay close."}

            <br />

            {profileCreated
              ? "Your fire is yours."
              : "Stay private."}
          </h1>
        </div>

        {/* FIRE */}

        <div className="fire-scene">
          <button
            className="fire"
            onClick={() => setLit(!lit)}
            aria-label="Light the Bonfire"
          >
            <span className="fire-halo" />
            <span className="flame flame-back" />
            <span className="flame flame-main" />
            <span className="flame flame-front" />
            <span className="fire-core" />
          </button>

          <span className="fire-label">
            {lit ? "the fire is warm" : "touch the fire"}
          </span>
        </div>

        {/* MEMORIES */}

        <div className="memories">
          {memories.map((memory) => (
            <button
              key={memory.id}
              className={`memory-card ${memory.position} ${memory.type}`}
              onClick={() => setSelected(memory)}
            >
              <span className="memory-mark">
                {memory.type === "photo" && "▧"}
                {memory.type === "note" && "✉"}
                {memory.type === "song" && "♪"}
              </span>

              <span className="memory-title">{memory.title}</span>

              <span className="memory-text">{memory.text}</span>
            </button>
          ))}
        </div>
      </section>

      {/* FOOTER */}

      <footer className="bottom-bar">
        <span>
          only the people you choose
        </span>

        <span className="status-dot" />
      </footer>

      {/* MEMORY POPUP */}

      {selected && (
        <div
          className="memory-overlay"
          onClick={() => setSelected(null)}
        >
          <div
            className={`memory-detail ${selected.type}`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="close-button"
              onClick={() => setSelected(null)}
            >
              ×
            </button>

            <span className="detail-mark">
              {selected.type === "photo" && "▧"}
              {selected.type === "note" && "✉"}
              {selected.type === "song" && "♪"}
            </span>

            <h2>{selected.title}</h2>

            <p>{selected.text}</p>

            <span className="detail-caption">
              left by someone around your fire
            </span>
          </div>
        </div>
      )}

      {/* IDENTITY */}

      {showIdentity && (
        <div className="identity-overlay">
          <div className="identity-card">
            <span className="identity-mark">🔥</span>

            <span className="identity-eyebrow">
              welcome to bonfire
            </span>

            <h2>Who are you?</h2>

            <p>
              Give your Bonfire a name.
              <br />
              You can change it later.
            </p>

            <label htmlFor="display-name">
              display name
            </label>

            <input
              id="display-name"
              type="text"
              placeholder="Gautham"
              value={displayName}
              onChange={(event) =>
                setDisplayName(event.target.value)
              }
              autoFocus
            />

            <label htmlFor="username">
              username
            </label>

            <div className="username-input">
              <span>@</span>

              <input
                id="username"
                type="text"
                placeholder="gautham"
                value={username}
                onChange={(event) =>
                  setUsername(event.target.value)
                }
              />
            </div>

            <button
              className="continue-button"
              onClick={createProfile}
            >
              Continue
            </button>

            <small>
              Your username helps people find you.
            </small>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;