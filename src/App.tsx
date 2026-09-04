import { useEffect, useState } from "react";

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

type ChatMessage = {
  id: number;
  text: string;
  from: "me" | "them";
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

const initialChats: Record<number, ChatMessage[]> = {
  1: [
    {
      id: 1,
      text: "hey 👋",
      from: "them",
    },
    {
      id: 2,
      text: "you finally found the fire.",
      from: "them",
    },
  ],
  2: [
    {
      id: 1,
      text: "yo bro 🔥",
      from: "them",
    },
  ],
  3: [
    {
      id: 1,
      text: "hii",
      from: "them",
    },
  ],
};

const STORAGE_KEY = "bonfire-profile";

function App() {
  const [lit, setLit] = useState(false);

  const [selected, setSelected] =
    useState<Memory | null>(null);

  const [selectedPerson, setSelectedPerson] =
    useState<Person | null>(null);

  const [displayName, setDisplayName] = useState(() => {
    try {
      return localStorage.getItem("bonfire-display-name") || "";
    } catch {
      return "";
    }
  });

  const [username, setUsername] = useState(() => {
    try {
      return localStorage.getItem("bonfire-username") || "";
    } catch {
      return "";
    }
  });

  const [privacy, setPrivacy] =
    useState<PrivacyOption>(() => {
      try {
        const saved = localStorage.getItem(
          "bonfire-privacy"
        );

        if (
          saved === "everyone" ||
          saved === "chosen" ||
          saved === "nobody"
        ) {
          return saved;
        }
      } catch {}

      return "chosen";
    });

  const [profileCreated, setProfileCreated] =
    useState(() => {
      try {
        return localStorage.getItem(STORAGE_KEY) === "true";
      } catch {
        return false;
      }
    });

  const [showIdentity, setShowIdentity] =
    useState(() => {
      try {
        return localStorage.getItem(STORAGE_KEY) !== "true";
      } catch {
        return true;
      }
    });

  const [showPrivacy, setShowPrivacy] =
    useState(false);

  const [activeView, setActiveView] =
    useState<"fire" | "people">("fire");

  const [visiblePeople, setVisiblePeople] =
    useState<number[]>(() => {
      try {
        const saved = localStorage.getItem(
          "bonfire-visible-people"
        );

        if (saved) {
          const parsed = JSON.parse(saved);

          if (Array.isArray(parsed)) {
            return parsed;
          }
        }
      } catch {}

      return [1, 2];
    });

  const [chattingWith, setChattingWith] =
    useState<Person | null>(null);

  const [chatMessages, setChatMessages] =
    useState<Record<number, ChatMessage[]>>(() => {
      try {
        const saved = localStorage.getItem(
          "bonfire-chats"
        );

        if (saved) {
          const parsed = JSON.parse(saved);

          if (parsed && typeof parsed === "object") {
            return parsed;
          }
        }
      } catch {}

      return initialChats;
    });

  const [messageText, setMessageText] =
    useState("");

  /*
   * SAVE PROFILE
   *
   * Every time the important profile information
   * changes, we store it in the browser.
   */
  useEffect(() => {
    try {
      localStorage.setItem(
        "bonfire-display-name",
        displayName
      );

      localStorage.setItem(
        "bonfire-username",
        username
      );

      localStorage.setItem(
        "bonfire-privacy",
        privacy
      );

      localStorage.setItem(
        "bonfire-visible-people",
        JSON.stringify(visiblePeople)
      );

      localStorage.setItem(
        "bonfire-chats",
        JSON.stringify(chatMessages)
      );
    } catch {
      // Ignore storage errors.
    }
  }, [
    displayName,
    username,
    privacy,
    visiblePeople,
    chatMessages,
  ]);

  /*
   * IDENTITY
   */

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

  /*
   * ENTER BONFIRE
   */

  function enterBonfire() {
    if (
      !displayName.trim() ||
      !username.trim()
    ) {
      setShowIdentity(true);
      setShowPrivacy(false);
      return;
    }

    setProfileCreated(true);
    setShowPrivacy(false);

    try {
      localStorage.setItem(
        STORAGE_KEY,
        "true"
      );

      localStorage.setItem(
        "bonfire-display-name",
        displayName.trim()
      );

      localStorage.setItem(
        "bonfire-username",
        username.trim()
      );

      localStorage.setItem(
        "bonfire-privacy",
        privacy
      );

      localStorage.setItem(
        "bonfire-visible-people",
        JSON.stringify(visiblePeople)
      );
    } catch {
      // Ignore storage errors.
    }
  }

  /*
   * PROFILE
   */

  function openProfile() {
    if (profileCreated) {
      setShowPrivacy(true);
    } else {
      setShowIdentity(true);
    }
  }

  /*
   * PEOPLE
   */

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

    setPrivacy("chosen");
  }

  /*
   * PRIVACY DESCRIPTION
   */

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

  /*
   * CHAT
   */

  function openConversation(person: Person) {
    setChattingWith(person);
    setSelectedPerson(null);
    setMessageText("");
  }

  function closeConversation() {
    setChattingWith(null);
    setMessageText("");
  }

  function sendMessage() {
    if (
      !chattingWith ||
      !messageText.trim()
    ) {
      return;
    }

    const newMessage: ChatMessage = {
      id: Date.now(),
      text: messageText.trim(),
      from: "me",
    };

    setChatMessages((current) => ({
      ...current,
      [chattingWith.id]: [
        ...(current[chattingWith.id] || []),
        newMessage,
      ],
    }));

    setMessageText("");

    /*
     * Small local prototype response.
     */
    setTimeout(() => {
      const reply: ChatMessage = {
        id: Date.now() + 1,
        text: "that's nice 🔥",
        from: "them",
      };

      setChatMessages((current) => ({
        ...current,
        [chattingWith.id]: [
          ...(current[chattingWith.id] || []),
          reply,
        ],
      }));
    }, 900);
  }

  /*
   * RENDER
   */

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
          onClick={() =>
            setActiveView("fire")
          }
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
                onClick={() =>
                  setLit(!lit)
                }
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
          onClick={() =>
            setSelected(null)
          }
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
              onClick={() =>
                setSelected(null)
              }
            >
              ×
            </button>

            <span className="detail-mark">
              {selected.type === "photo" &&
                "▧"}

              {selected.type === "note" &&
                "✉"}

              {selected.type === "song" &&
                "♪"}
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

            <h2>
              {selectedPerson.name}
            </h2>

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
                openConversation(
                  selectedPerson
                )
              }
            >
              open conversation
            </button>
          </div>
        </div>
      )}

      {/* CHAT */}

      {chattingWith && (
        <div
          className="person-overlay"
          onClick={closeConversation}
        >
          <div
            className="person-detail"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              className="close-button"
              onClick={closeConversation}
            >
              ×
            </button>

            <div className="person-detail-avatar">
              {chattingWith.symbol}
            </div>

            <span className="person-detail-status">
              ● {chattingWith.status}
            </span>

            <h2>
              {chattingWith.name}
            </h2>

            <span className="person-detail-username">
              @{chattingWith.username}
            </span>

            <div
              style={{
                marginTop: "24px",
                maxHeight: "260px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                padding: "4px",
              }}
            >
              {(chatMessages[
                chattingWith.id
              ] || []).map((message) => (
                <div
                  key={message.id}
                  style={{
                    alignSelf:
                      message.from === "me"
                        ? "flex-end"
                        : "flex-start",

                    maxWidth: "78%",

                    padding:
                      "10px 13px",

                    borderRadius: "14px",

                    background:
                      message.from === "me"
                        ? "#e9dfd1"
                        : "rgba(255,255,255,0.06)",

                    color:
                      message.from === "me"
                        ? "#191613"
                        : "#eee7dc",

                    fontSize: "13px",

                    lineHeight: 1.4,
                  }}
                >
                  {message.text}
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                gap: "8px",
                marginTop: "18px",
              }}
            >
              <input
                value={messageText}
                onChange={(event) =>
                  setMessageText(
                    event.target.value
                  )
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    sendMessage();
                  }
                }}
                placeholder="say something..."
                style={{
                  flex: 1,
                  minWidth: 0,
                  padding: "12px 13px",
                  border:
                    "1px solid #38322c",
                  outline: "none",
                  background:
                    "rgba(255,255,255,0.04)",
                  color: "#eee7dc",
                  fontFamily: "inherit",
                }}
              />

              <button
                onClick={sendMessage}
                style={{
                  padding: "0 16px",
                  border: 0,
                  background: "#e9dfd1",
                  color: "#191613",
                  cursor: "pointer",
                }}
              >
                send
              </button>
            </div>
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

            <div className="privacy-options">

              {/* EVERYONE */}

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

              {/* CHOSEN */}

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

              {/* NOBODY */}

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
                          togglePerson(
                            person.id
                          )
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

            {/* PRIVACY STATUS */}

            <div className="privacy-status-line">
              <span className="privacy-status-dot" />

              <span>
                {getPrivacyDescription()}
              </span>
            </div>

            {/* SAVE */}

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
