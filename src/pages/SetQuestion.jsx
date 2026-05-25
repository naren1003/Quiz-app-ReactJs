import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const emptyForm = {
  question: "",
  options: ["", "", "", ""],
  answer: "",
};

export function SetQuestions({
  activeQuizId,
  quizzes,
  saveQuizzes,
  selectQuiz,
  setCorrectAnswers,
  onLogout,
}) {
  const [form, setForm] = useState(emptyForm);
  const [quizTitle, setQuizTitle] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const activeQuiz = quizzes.find((quiz) => quiz.id === activeQuizId) || quizzes[0];
  const questions = activeQuiz?.questions || [];

  const resetQuizAttempt = (quizId = activeQuiz?.id) => {
    if (!quizId) return;
    localStorage.removeItem(`selected-${quizId}`);
    localStorage.removeItem(`quizTimer-${quizId}`);
    setCorrectAnswers({});
  };

  const updateOption = (index, value) => {
    const nextOptions = [...form.options];
    nextOptions[index] = value;
    setForm({ ...form, options: nextOptions });
  };

  const updateActiveQuiz = (updates) => {
    if (!activeQuiz) return;

    const nextQuizzes = quizzes.map((quiz) =>
      quiz.id === activeQuiz.id ? { ...quiz, ...updates } : quiz
    );
    saveQuizzes(nextQuizzes);
    resetQuizAttempt(activeQuiz.id);
  };

  const saveQuestions = (nextQuestions) => {
    updateActiveQuiz({ questions: nextQuestions });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const question = form.question.trim();
    const options = form.options.map((option) => option.trim());
    const answer = form.answer.trim();

    if (!question || options.some((option) => !option) || !answer) {
      setMessage("Please fill the question, all four options, and the answer.");
      return;
    }

    if (!options.includes(answer)) {
      setMessage("The correct answer must match one of the options exactly.");
      return;
    }

    const nextQuestions = [
      ...questions,
      {
        id: Date.now(),
        question,
        options,
        answer,
      },
    ];

    saveQuestions(nextQuestions);
    setForm(emptyForm);
    setMessage("Question added successfully.");
  };

  const deleteQuestion = (id) => {
    saveQuestions(questions.filter((question) => question.id !== id));
  };

  const createQuiz = (event) => {
    event.preventDefault();

    const title = quizTitle.trim();
    if (!title) {
      setMessage("Please enter a quiz title.");
      return;
    }

    const newQuiz = {
      id: `quiz-${Date.now()}`,
      title,
      durationMinutes: 10,
      questions: [],
    };

    saveQuizzes([...quizzes, newQuiz]);
    selectQuiz(newQuiz.id);
    setQuizTitle("");
    setForm(emptyForm);
    setMessage("New quiz created. Add questions when you are ready.");
  };

  const deleteQuiz = (quizId) => {
    if (quizzes.length === 1) {
      setMessage("Keep at least one quiz available.");
      return;
    }

    const nextQuizzes = quizzes.filter((quiz) => quiz.id !== quizId);
    localStorage.removeItem(`selected-${quizId}`);
    localStorage.removeItem(`quizTimer-${quizId}`);
    saveQuizzes(nextQuizzes);
    selectQuiz(nextQuizzes[0].id);
    setMessage("Quiz deleted.");
  };

  const updateDuration = (value) => {
    const durationMinutes = Number(value);

    if (!Number.isInteger(durationMinutes) || durationMinutes < 1) {
      setMessage("Quiz time must be at least 1 minute.");
      return;
    }

    updateActiveQuiz({ durationMinutes });
    setMessage("Quiz time updated.");
  };

  const logout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <main className="app-page">
      <section className="builder-layout">
        <div className="page-card question-builder">
          <div className="admin-bar">
            <span>Admin mode</span>
            <button className="ghost-btn" type="button" onClick={logout}>
              Logout
            </button>
          </div>

          <div className="section-heading">
            <span className="eyebrow">Set Quiz</span>
            <h1>{activeQuiz?.title || "Create a quiz"}</h1>
            <p>Add questions, choose the correct answers, and set the quiz time.</p>
          </div>

          <form className="quiz-settings" onSubmit={createQuiz}>
            <label>
              Active Quiz
              <select
                value={activeQuiz?.id || ""}
                onChange={(event) => {
                  selectQuiz(event.target.value);
                  setForm(emptyForm);
                  setMessage("");
                }}
              >
                {quizzes.map((quiz) => (
                  <option key={quiz.id} value={quiz.id}>
                    {quiz.title}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Time Limit (minutes)
              <input
                min="1"
                type="number"
                value={activeQuiz?.durationMinutes || 1}
                onChange={(event) => updateDuration(event.target.value)}
              />
            </label>

            <label>
              New Quiz Title
              <input
                value={quizTitle}
                onChange={(event) => setQuizTitle(event.target.value)}
                placeholder="Example: JavaScript Basics"
              />
            </label>

            <button className="secondary-btn" type="submit">
              Create Quiz
            </button>
          </form>

          <form className="question-form" onSubmit={handleSubmit}>
            <label>
              Question
              <textarea
                value={form.question}
                onChange={(event) =>
                  setForm({ ...form, question: event.target.value })
                }
                placeholder="Example: Which tag creates a hyperlink?"
                rows="4"
              />
            </label>

            <div className="form-grid">
              {form.options.map((option, index) => (
                <label key={index}>
                  Option {index + 1}
                  <input
                    value={option}
                    onChange={(event) => updateOption(index, event.target.value)}
                    placeholder={`Option ${index + 1}`}
                  />
                </label>
              ))}
            </div>

            <label>
              Correct Answer
              <select
                value={form.answer}
                onChange={(event) =>
                  setForm({ ...form, answer: event.target.value })
                }
              >
                <option value="">Select the correct option</option>
                {form.options
                  .filter((option) => option.trim())
                  .map((option, index) => (
                    <option key={`${option}-${index}`} value={option.trim()}>
                      {option.trim()}
                    </option>
                  ))}
              </select>
            </label>

            {message && <p className="form-message">{message}</p>}

            <div className="form-actions">
              <button className="primary-btn" type="submit">
                Add Question
              </button>
              <button
                className="secondary-btn"
                type="button"
                onClick={() => navigate(`/quiz/${activeQuiz.id}`)}
              >
                Start Quiz
              </button>
            </div>
          </form>
        </div>

        <aside className="page-card question-list">
          <div className="section-heading">
            <span className="eyebrow">Question Bank</span>
            <h2>{questions.length} questions ready</h2>
          </div>

          <div className="quiz-summary-list">
            {quizzes.map((quiz) => (
              <button
                className={`quiz-summary ${quiz.id === activeQuiz?.id ? "is-active" : ""}`}
                key={quiz.id}
                type="button"
                onClick={() => selectQuiz(quiz.id)}
              >
                <span>{quiz.durationMinutes} min</span>
                <strong>{quiz.title}</strong>
                <small>{quiz.questions.length} questions</small>
              </button>
            ))}
          </div>

          <div className="question-preview-list">
            {questions.map((question, index) => (
              <article className="question-preview" key={question.id}>
                <div>
                  <span>#{index + 1}</span>
                  <h3>{question.question}</h3>
                  <p>Answer: {question.answer}</p>
                </div>
                <button
                  className="ghost-btn"
                  type="button"
                  onClick={() => deleteQuestion(question.id)}
                >
                  Delete
                </button>
              </article>
            ))}
          </div>

          <nav className="page-nav">
            <Link to="/">Home</Link>
            {activeQuiz && <Link to={`/quiz/${activeQuiz.id}`}>Start Quiz</Link>}
            {activeQuiz && (
              <button
                className="link-button"
                type="button"
                onClick={() => deleteQuiz(activeQuiz.id)}
              >
                Delete Quiz
              </button>
            )}
          </nav>
        </aside>
      </section>
    </main>
  );
}
