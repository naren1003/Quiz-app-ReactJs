import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const emptyForm = {
  question: "",
  options: ["", "", "", ""],
  answer: "",
};

export function SetQuestions({
  questions,
  setQuestions,
  setCorrectAnswers,
  onLogout,
}) {
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const updateOption = (index, value) => {
    const nextOptions = [...form.options];
    nextOptions[index] = value;
    setForm({ ...form, options: nextOptions });
  };

  const saveQuestions = (nextQuestions) => {
    setQuestions(nextQuestions);
    localStorage.setItem("questions", JSON.stringify(nextQuestions));
    localStorage.removeItem("selected");
    localStorage.removeItem("quizTimer");
    setCorrectAnswers({});
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
            <span className="eyebrow">Set Question</span>
            <h1>Create a quiz question</h1>
            <p>Add a question with four options, then choose the correct answer.</p>
          </div>

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
                onClick={() => navigate("/quiz")}
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
            <Link to="/quiz">Start Quiz</Link>
          </nav>
        </aside>
      </section>
    </main>
  );
}
