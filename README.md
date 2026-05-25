# QuizMaster

QuizMaster is a React quiz application built with Vite. It lets users select and take timed quizzes, view their score, review missed answers, and manage quiz content through a simple admin area.

## Features

- Home screen with available quiz selection
- Default "Web Basics Quiz" with starter questions
- Admin sign-in for quiz management
- Create multiple quizzes
- Add and delete questions
- Set a per-quiz time limit
- Timed quiz attempts with persisted progress
- Automatic submission when time runs out
- Score summary with percentage result
- Review page for incorrect or unanswered questions
- Browser `localStorage` persistence for quizzes, active quiz, answers, timer state, and admin session

## Tech Stack

- React 19
- React Router
- Vite
- ESLint
- React Compiler through the Vite/Babel setup

## Admin Access

Use these credentials to manage quizzes:

```text
Username: admin
Password: quiz123
```

The admin session is stored in `localStorage` under `quizAdminAuthenticated`.

## App Routes

- `/` - Home page and quiz selector
- `/login` - Admin login
- `/setQuiz` - Protected quiz builder and question manager
- `/quiz` or `/quiz/:quizId` - Quiz attempt screen
- `/result` or `/result/:quizId` - Score summary
- `/review` or `/review/:quizId` - Review missed or unanswered questions

## Project Structure

```text
src/
  App.jsx                 App state, default quiz data, and routes
  main.jsx                React entry point
  App.css                 Shared application styles
  index.css               Global styles
  pages/
    Home.jsx              Landing page and quiz picker
    Login.jsx             Admin authentication screen
    SetQuestion.jsx       Quiz and question management
    StartQuiz.jsx         Quiz attempt flow
    Timer.jsx             Countdown timer
    Result.jsx            Score display
    ReviewAnswers.jsx     Missed answer review
```

## Data Storage

This app does not use a backend. Quiz data and in-progress attempts are saved in the browser with `localStorage`.

Important keys include:

- `quizzes` - saved quiz list
- `activeQuizId` - currently selected quiz
- `selected-<quizId>` - answers selected during a quiz attempt
- `quizTimer-<quizId>` - remaining timer value for an active attempt
- `quizAdminAuthenticated` - admin login state

Clearing browser site data resets saved quizzes, progress, and the admin session.
