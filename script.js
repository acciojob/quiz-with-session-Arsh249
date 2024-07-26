//your JS code here.
document.addEventListener("DOMContentLoaded", () => {
  const questionsContainer = document.getElementById("questions");
  const submitButton = document.getElementById("submit");
  const scoreDisplay = document.getElementById("score");

  // Load progress from session storage
  const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

  // Render the questions
  questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");
    questionDiv.innerHTML = `<p>${q.question}</p>`;
    const optionsList = document.createElement("ul");

    q.choices.forEach(choice => {
      const optionItem = document.createElement("li");
      optionItem.classList.add("option");
      optionItem.innerHTML = `
        <label>
          <input type="radio" name="question${index}" value="${choice}" ${savedProgress[`question${index}`] === choice ? "checked" : ""}>
          ${choice}
        </label>`;
      optionsList.appendChild(optionItem);
    });

    questionDiv.appendChild(optionsList);
    questionsContainer.appendChild(questionDiv);
  });

  // Save progress in session storage
  questionsContainer.addEventListener("change", () => {
    const formData = new FormData(questionsContainer.querySelector("form"));
    const progress = {};
    for (let [key, value] of formData.entries()) {
      progress[key] = value;
    }
    sessionStorage.setItem("progress", JSON.stringify(progress));
  });

  // Handle submit button click
  submitButton.addEventListener("click", () => {
    const formData = new FormData(questionsContainer.querySelector("form"));
    let score = 0;
    questions.forEach((q, index) => {
      if (formData.get(`question${index}`) === q.answer) {
        score++;
      }
    });

    // Save score in local storage
    localStorage.setItem("score", score);

    // Display score
    scoreDisplay.textContent = `Your score is ${score} out of 5.`;
  });

  // Display score from local storage if exists
  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    scoreDisplay.textContent = `Your score is ${savedScore} out of 5.`;
  }
});


// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Display the quiz questions and choices
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
  }
}
renderQuestions();
