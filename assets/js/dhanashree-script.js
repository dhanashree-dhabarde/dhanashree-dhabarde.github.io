'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  if (modalContainer && overlay) {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    if (modalImg && modalTitle && modalText) {
      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

      testimonialsModalFunc();
    }
  });
}

// add click event to modal close button
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
}
if (overlay) {
  overlay.addEventListener("click", testimonialsModalFunc);
}

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) {
      selectValue.innerText = this.innerText;
    }
    if (select) {
      elementToggleFunc(select);
    }
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) {
      selectValue.innerText = this.innerText;
    }
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

// Initialize EmailJS
(function() {
  emailjs.init({
    publicKey: "5HhctUggGA6uCOPc6",
    privateKey: ""
  });
})();

// Handle contact form submission
const contactForm = document.querySelector("[data-form]");
if (contactForm) {
  contactForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Show sending state
    const formBtn = document.querySelector("[data-form-btn]");
    const originalBtnText = formBtn.innerHTML;
    formBtn.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon><span>Sending...</span>';
    formBtn.disabled = true;
    
    // Get form data
    const fullName = this.fullname.value;
    const email = this.email.value;
    const message = this.message.value;
    
    emailjs.send("service_9f455xo", "template_886zpyg", {
      from_name: fullName,
      from_email: email,
      message: message
    })
    .then(function() {
      // Show success message
      formBtn.innerHTML = '<ion-icon name="checkmark-outline"></ion-icon><span>Message Sent!</span>';
      
      // Reset form
      contactForm.reset();
      
      // Reset button after 3 seconds
      setTimeout(function() {
        formBtn.innerHTML = originalBtnText;
        formBtn.disabled = false;
      }, 3000);
    })
    .catch(function(error) {
      // Show error message
      formBtn.innerHTML = '<ion-icon name="alert-outline"></ion-icon><span>Failed to send</span>';
      console.error("Email sending failed:", error);
      
      // Reset button after 3 seconds
      setTimeout(function() {
        formBtn.innerHTML = originalBtnText;
        formBtn.disabled = false;
      }, 3000);
    });
  });
}

// Chatbot functionality for Dhanashree
class DhanashreeChatbot {
  constructor() {
    this.isOpen = false;
    this.knowledge = {
      personal: {
        name: "Dhanashree Dhabarde",
        title: "Web Developer",
        location: "Nagpur, Maharashtra, India",
        email: "dhanashreedhabarde2@gmail.com",
        phone: "+91 97651 09102",
        about: "I'm a skilled Web Developer with expertise in HTML, CSS, JavaScript, ReactJS, and Flask. I have experience in building real-time, data-driven applications and deploying scalable solutions with a focus on performance and user experience."
      },
      experience: [
        {
          role: "Android Developer",
          company: "IDEVIFY SOLUTION PVT LTD",
          period: "Feb 2024 — June 2024",
          description: "Worked on Android development projects using Android SDK, Android Studio, and Firebase. Gained experience in project management, structural analysis, and mobile app development with various technologies including AI, Blockchain, and database management systems."
        },
        {
          role: "Web Developer",
          company: "Freelance Projects",
          period: "2023 — Present",
          description: "Specialized in developing real-time, data-driven applications using HTML, CSS, JavaScript, ReactJS, and Flask. Focus on performance optimization and user experience enhancement."
        }
      ],
      skills: [
        "Java", "Python", "JavaScript", "HTML", "CSS", "ReactJS", "Flask",
        "Android SDK", "Android Studio", "Firebase", "Database Management Systems",
        "Artificial Intelligence", "Blockchain", "GPS Integration", "Git", "GitHub"
      ],
      projects: [
        {
          name: "Car Cleanse",
          category: "AI Applications",
          description: "AI-powered scheduling system that processed 1 million+ user requests with 94% accuracy and significantly improved service efficiency."
        },
        {
          name: "Voice-Based Email System",
          category: "AI Applications",
          description: "Accessibility solution for the visually impaired with 95% speech recognition accuracy and 100ms response time."
        },
        {
          name: "Road Travel Safety & Bump Detection",
          category: "AI Applications",
          description: "AI-powered road safety system with GPS integration for bump detection and travel safety enhancement."
        },
        {
          name: "GitHub Webhook Dashboard",
          category: "Web Development",
          description: "Real-time dashboard for monitoring GitHub webhooks and repository activities."
        }
      ],
      certifications: [
        "Python Certificate - Udemy",
        "AI Tools Certificate - BE10X",
        "Data Science Certificate - IBM Developer Skills Network",
        "Java Certification - Professional Certification"
      ],
      education: {
        degree: "Bachelor's Degree in Information Technology",
        university: "Priyadarshini College Of Engineering, Nagpur",
        period: "June 2021 — June 2024",
        score: "90%"
      }
    };
    
    this.commonQuestions = {
      greeting: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"],
      experience: ["experience", "work", "job", "career", "professional"],
      skills: ["skills", "technologies", "tech stack", "programming", "languages"],
      projects: ["projects", "work", "portfolio", "github"],
      education: ["education", "university", "college", "degree", "study"],
      contact: ["contact", "email", "phone", "reach", "hire"],
      achievements: ["achievements", "awards", "recognition", "certifications"],
      about: ["about", "who", "background", "story"]
    };
    
    this.init();
  }
  
  init() {
    this.createEventListeners();
  }
  
  createEventListeners() {
    const toggle = document.getElementById('chatbot-toggle');
    const close = document.getElementById('chatbot-close');
    const input = document.getElementById('chatbot-input');
    const send = document.getElementById('chatbot-send');
    
    toggle.addEventListener('click', () => this.toggleChatbot());
    close.addEventListener('click', () => this.closeChatbot());
    send.addEventListener('click', () => this.sendMessage());
    
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.sendMessage();
      }
    });
  }
  
  toggleChatbot() {
    const container = document.getElementById('chatbot-container');
    if (this.isOpen) {
      this.closeChatbot();
    } else {
      container.classList.add('active');
      this.isOpen = true;
      document.getElementById('chatbot-input').focus();
    }
  }
  
  closeChatbot() {
    const container = document.getElementById('chatbot-container');
    container.classList.remove('active');
    this.isOpen = false;
  }
  
  async sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    this.addMessage(message, 'user');
    input.value = '';
    
    this.showTypingIndicator();
    
    setTimeout(() => {
      this.hideTypingIndicator();
      const response = this.generateResponse(message);
      this.addMessage(response, 'bot');
    }, 1000 + Math.random() * 1000);
  }
  
  addMessage(content, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = content;
    
    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
  showTypingIndicator() {
    const messagesContainer = document.getElementById('chatbot-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message';
    typingDiv.id = 'typing-indicator';
    
    const typingContent = document.createElement('div');
    typingContent.className = 'typing-indicator';
    typingContent.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    
    typingDiv.appendChild(typingContent);
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
  hideTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
      indicator.remove();
    }
  }
  
  generateResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Greeting responses
    if (this.matchesKeywords(lowerMessage, this.commonQuestions.greeting)) {
      return `Hello! I'm here to help you learn about Dhanashree Dhabarde. You can ask me about her web development experience, AI projects, Android development skills, or anything else from her portfolio!`;
    }
    
    // Experience responses
    if (this.matchesKeywords(lowerMessage, this.commonQuestions.experience)) {
      return `Dhanashree is currently working as a Web Developer on freelance projects since 2023, specializing in real-time, data-driven applications using HTML, CSS, JavaScript, ReactJS, and Flask. She previously worked as an Android Developer at IDEVIFY SOLUTION PVT LTD from February to June 2024, gaining experience in project management and mobile app development.`;
    }
    
    // Skills responses
    if (this.matchesKeywords(lowerMessage, this.commonQuestions.skills)) {
      return `Dhanashree's technical skills include: Java, Python, JavaScript, HTML, CSS, ReactJS, Flask, Android SDK, Android Studio, Firebase, and more. She specializes in web development, mobile app development, AI applications, and database management systems.`;
    }
    
    // Projects responses
    if (this.matchesKeywords(lowerMessage, this.commonQuestions.projects)) {
      return `Dhanashree has worked on several exciting projects including: Car Cleanse (AI-powered scheduling system), Voice-Based Email System (accessibility solution for visually impaired), Road Travel Safety & Bump Detection (AI safety system), and GitHub Webhook Dashboard (real-time monitoring). Her projects span AI applications, web development, and mobile apps.`;
    }
    
    // Education responses
    if (this.matchesKeywords(lowerMessage, this.commonQuestions.education)) {
      return `Dhanashree graduated with a Bachelor's Degree in Information Technology from Priyadarshini College Of Engineering, Nagpur (June 2021 — June 2024) with a score of 90%. She also completed her Diploma in Computer Engineering from G H Raisoni Polytechnic, Nagpur with 86% score.`;
    }
    
    // Contact responses
    if (this.matchesKeywords(lowerMessage, this.commonQuestions.contact)) {
      return `You can reach Dhanashree at ${this.knowledge.personal.email} or call her at ${this.knowledge.personal.phone}. She's based in ${this.knowledge.personal.location}. Feel free to use the contact form on this website too!`;
    }
    
    // Certifications responses
    if (this.matchesKeywords(lowerMessage, this.commonQuestions.achievements)) {
      return `Dhanashree holds several certifications: ${this.knowledge.certifications.join(', ')}. These certifications demonstrate her expertise in Python programming, AI tools, data science, and Java development.`;
    }
    
    // About responses
    if (this.matchesKeywords(lowerMessage, this.commonQuestions.about)) {
      return this.knowledge.personal.about + " She's passionate about creating innovative, responsive, and user-friendly applications that solve real-world problems through technology.";
    }
    
    // Specific project queries
    if (lowerMessage.includes('car cleanse') || lowerMessage.includes('ai scheduling')) {
      return "Car Cleanse is an AI-powered scheduling system that Dhanashree developed. It processed over 1 million user requests with 94% accuracy and significantly improved service efficiency. This project demonstrates her expertise in AI applications and system optimization.";
    }
    
    if (lowerMessage.includes('voice email') || lowerMessage.includes('accessibility')) {
      return "The Voice-Based Email System is an accessibility solution that Dhanashree created for visually impaired users. It achieves 95% speech recognition accuracy with 100ms response time, significantly enhancing accessibility and showing her commitment to inclusive technology solutions.";
    }
    
    if (lowerMessage.includes('android') || lowerMessage.includes('mobile')) {
      return "Dhanashree worked as an Android Developer at IDEVIFY SOLUTION, where she used Android SDK, Android Studio, and Firebase. She gained experience in project management, structural analysis, and mobile app development with AI, Blockchain, and database technologies.";
    }
    
    // Fallback responses
    const fallbacks = [
      "That's an interesting question! You can ask me about Dhanashree's web development experience, AI projects, Android development skills, certifications, or anything else from her portfolio. What would you like to know?",
      "I'd be happy to help! Try asking about her work on AI applications like Car Cleanse, her web development projects, or her Android development experience.",
      "Feel free to ask me about Dhanashree's professional background, her work in web development and AI, or any specific projects you're curious about!",
      "I can tell you about Dhanashree's career in web development, her AI projects, her Android development work, or her technical expertise. What interests you most?"
    ];
    
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }
  
  matchesKeywords(message, keywords) {
    return keywords.some(keyword => message.includes(keyword));
  }
}

// Theme toggle functionality
class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'dark';
    this.init();
  }

  init() {
    this.setTheme(this.currentTheme);
    this.setupEventListeners();
  }

  setupEventListeners() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
    
    // Update toggle button state
    this.updateToggleButton();
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  updateToggleButton() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.setAttribute('title', 
        this.currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      );
    }
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize theme manager
  new ThemeManager();
  
  // Initialize chatbot
  new DhanashreeChatbot();
  
  // Animate elements when they come into view
  const animateOnScroll = function() {
    const animatableElements = document.querySelectorAll(".service-item, .project-item.active, .testimonials-item, .timeline-item");
    
    animatableElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("animate");
      }
    });
  };
  
  // Run animation check on load and scroll
  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll();
});

// Add hover effects for service items
const serviceItems = document.querySelectorAll('.service-item');
serviceItems.forEach(item => {
  item.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px)';
    this.style.transition = 'transform 0.3s ease-in-out';
  });
  
  item.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// Add typing effect to name heading
const nameElement = document.querySelector('.sidebar-info .name');
if (nameElement) {
  const text = nameElement.textContent;
  nameElement.textContent = '';
  
  let i = 0;
  const typeWriter = function() {
    if (i < text.length) {
      nameElement.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };
  
  // Start typing effect when sidebar is visible
  setTimeout(typeWriter, 500);
}
