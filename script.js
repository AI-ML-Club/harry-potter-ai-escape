const missions = [
  {
    title: "The Owl Arrives",
    icon: "🦉",
    description:
      "The story begins with very little context. Predict the next single token before asking ChatGPT.",
    prompt: "Harry Potter received a...",
    tasks: [
      "Predict the next single token.",
      "Ask ChatGPT the exact same prompt.",
      "Record ChatGPT's predicted token.",
      "Compare your prediction with ChatGPT's.",
    ],
  },
  {
    title: "The Letter",
    icon: "✉️",
    description: "One extra word changes what the AI expects next.",
    prompt: "Harry Potter received a mysterious...",
    tasks: [
      "Predict the next single token.",
      "Ask ChatGPT the exact same prompt.",
      "Record ChatGPT's predicted token.",
      "Explain how adding one word changed the prediction.",
    ],
  },
  {
    title: "The Invitation",
    icon: "⚡",
    description: "More context makes the next token even more predictable.",
    prompt: "Harry Potter received a mysterious letter...",
    tasks: [
      "Predict the next single token.",
      "Ask ChatGPT the exact same prompt.",
      "Record ChatGPT's predicted token.",
      "Explain why this prediction became more likely.",
    ],
  },
  {
    title: "The Journey Begins",
    icon: "🚂",
    description:
      "The sentence keeps growing. Notice how each additional word changes the AI's expectations.",
    prompt: "Harry Potter received a mysterious letter inviting...",
    tasks: [
      "Predict the next single token.",
      "Ask ChatGPT the exact same prompt.",
      "Record ChatGPT's predicted token.",
      "Explain how the context influenced ChatGPT.",
    ],
  },
  {
    title: "Human vs. AI",
    icon: "🧙",
    description:
      "Now compare how another human and ChatGPT continue the exact same story.",
    prompt: "Harry Potter received a mysterious letter inviting him...",
    tasks: [
      "Predict the next single token.",
      "Ask one friend or family member to predict the next token without AI.",
      "Ask ChatGPT the exact same prompt.",
      "Compare all three predictions and write a short reflection.",
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
  <div class="prompt-header">
    <div class="prompt-label">Use this exact prompt</div>

    <button
      class="copy-btn"
      id="copyPrompt"
      type="button"
    >
      📋 Copy Prompt
    </button>
  </div>

  <p class="prompt-text">${mission.prompt}</p>
</div>

    <section class="task-section" aria-labelledby="taskHeading">
      <h3 class="task-heading" id="taskHeading">Your mission</h3>
      <ol class="task-list">
        ${mission.tasks.map((task) => `<li>${task}</li>`).join("")}
      </ol>
    </section>

    <div class="checkpoint">
  <div class="checkpoint-heading">
    <span class="checkpoint-icon">🔐</span>
    <div>
      <h3>Mission Checkpoint</h3>
      <p>Complete these checks to unlock the next mission.</p>
    </div>
  </div>

  <label class="check-row">
    <input type="checkbox" class="mission-check" />
    <span>I predicted the next token before asking ChatGPT.</span>
  </label>

  <label class="check-row">
    <input type="checkbox" class="mission-check" />
    <span>I used the exact prompt shown above.</span>
  </label>

  <label class="token-check">
    <span>What single token did ChatGPT predict?</span>
    <input
      type="text"
      id="temporaryToken"
      maxlength="30"
      autocomplete="off"
      placeholder="Enter one token"
    />
    <small>This answer is not saved or submitted by this website.</small>
  </label>

  <label class="check-row">
    <input type="checkbox" class="mission-check" />
    <span>
      I recorded my work in my Google Doc or Word document under
      <strong>Mission #${currentMission + 1}</strong>.
    </span>
  </label>

  <p class="checkpoint-message" id="checkpointMessage">
    Finish all four checks to continue.
  </p>
</div>

<div class="notice">
  Your prediction does not need to match ChatGPT. Record what happened,
  complete the checkpoint, and then continue.
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
    disabled
  >
    ${
      currentMission === missions.length - 1
        ? "Finish challenge ✦"
        : "Unlock next mission →"
    }
  </button>
</div>
  `;

  const copyButton = document.getElementById("copyPrompt");

  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(mission.prompt);

      copyButton.innerHTML = "✅ Copied!";

      setTimeout(() => {
        copyButton.innerHTML = "📋 Copy Prompt";
      }, 1800);
    } catch {
      copyButton.innerHTML = "❌ Failed";

      setTimeout(() => {
        copyButton.innerHTML = "📋 Copy Prompt";
      }, 1800);
    }
  });

  const checkpointBoxes = [...document.querySelectorAll(".mission-check")];

  const temporaryToken = document.getElementById("temporaryToken");
  const nextButton = document.getElementById("nextButton");
  const checkpointMessage = document.getElementById("checkpointMessage");

  function validateCheckpoint() {
    const allChecked = checkpointBoxes.every((box) => box.checked);
    const tokenEntered = temporaryToken.value.trim().length > 0;
    const checkpointComplete = allChecked && tokenEntered;

    nextButton.disabled = !checkpointComplete;

    checkpointMessage.textContent = checkpointComplete
      ? "✓ Mission recorded. The next mission is unlocked."
      : "Finish all four checks to continue.";

    checkpointMessage.classList.toggle(
      "checkpoint-complete",
      checkpointComplete,
    );
  }

  checkpointBoxes.forEach((box) => {
    box.addEventListener("change", validateCheckpoint);
  });

  temporaryToken.addEventListener("input", validateCheckpoint);

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
