const missions = [
  {
    title: "Enter the Castle",
    icon: "🏰",
    description:
      "Begin by predicting the next single token before asking ChatGPT.",
    prompt: "Harry Potter walked into the...",
    tasks: [
      "Write your predicted next token.",
      "Ask ChatGPT the exact same prompt.",
      "Record ChatGPT's predicted token.",
      "Briefly compare the two answers.",
    ],
  },
  {
    title: "The Great Hall",
    icon: "🕯️",
    description:
      "The prompt now includes more context. Notice how the likely continuation changes.",
    prompt: "Harry Potter walked into the Great Hall...",
    tasks: [
      "Predict the next single token.",
      "Ask ChatGPT the exact same prompt.",
      "Record ChatGPT's predicted token.",
      "Explain how the added context affected the prediction.",
    ],
  },
  {
    title: "The Story Continues",
    icon: "⚡",
    description:
      "One more word changes the sentence structure and may shift the most likely next token.",
    prompt: "Harry Potter walked into the Great Hall and...",
    tasks: [
      "Predict the next single token.",
      "Ask ChatGPT the exact same prompt.",
      "Record ChatGPT's predicted token.",
      "Explain why that token may be likely.",
    ],
  },
  {
    title: "The Mysterious Book",
    icon: "📖",
    description:
      "This prompt can continue in many ways. See whether ChatGPT chooses something expected or surprising.",
    prompt: "Harry Potter opened the mysterious book and discovered...",
    tasks: [
      "Predict the next single token.",
      "Ask ChatGPT the exact same prompt.",
      "Record ChatGPT's predicted token.",
      "Explain whether the answer surprised you.",
    ],
  },
  {
    title: "Human vs. AI",
    icon: "🧙",
    description:
      "Compare how you, another human, and ChatGPT continue the exact same prompt.",
    prompt: "Harry Potter opened the mysterious book and discovered...",
    tasks: [
      "Write your own predicted next token.",
      "Ask one friend or family member to predict the next token without AI.",
      "Ask ChatGPT the exact same prompt.",
      "Compare all three answers and write a short reflection.",
    ],
  },
];

let currentMission = 0;

const missionCard = document.getElementById("missionCard");
const progress = document.getElementById("progress");

function renderProgress() {
  progress.innerHTML = missions
    .map((_, index) => {
      const state =
        index < currentMission
          ? "complete"
          : index === currentMission
            ? "active"
            : "";

      const marker = index < currentMission ? "✓" : index + 1;

      return `
        <div class="progress-step ${state}">
          <strong>${marker}</strong>
          <span>Mission ${index + 1}</span>
        </div>
      `;
    })
    .join("");
}

function renderMission() {
  renderProgress();

  if (currentMission >= missions.length) {
    renderFinishScreen();
    return;
  }

  const mission = missions[currentMission];

  missionCard.innerHTML = `
    <div class="mission-header">
      <div>
        <div class="mission-number">
          Mission ${currentMission + 1} of ${missions.length}
        </div>
        <h2>${mission.title}</h2>
      </div>

      <div class="seal" aria-hidden="true">${mission.icon}</div>
    </div>

    <p class="mission-description">${mission.description}</p>

    <div class="prompt-box">
      <div class="prompt-label">Use this exact prompt</div>
      <p class="prompt-text">${mission.prompt}</p>
    </div>

    <section class="task-section" aria-labelledby="taskHeading">
      <h3 class="task-heading" id="taskHeading">Your mission</h3>
      <ol class="task-list">
        ${mission.tasks.map((task) => `<li>${task}</li>`).join("")}
      </ol>
    </section>

    <div class="notice">
      <span>
        Your prediction does not need to match ChatGPT. Record what happened
        in Google Classroom, then continue to the next mission.
      </span>
    </div>

    <div class="actions">
      <button
        class="button secondary"
        id="backButton"
        type="button"
        ${currentMission === 0 ? "disabled" : ""}
      >
        ← Previous mission
      </button>

      <button
        class="button primary"
        id="nextButton"
        type="button"
      >
        ${
          currentMission === missions.length - 1
            ? "Finish challenge ✦"
            : "Reveal next mission →"
        }
      </button>
    </div>
  `;

  document.getElementById("backButton").addEventListener("click", () => {
    if (currentMission === 0) return;

    currentMission -= 1;
    renderMission();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.getElementById("nextButton").addEventListener("click", () => {
    currentMission += 1;
    renderMission();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function renderFinishScreen() {
  missionCard.innerHTML = `
    <div class="finish">
      <div class="seal" aria-hidden="true">✨</div>

      <div class="mission-number">Challenge complete</div>
      <h2>You Escaped the AI Lab!</h2>

      <p class="mission-description">
        You have revealed all five missions. Make sure every response is
        complete before submitting your work.
      </p>

      <div class="classroom-box">
        <strong>Submit on Google Classroom</strong><br />
        Include your responses for all five missions, screenshots of your
        ChatGPT conversations, your ChatGPT share link, and your final
        reflection.
      </div>

      <div class="actions" style="justify-content: center;">
        <button
          class="button secondary"
          id="restartButton"
          type="button"
        >
          View missions again
        </button>
      </div>
    </div>
  `;

  document.getElementById("restartButton").addEventListener("click", () => {
    currentMission = 0;
    renderMission();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

renderMission();
