// --- 1. Daily Football Fun Facts ---
const facts = [
  "Football (Soccer) is the most popular sport in the world with over 3.5 billion fans.",
  "The fastest goal in professional football history was scored in 2.8 seconds by Ricardo Olivera in 1998.",
  "Only one country has played in every FIFA World Cup tournament: Brazil.",
  "A single football player runs an average of 7 miles (11 km) during a 90-minute match.",
  "The largest football stadium in the world is the Rungrado 1st of May Stadium in North Korea, seating over 114,000 people."
];

const factText = document.getElementById("fact-text");
const newFactBtn = document.getElementById("new-fact-btn");

function getRandomFact() {
  const randomIndex = Math.floor(Math.random() * facts.length);
  factText.textContent = facts[randomIndex];
}

newFactBtn.addEventListener("click", getRandomFact);


// --- 2. Instant Sports Trivia ---
const triviaData = [
  {
    question: "Which country won the 2022 FIFA World Cup?",
    options: ["France", "Argentina", "Brazil", "Croatia"],
    answer: 1
  },
  {
    question: "How long is a standard professional football match?",
    options: ["80 minutes", "90 minutes", "100 minutes", "60 minutes"],
    answer: 1
  },
  {
    question: "Which player has won the most Ballon d'Or awards?",
    options: ["Cristiano Ronaldo", "Lionel Messi", "Johan Cruyff", "Zinedine Zidane"],
    answer: 1
  },
  {
    question: "What is the maximum number of players allowed on the pitch for one football team?",
    options: ["10", "11", "12", "9"],
    answer: 1
  }
];

let currentTriviaIndex = 0;

const triviaQuestion = document.getElementById("trivia-question");
const triviaOptions = document.getElementById("trivia-options");
const triviaFeedback = document.getElementById("trivia-feedback");
const nextTriviaBtn = document.getElementById("next-trivia-btn");

function loadTrivia() {
  triviaFeedback.textContent = "";
  triviaFeedback.className = "feedback";
  triviaOptions.innerHTML = "";

  const currentItem = triviaData[currentTriviaIndex];
  triviaQuestion.textContent = currentItem.question;

  currentItem.options.forEach((optionText, index) => {
    const btn = document.createElement("button");
    btn.textContent = optionText;
    btn.classList.add("option-btn");
    btn.addEventListener("click", () => checkAnswer(index, currentItem.answer));
    triviaOptions.appendChild(btn);
  });
}

function checkAnswer(selectedIndex, correctIndex) {
  if (selectedIndex === correctIndex) {
    triviaFeedback.textContent = "Correct! 🎉";
    triviaFeedback.className = "feedback correct";
  } else {
    triviaFeedback.textContent = "Wrong answer, try again! ❌";
    triviaFeedback.className = "feedback incorrect";
  }
}

nextTriviaBtn.addEventListener("click", () => {
  currentTriviaIndex = (currentTriviaIndex + 1) % triviaData.length;
  loadTrivia();
});


// --- 3. Match Day Schedule Manager ---
const scheduleForm = document.getElementById("schedule-form");
const matchTeamsInput = document.getElementById("match-teams");
const matchTimeInput = document.getElementById("match-time");
const scheduleList = document.getElementById("schedule-list");

let matches = JSON.parse(localStorage.getItem("matchSchedule")) || [];

function saveAndRenderMatches() {
  localStorage.setItem("matchSchedule", JSON.stringify(matches));
  renderMatches();
}

function renderMatches() {
  scheduleList.innerHTML = "";
  if (matches.length === 0) {
    scheduleList.innerHTML = "<li><small>No matches scheduled yet.</small></li>";
    return;
  }

  matches.forEach((match, index) => {
    const li = document.createElement("li");
    const formattedDate = new Date(match.time).toLocaleString([], {
      dateStyle: "short",
      timeStyle: "short"
    });

    li.innerHTML = `
      <div>
        <strong>${match.teams}</strong><br>
        <small>⏰ ${formattedDate}</small>
      </div>
      <button class="delete-btn" onclick="deleteMatch(${index})">Remove</button>
    `;
    scheduleList.appendChild(li);
  });
}

scheduleForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const teams = matchTeamsInput.value.trim();
  const time = matchTimeInput.value;

  if (teams && time) {
    matches.push({ teams, time });
    saveAndRenderMatches();
    matchTeamsInput.value = "";
    matchTimeInput.value = "";
  }
});

function deleteMatch(index) {
  matches.splice(index, 1);
  saveAndRenderMatches();
}

// Initial setup on page load
getRandomFact();
loadTrivia();
renderMatches();
