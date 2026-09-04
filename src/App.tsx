import { useState } from "react";

type Memory = {
  id: number;
  type: "photo" | "note" | "song";
  title: string;
  text: string;
  position: string;
};

type PrivacyOption = "everyone" | "chosen" | "nobody";

type Person = {
  id: number;
  name: string;
  username: string;
  status: string;
  position: string;
  symbol: string;
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

const people: Person[] = [
  {
    id: 1,
    name: "Mia",
    username: "mia",
    status: "online",
    position: "person-one",
    symbol: "M",
  },
  {
    id: 2,
    name: "Arjun",
    username: "arjun",
    status: "last seen 4m ago",
    position: "person-two",
    symbol: "A",
  },
  {
    id: 3,
    name: "Nila",
    username: "nila",
    status: "online",
    position: "person-three",
    symbol: "N",
  },
];

function App() {
  const [lit, setLit] = useState(false);

  const [selected, setSelected] =
    useState<Memory | null>(null);

  const [selectedPerson, setSelectedPerson] =
    useState<Person | null>(null);

  const [showIdentity, setShowIdentity] =
    useState(true);

  const [showPrivacy, setShowPrivacy] =
    useState(false);

  const [displayName, setDisplayName] =
    useState("");

  const [username, setUsername] =
    useState("");

  const [privacy, setPrivacy] =
    useState<PrivacyOption>("chosen");

  const [profileCreated, setProfileCreated] =
    useState(false);

  const [activeView, setActiveView] =
    useState<"fire" | "people">("fire");

  /*
   * People who are currently allowed
   * to see this Bonfire.
   *
   * This is intentionally local for now.
   * Later we'll connect this to the backend.
   */
  const [visiblePeople, setVisiblePeople] =
    useState<number[]>([1, 2]);

  function continueToPrivacy() {
    if (
      !displayName.trim() ||
      !username.trim()
    ) {
      return;
    }

    setShowIdentity(false);
    setShowPrivacy(true);
  }

  function enterBonfire() {
    setProfileCreated(true);
    setShowPrivacy(false);
  }

  function openProfile() {
    if (profileCreated) {
      setShowPrivacy(true);
    } else {
      setShowIdentity(true);
    }
  }

  function selectPerson(person: Person) {
    setSelectedPerson(person);
  }

  function togglePerson(personId: number) {
    setVisiblePeople((current) =>
      current.includes(personId)
        ? current.filter(
            (id) => id !== personId
          )
        : [...current, personId]
    );

    /*
     * Selecting individual people means
     * the Bonfire is using chosen privacy.
     */
    setPrivacy("chosen");
  }

  function getPrivacyDescription() {
    if (privacy === "everyone") {
      return "everyone can find you";
    }

    if (privacy === "nobody") {
      return "your Bonfire is completely hidden";
    }

    if (visiblePeople.length === 0) {
      return "nobody can currently see you";
    }

    return `${visiblePeople.length} ${
      visiblePeople.length === 1
        ? "person"
        : "people"
    } can see you`;
  }

  return (
    <main
      className={`bonfire-page ${
        lit ? "lit" : ""
      }`}
    >
      <div className="grain" />

      <div className="background-glow" />

      {/* HEADER */}

      <header className="top-bar">
        <button
          className="wordmark-button"
          onClick={() => setActiveView("fire")}
        >
          bonfire
        </button>

        <div className="top-actions">
          <button
            className={`top-nav-button ${
              activeView === "people"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActiveView("people")
            }
          >
            people
          </button>

          <button
            className="profile-button"
            aria-label="Profile"
            onClick={openProfile}
          >
            ✦
          </button>
        </div>
      </header>

      {/* MAIN WORLD */}

      <section className="bonfire-world">

        {/* INTRO */}

        <div className="intro-copy">
          <span className="eyebrow">
            {profileCreated
              ? `@${username}`
              : "your little corner"}
          </span>

          <h1>
            {profileCreated && displayName
              ? `Hey, ${displayName}.`
              : "Stay close."}

            <br />

            {activeView === "people"
              ? "Your people are here."
              : "Stay private."}
          </h1>
        </div>

        {/* FIRE VIEW */}

        {activeView === "fire" && (
          <>
            {/* PEOPLE AROUND FIRE */}

            <div className="people-orbit">
              {people.map((person) => (
                <button
                  key={person.id}
                  className={`person-orb ${person.position}`}
                  onClick={() =>
                    selectPerson(person)
                  }
                >
                  <span className="person-glow" />

                  <span className="person-letter">
                    {person.symbol}
                  </span>

                  <span className="person-name">
                    {person.name}
                  </span>

                  <span className="person-status">
                    {person.status}
                  </span>
                </button>
              ))}
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
                {lit
                  ? "the fire is warm"
                  : "touch the fire"}
              </span>
            </div>

            {/* MEMORY CARDS */}

            <div className="memories">
              {memories.map((memory) => (
                <button
                  key={memory.id}
                  className={`memory-card ${
                    memory.position
                  } ${memory.type}`}
                  onClick={() =>
                    setSelected(memory)
                  }
                >
                  <span className="memory-mark">
                    {memory.type === "photo" &&
                      "▧"}

                    {memory.type === "note" &&
                      "✉"}

                    {memory.type === "song" &&
                      "♪"}
                  </span>

                  <span className="memory-title">
                    {memory.title}
                  </span>

                  <span className="memory-text">
                    {memory.text}
                  </span>
                </button>
              ))}
            </div>
          </>
        )}

        {/* PEOPLE VIEW */}

        {activeView === "people" && (
          <div className="people-page">
            <div className="people-heading">
              <span>
                people around your fire
              </span>

              <small>
                only people you've allowed
              </small>
            </div>

            <div className="people-grid">
              {people.map((person) => (
                <button
                  key={person.id}
                  className="person-card"
                  onClick={() =>
                    selectPerson(person)
                  }
                >
                  <div className="person-card-avatar">
                    {person.symbol}
                  </div>

                  <div className="person-card-info">
                    <strong>
                      {person.name}
                    </strong>

                    <span>
                      @{person.username}
                    </span>

                    <small>
                      {person.status}
                    </small>
                  </div>

                  <span className="person-card-arrow">
                    →
                  </span>
                </button>
              ))}
            </div>

            <button
              className="invite-button"
              onClick={() =>
                alert(
                  "Invite links will be added in the next Bonfire build."
                )
              }
            >
              + invite someone to your fire
            </button>
          </div>
        )}
      </section>

      {/* FOOTER */}

      <footer className="bottom-bar">
        <span>
          {getPrivacyDescription()}
        </span>

        <span className="status-dot" />
      </footer>

      {/* MEMORY DETAIL */}

      {selected && (
        <div
          className="memory-overlay"
          onClick={() => setSelected(null)}
        >
          <div
            className={`memory-detail ${
              selected.type
            }`}
            onClick={(event) =>
              event.stopPropagation()
            }
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

      {/* PERSON DETAIL */}

      {selectedPerson && (
        <div
          className="person-overlay"
          onClick={() =>
            setSelectedPerson(null)
          }
        >
          <div
            className="person-detail"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              className="close-button"
              onClick={() =>
                setSelectedPerson(null)
              }
            >
              ×
            </button>

            <div className="person-detail-avatar">
              {selectedPerson.symbol}
            </div>

            <span className="person-detail-status">
              ● {selectedPerson.status}
            </span>

            <h2>{selectedPerson.name}</h2>

            <span className="person-detail-username">
              @{selectedPerson.username}
            </span>

            <p>
              This person is part of your
              Bonfire.
            </p>

            <button
              className="message-button"
              onClick={() =>
                alert(
                  `Messaging ${selectedPerson.name} will be connected next.`
                )
              }
            >
              open conversation
            </button>
          </div>
        </div>
      )}

      {/* IDENTITY */}

      {showIdentity && (
        <div className="identity-overlay">
          <div className="identity-card">
            <span className="identity-mark">
              🔥
            </span>

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
                setDisplayName(
                  event.target.value
                )
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
                  setUsername(
                    event.target.value
                  )
                }
              />
            </div>

            <button
              className="continue-button"
              onClick={continueToPrivacy}
            >
              Continue
            </button>

            <small>
              Your username helps people find
              you.
            </small>
          </div>
        </div>
      )}

      {/* PRIVACY */}

      {showPrivacy && (
        <div className="privacy-overlay">
          <div className="privacy-card">

            <div className="privacy-fire">
              <span className="privacy-flame" />
            </div>

            <span className="privacy-eyebrow">
              your fire · your rules
            </span>

            <h2>Who can see you?</h2>

            <p className="privacy-intro">
              Bonfire doesn't decide who gets
              to know you're here.
              <br />
              You do.
            </p>

            {/* GLOBAL PRIVACY */}

            <div className="privacy-options">

              <button
                className={`privacy-option ${
                  privacy === "everyone"
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setPrivacy("everyone")
                }
              >
                <span className="option-icon">
                  ◌
                </span>

                <span className="option-content">
                  <strong>
                    Everyone
                  </strong>

                  <small>
                    Anyone can discover and
                    message you.
                  </small>
                </span>

                <span className="option-radio" />
              </button>

              <button
                className={`privacy-option ${
                  privacy === "chosen"
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setPrivacy("chosen")
                }
              >
                <span className="option-icon">
                  ✦
                </span>

                <span className="option-content">
                  <strong>
                    People you choose
                  </strong>

                  <small>
                    Only selected people can
                    find and message you.
                  </small>
                </span>

                <span className="option-radio" />
              </button>

              <button
                className={`privacy-option ${
                  privacy === "nobody"
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setPrivacy("nobody")
                }
              >
                <span className="option-icon">
                  ·
                </span>

                <span className="option-content">
                  <strong>
                    Nobody
                  </strong>

                  <small>
                    Your Bonfire stays hidden.
                  </small>
                </span>

                <span className="option-radio" />
              </button>

            </div>

            {/* CHOSEN PEOPLE */}

            {privacy === "chosen" && (
              <div className="chosen-people">

                <div className="chosen-people-heading">
                  <span>
                    people who can see you
                  </span>

                  <small>
                    tap to change
                  </small>
                </div>

                <div className="chosen-people-list">

                  {people.map((person) => {
                    const isVisible =
                      visiblePeople.includes(
                        person.id
                      );

                    return (
                      <button
                        key={person.id}
                        className={`chosen-person ${
                          isVisible
                            ? "visible"
                            : "hidden"
                        }`}
                        onClick={() =>
                          togglePerson(person.id)
                        }
                      >

                        <span className="chosen-avatar">
                          {person.symbol}
                        </span>

                        <span className="chosen-info">

                          <strong>
                            {person.name}
                          </strong>

                          <small>
                            {isVisible
                              ? "can see + message"
                              : "can't see you"}
                          </small>

                        </span>

                        <span className="chosen-toggle">
                          {isVisible
                            ? "●"
                            : "○"}
                        </span>

                      </button>
                    );
                  })}

                </div>

                <button
                  className="add-person-button"
                  onClick={() =>
                    alert(
                      "Adding new people will be connected to Bonfire accounts later."
                    )
                  }
                >
                  + add someone to your fire
                </button>

              </div>
            )}

            {/* CURRENT PRIVACY STATUS */}

            <div className="privacy-status-line">
              <span className="privacy-status-dot" />

              <span>
                {getPrivacyDescription()}
              </span>
            </div>

            <button
              className="enter-fire-button"
              onClick={enterBonfire}
            >
              {profileCreated
                ? "Save privacy"
                : "Enter my Bonfire"}
            </button>

            <small className="privacy-note">
              You can change this whenever you
              want.
            </small>

          </div>
        </div>
      )}
    </main>
  );
}

export default App;
