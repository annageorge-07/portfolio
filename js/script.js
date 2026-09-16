/* =========================================
   PROJECT DATA
   Cards are generated dynamically from this array.
========================================= */
/* =========================================
   PROJECT DATA
   All project cards are generated dynamically
   from this JavaScript array.
========================================= */

const projects = [

  {
    title: "ARIA — Adaptive Cyber Deception Platform",
    
    description:
      "A cybersecurity platform that combines SDN-based traffic monitoring, honeypot redirection, attack-intent classification and adaptive deception. The system uses RAG and LLM-based reasoning together with Cowrie honeypot events to analyse suspicious activity.",

    image: "images/project1.jpg",

    technologies: [
      "Python",
      "OS-Ken",
      "SDN",
      "OpenFlow",
      "Cowrie",
      "RAG",
      "LLM"
    ],

    category: "Cybersecurity",

    link: "[YOUR GITHUB URL]"
  },


  {
    title: "EduSync — AI-Powered Learning Platform",

    description:
      "A full-stack learning management system designed to support authentication, role-based access, classrooms, course materials, announcements, attendance, assignments and academic management, with an AI integration layer.",

    image: "images/project2.jpg",

    technologies: [
      "JavaScript",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "JWT",
      "OpenAI"
    ],

    category: "Full Stack",

    link: "[YOUR GITHUB URL]"
  },


  {
    title: "Multi-Model AQI Time-Series Forecasting Framework",

    description:
      "A machine-learning and time-series forecasting framework for predicting Air Quality Index values using and comparing multiple forecasting approaches.",

    image: "images/project3.jpg",

    technologies: [
      "Python",
      "SARIMA",
      "XGBoost",
      "LSTM",
      "Time Series",
      "Machine Learning"
    ],

    category: "AI / ML",

    link: "[YOUR GITHUB URL]"
  },


  {
    title: "Agile Blockchain-Based Clinical Data Integrity Network",

    description:
      "A blockchain-based system designed to improve the integrity and secure handling of clinical data using distributed ledger concepts and cryptographic hashing.",

    image: "images/project4.jpg",

    technologies: [
      "Hyperledger",
      "React",
      "MongoDB",
      "SHA-256",
      "Blockchain",
      "Agile"
    ],

    category: "Blockchain",

    link: "[YOUR GITHUB URL]"
  },


  {
    title: "KMRL Unstructured Data Extraction & Processing System",

    description:
      "A system for extracting and processing information from unstructured data using OCR and an LLM API, converting extracted information into structured JSON data.",

    image: "images/project5.jpg",

    technologies: [
      "Python",
      "Groq LLM API",
      "OCR",
      "JSON",
      "LLM"
    ],

    category: "AI / ML",

    link: "[YOUR GITHUB URL]"
  }

];

/* DOM references */
const projectsContainer = document.getElementById("projectsContainer");
const filterButtons = document.getElementById("filterButtons");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const contactForm = document.getElementById("contactForm");
const scrollTopButton = document.getElementById("scrollTop");

/* =========================================
   PROJECT DOM RENDERING
   map() creates each card and each tag.
========================================= */
const renderProjects = (projectList) => {
  if (!projectList.length) {
    projectsContainer.innerHTML = `<p class="no-projects">No projects found in this category.</p>`;
    return;
  }

  projectsContainer.innerHTML = projectList.map(({
    title, description, image, technologies, link
  }) => `
    <article class="project-card">
      <img class="project-image" src="${image}" alt="${title}" loading="lazy">
      <div class="project-content">
        <h3>${title}</h3>
        <p>${description}</p>
        <div class="project-tags">
          ${technologies.map(technology => `<span class="project-tag">${technology}</span>`).join("")}
        </div>
        <a class="project-link" href="${link}" target="_blank" rel="noopener noreferrer">
          View Project →
        </a>
      </div>
    </article>
  `).join("");
};

renderProjects(projects);

/* =========================================
   PROJECT FILTERING
   filter() selects projects by category.
========================================= */
const categories = ["all", ...new Set(projects.map(project => project.category))];

filterButtons.innerHTML = categories.map(category => `
  <button class="filter-btn ${category === "all" ? "active" : ""}" data-filter="${category}">
    ${category === "all" ? "All" : category}
  </button>
`).join("");

filterButtons.addEventListener("click", (event) => {
  const button = event.target.closest(".filter-btn");
  if (!button) return;

  document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
  button.classList.add("active");

  const selected = button.dataset.filter;
  const filtered = selected === "all"
    ? projects
    : projects.filter(project => project.category === selected);

  renderProjects(filtered);
});

/* =========================================
   MOBILE NAVIGATION
========================================= */
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

navLinks.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

/* =========================================
   DARK / LIGHT THEME + localStorage
   The saved preference survives page refreshes.
========================================= */
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");

  themeToggle.textContent = isDark ? "☀️" : "🌙";
});

/* =========================================
   CONTACT FORM VALIDATION
   Regular expressions validate name and email.
========================================= */
const nameRegex = /^[A-Za-zÀ-ÿ]+(?:[ '-][A-Za-zÀ-ÿ]+)*$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const showError = (input, errorElement, message) => {
  input.classList.add("invalid");
  errorElement.textContent = message;
};

const clearError = (input, errorElement) => {
  input.classList.remove("invalid");
  errorElement.textContent = "";
};

contactForm.addEventListener("submit", (event) => {
  /* Prevent page reload */
  event.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");
  const formSuccess = document.getElementById("formSuccess");

  clearError(name, nameError);
  clearError(email, emailError);
  clearError(message, messageError);
  formSuccess.textContent = "";

  let isValid = true;
  const nameValue = name.value.trim();
  const emailValue = email.value.trim();
  const messageValue = message.value.trim();

  if (!nameValue) {
    showError(name, nameError, "Please enter your name.");
    isValid = false;
  } else if (!nameRegex.test(nameValue)) {
    showError(name, nameError, "Please enter a valid name.");
    isValid = false;
  }

  if (!emailValue) {
    showError(email, emailError, "Please enter your email.");
    isValid = false;
  } else if (!emailRegex.test(emailValue)) {
    showError(email, emailError, "Please enter a valid email address.");
    isValid = false;
  }

  if (!messageValue) {
    showError(message, messageError, "Please enter a message.");
    isValid = false;
  } else if (messageValue.length < 10) {
    showError(message, messageError, "Message must contain at least 10 characters.");
    isValid = false;
  }

  if (isValid) {
    formSuccess.textContent = "Thank you! Your message has been validated successfully.";
    contactForm.reset();
  }
});

/* =========================================
   SCROLL TO TOP
========================================= */
window.addEventListener("scroll", () => {
  scrollTopButton.classList.toggle("visible", window.scrollY > 400);
});

scrollTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* Current year */
document.getElementById("currentYear").textContent = new Date().getFullYear();
