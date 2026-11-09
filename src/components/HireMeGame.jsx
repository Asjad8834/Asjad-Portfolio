import React, { useEffect, useState } from "react";
import "../styles/HireMeGame.css";

const questions = [
  {
    scenario: "🚨 PRODUCTION ALERT",
    question: "Your API suddenly starts returning 500 errors. 1,247 users are affected.",
    options: [
      "Check the server logs",
      "Restart the entire server",
      "Blame the frontend",
      "Pretend nothing happened",
    ],
    answer: 0,
    success: "Good call. Logs first, panic later.",
  },
  {
    scenario: "🐛 THE BUG",
    question: "You found a bug but can't reproduce it locally. What do you do?",
    options: [
      "Delete the feature",
      "Check logs and reproduce the issue",
      "Push directly to production",
      "Tell the user it's a feature",
    ],
    answer: 1,
    success: "That's how debugging is supposed to work.",
  },
  {
    scenario: "⚡ PERFORMANCE",
    question: "An API endpoint is taking 2 seconds to respond. What's your first move?",
    options: [
      "Rewrite the whole backend",
      "Add random console.logs",
      "Profile the request and inspect the database",
      "Increase the font size",
    ],
    answer: 2,
    success: "Performance debugging unlocked.",
  },
  {
    scenario: "💳 VAULTPAY",
    question: "A banking transfer request is accidentally sent twice. What prevents a duplicate debit?",
    options: [
      "A bigger server",
      "Idempotency keys",
      "More frontend buttons",
      "Refreshing the page",
    ],
    answer: 1,
    success: "You know your way around reliable backend systems.",
  },
  {
    scenario: "☕ 2:00 AM",
    question: "Production is down at 2 AM. What is your first response?",
    options: [
      "Panic",
      "Go back to sleep",
      "Check the logs and investigate",
      "Delete the database",
    ],
    answer: 2,
    success: "Okay... you're hired.",
  },
];

const reactions = [
  "Nice.",
  "The bugs are getting nervous.",
  "That's actually a good answer.",
  "Backend brain detected.",
  "The production server approves.",
  "Recruiter.exe is taking notes...",
];

function HireMeGame() {
  const [isOpen, setIsOpen] = useState(false);
  const [booting, setBooting] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [xp, setXp] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [reaction, setReaction] = useState("");
  const [finished, setFinished] = useState(false);

  const startGame = () => {
    setIsOpen(true);
    setBooting(true);
    setBootProgress(0);
    setCurrentQuestion(0);
    setScore(0);
    setXp(0);
    setSelectedAnswer(null);
    setReaction("");
    setFinished(false);
  };

  useEffect(() => {
    if (!booting) return;

    const interval = setInterval(() => {
      setBootProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);

          setTimeout(() => {
            setBooting(false);
          }, 400);

          return 100;
        }

        return prev + 4;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [booting]);

  const handleAnswer = (index) => {
    if (selectedAnswer !== null) return;

    const question = questions[currentQuestion];
    const correct = index === question.answer;

    setSelectedAnswer(index);

    if (correct) {
      setScore((prev) => prev + 1);
      setXp((prev) => prev + 100);
      setReaction(
        question.success ||
          reactions[Math.floor(Math.random() * reactions.length)]
      );
    } else {
      setReaction(
        [
          "💀 The codebase remembers this.",
          "That... was not the optimal solution.",
          "Production has entered the chat.",
          "Minus debugging aura.",
        ][Math.floor(Math.random() * 4)]
      );
    }

    setTimeout(() => {
      if (currentQuestion === questions.length - 1) {
        setFinished(true);
      } else {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
        setReaction("");
      }
    }, 900);
  };

  const getVerdict = () => {
    if (score === 5) return "JUST SEND THE OFFER.";
    if (score >= 4) return "VERY HIREABLE.";
    if (score === 3) return "THE RECRUITER IS THINKING...";
    if (score >= 2) return "ONE MORE LEETCODE PROBLEM.";
    return "RECRUITER.EXE HAS CRASHED.";
  };

  const closeGame = () => {
    setIsOpen(false);
    setBooting(false);
  };

  return (
    <>
      <button className="hire-me-trigger" onClick={startGame}>
        🎮 Enter Asjad.exe
      </button>

      {isOpen && (
        <div className="hire-game-overlay">
          <div className="hire-game">

            <button
              className="hire-game-close"
              onClick={closeGame}
              aria-label="Close game"
            >
              ×
            </button>

            {booting ? (
              <div className="hire-boot">

                <div className="boot-logo">
                  ASJAD<span>.EXE</span>
                </div>

                <div className="boot-lines">
                  <p>&gt; INITIALIZING CANDIDATE...</p>
                  <p>&gt; LOADING JAVA ............... ✓</p>
                  <p>&gt; LOADING MERN ............... ✓</p>
                  <p>&gt; LOADING DSA ................ ✓</p>
                  <p>&gt; LOADING DEBUGGING ......... ✓</p>
                  <p className="failed">
                    &gt; CHECKING SLEEP ............. ✗
                  </p>
                </div>

                <div className="boot-progress">
                  <div
                    style={{
                      width: `${bootProgress}%`,
                    }}
                  />
                </div>

                <p className="boot-percentage">
                  {bootProgress}%
                </p>

                {bootProgress >= 100 && (
                  <p className="boot-ready">
                    INTERVIEW SIMULATION READY
                  </p>
                )}

              </div>
            ) : !finished ? (
              <div className="hire-main">

                <div className="hire-topbar">
                  <span>ASJAD.EXE</span>

                  <span>
                    XP <strong>{xp}</strong>
                  </span>
                </div>

                <div className="hire-progress">
                  <div
                    style={{
                      width: `${
                        ((currentQuestion + 1) /
                          questions.length) *
                        100
                      }%`,
                    }}
                  />
                </div>

                <div className="hire-content">

                  <div className="scenario">
                    {questions[currentQuestion].scenario}
                  </div>

                  <div className="question-count">
                    QUESTION {currentQuestion + 1} /{" "}
                    {questions.length}
                  </div>

                  <h2>
                    {questions[currentQuestion].question}
                  </h2>

                  <div className="hire-options">
                    {questions[currentQuestion].options.map(
                      (option, index) => {

                        let className = "hire-option";

                        if (selectedAnswer !== null) {
                          if (
                            index ===
                            questions[currentQuestion].answer
                          ) {
                            className += " correct";
                          } else if (
                            index === selectedAnswer
                          ) {
                            className += " wrong";
                          }
                        }

                        return (
                          <button
                            key={index}
                            className={className}
                            onClick={() =>
                              handleAnswer(index)
                            }
                          >
                            <span className="option-key">
                              {String.fromCharCode(
                                65 + index
                              )}
                            </span>

                            <span>{option}</span>
                          </button>
                        );
                      }
                    )}
                  </div>

                  {reaction && (
                    <div
                      className={`hire-reaction ${
                        selectedAnswer ===
                        questions[currentQuestion].answer
                          ? "positive"
                          : "negative"
                      }`}
                    >
                      {reaction}
                    </div>
                  )}

                  <div className="hire-footer">
                    <span>
                      DEBUGGING LEVEL{" "}
                      {"█".repeat(currentQuestion + 1)}
                      {"░".repeat(
                        questions.length -
                          currentQuestion -
                          1
                      )}
                    </span>

                    <span>
                      +{selectedAnswer !== null &&
                      selectedAnswer ===
                        questions[currentQuestion].answer
                        ? 100
                        : 0}{" "}
                      XP
                    </span>
                  </div>

                </div>
              </div>
            ) : (
              <div className="hire-result">

                <div className="result-icon">
                  {score >= 4 ? "🚀" : score >= 3 ? "👀" : "💀"}
                </div>

                <div className="result-label">
                  SYSTEM COMPLETE
                </div>

                <div className="result-score">
                  {xp} XP
                </div>

                <h1>{getVerdict()}</h1>

                <p className="result-subtitle">
                  Candidate analysis complete.
                </p>

                <div className="result-stats">
                  <div>
                    <span>JAVA</span>
                    <strong>
                      {"█".repeat(Math.min(score + 1, 5))}
                      {"░".repeat(Math.max(4 - score, 0))}
                    </strong>
                  </div>

                  <div>
                    <span>BACKEND</span>
                    <strong>
                      {"█".repeat(Math.min(score + 2, 5))}
                      {"░".repeat(Math.max(3 - score, 0))}
                    </strong>
                  </div>

                  <div>
                    <span>DEBUGGING</span>
                    <strong>
                      {"█".repeat(Math.min(score + 1, 5))}
                      {"░".repeat(Math.max(4 - score, 0))}
                    </strong>
                  </div>

                  <div>
                    <span>SLEEP</span>
                    <strong>██░░░</strong>
                  </div>

                  <div>
                    <span>COFFEE</span>
                    <strong>█████</strong>
                  </div>
                </div>

                <div className="result-buttons">
                  <button onClick={startGame}>
                    🔄 RUN AGAIN
                  </button>

                  <button
                    className="secondary"
                    onClick={closeGame}
                  >
                    EXIT
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}

export default HireMeGame;