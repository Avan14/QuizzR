import React, { useState, useEffect } from "react";
import mockQuestions from "./Data/Ques"

const App = () => {
  const [currentTab, setCurrentTab] = useState("Physics");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(179 * 60); // Timer in seconds (179 minutes)

  useEffect(() => {
    // Mock Questions Data (replace with real data from JSON or API)
    const mockQuestions = [
      {
        id: 1,
        subject: "Physics",
        question:
          "A convex lens is put 10 cm from a light source and it makes a sharp image on a screen kept 10 cm from the lens. Now a glass block (refractive index 1.5) of 1.5 cm thickness is placed in contact with the light source. To get the sharp image again, the screen is shifted by a distance d. Then d is:",
        options: [
          "1.1 cm away from the lens",
          "0",
          "0.55 cm towards the lens",
          "0.55 cm away from the lens",
        ],
      },
      {
        id: 2,
        subject: "Chemistry",
        question: "What is the molarity of a solution containing 10g NaCl in 1L?",
        options: ["0.17 M", "0.5 M", "1 M", "0.1 M"],
      },
      {
        id: 3,
        subject: "Maths",
        question: "What is the derivative of sin(x)?",
        options: ["cos(x)", "-cos(x)", "sin(x)", "-sin(x)"],
      },
    ];

    setQuestions(mockQuestions);

    // Timer logic
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    setCurrentQuestion(0); // Reset to the first question of the selected subject
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleNavigation = (index) => {
    setCurrentQuestion(index);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const currentSubjectQuestions = questions.filter(
    (q) => q.subject === currentTab
  );

  if (currentSubjectQuestions.length === 0)
    return <div>Loading Questions...</div>;

  const current = currentSubjectQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex justify-between items-center bg-blue-600 text-white p-4 rounded">
        <h1 className="text-lg font-bold">JEE Test Simulator</h1>
        <div className="text-lg">Time Left: {formatTime(timeLeft)}</div>
      </header>

      <div className="flex mt-4">
        <div className="w-3/4 bg-white p-4 rounded shadow">
          <div className="flex justify-between mb-4">
            {["Physics", "Chemistry", "Maths"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 font-semibold ${
                  currentTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                } rounded`}
                onClick={() => handleTabChange(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <h2 className="text-lg font-bold mb-2">
            Question {currentQuestion + 1}
          </h2>
          <p className="mb-4">{current.question}</p>

          <div className="mb-4">
            {current.options.map((option, index) => (
              <label
                key={index}
                className="block mb-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
              >
                <input
                  type="radio"
                  name={`question-${current.id}`}
                  value={option}
                  checked={answers[current.id] === option}
                  onChange={() => handleAnswer(current.id, option)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              onClick={() =>
                handleNavigation(Math.max(currentQuestion - 1, 0))
              }
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded"
              disabled={currentQuestion === 0}
            >
              Previous
            </button>
            <button
              onClick={() =>
                handleNavigation(
                  Math.min(currentQuestion + 1, currentSubjectQuestions.length - 1)
                )
              }
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save & Next
            </button>
          </div>
        </div>

        <div className="w-1/4 ml-4 bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold mb-4">Go to Question</h3>
          <div className="grid grid-cols-4 gap-2">
            {currentSubjectQuestions.map((q, index) => (
              <button
                key={q.id}
                className={`w-10 h-10 ${
                  answers[q.id]
                    ? "bg-green-500 text-white"
                    : currentQuestion === index
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600"
                } rounded`}
                onClick={() => handleNavigation(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      <footer className="flex justify-between mt-4">
        <button className="px-4 py-2 bg-red-600 text-white rounded">
          End Test
        </button>
        <button className="px-4 py-2 bg-yellow-500 text-white rounded">
          Question Paper
        </button>
      </footer>
    </div>
  );
};

export default App;
