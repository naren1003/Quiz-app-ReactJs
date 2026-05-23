import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { SetQuestions } from "./pages/SetQuestion";
import { StartQuiz } from "./pages/StartQuiz";
import { Result } from "./pages/Result";
import './App.css'
import { useState } from "react";

function App() {
  const questions = [
    {
      id: 1,
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Text Machine Language",
        "Hyper Transfer Markup Language",
        "Home Tool Markup Language"
      ],
      answer: "Hyper Text Markup Language"
    },

    {
      id: 2,
      question: "Which language is used for styling web pages?",
      options: [
        "HTML",
        "Python",
        "CSS",
        "C++"
      ],
      answer: "CSS"
    },

    {
      id: 3,
      question: "Which JavaScript method is used to display output in console?",
      options: [
        "print()",
        "console.log()",
        "write()",
        "display()"
      ],
      answer: "console.log()"
    },

    {
      id: 4,
      question: "Which React hook is used to manage state?",
      options: [
        "useFetch",
        "useState",
        "useData",
        "useClass"
      ],
      answer: "useState"
    },

    {
      id: 5,
      question: "Which company created React?",
      options: [
        "Google",
        "Microsoft",
        "Facebook",
        "Amazon"
      ],
      answer: "Facebook"
    },

    {
      id: 6,
      question: "What symbol is used for comments in JavaScript?",
      options: [
        "<!-- -->",
        "#",
        "//",
        "**"
      ],
      answer: "//"
    },

    {
      id: 7,
      question: "Which HTML tag is used to create a hyperlink?",
      options: [
        "<link>",
        "<a>",
        "<href>",
        "<p>"
      ],
      answer: "<a>"
    },

    {
      id: 8,
      question: "Which CSS property changes text color?",
      options: [
        "background-color",
        "font-style",
        "color",
        "text-align"
      ],
      answer: "color"
    },

    {
      id: 9,
      question: "What is the correct way to declare a variable in JavaScript?",
      options: [
        "var x = 10",
        "int x = 10",
        "string x = 10",
        "declare x = 10"
      ],
      answer: "var x = 10"
    },

    {
      id: 10,
      question: "What does CSS stand for?",
      options: [
        "Computer Style Sheets",
        "Creative Style System",
        "Cascading Style Sheets",
        "Colorful Style Sheets"
      ],
      answer: "Cascading Style Sheets"
    }
  ];

  const [correctAnswers, setCorrectAnswers] = useState({});

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="setQuiz" element={<SetQuestions />} /> 
        <Route path="/quiz" element={<StartQuiz questions = {questions} correctAnswers = {correctAnswers} setCorrectAnswers={setCorrectAnswers}/>} />
        <Route path="/result" element = {<Result correctAnswers = {correctAnswers}/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
