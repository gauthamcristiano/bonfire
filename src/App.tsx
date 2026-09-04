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

  return (
    <main className={`bonfire-page ${lit ? "lit" : ""}`}>
      <div className="grain" />
      <div className="background-glow" />

      <header className="top-bar">
        <div className="wordmark">bonfire</div>

        <button className="profile-button" aria-label="Profile">
          ✦
        </button>
      </header>

      <section className="bonfire-world">
        <div className="intro-copy">
          <span className="eyebrow">your little corner</span>
          <h1>
            Stay close.
            <br />
            Stay private.
          </h1>
        </div>

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

      <footer className="bottom-bar">
        <span>only the people you choose</span>
        <span className="status-dot" />
      </footer>

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
    </main>
  );
}

export default App;