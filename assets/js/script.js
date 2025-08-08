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
  // Replace with your EmailJS user ID
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

document.addEventListener("DOMContentLoaded", function() {
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

// Chatbot functionality
class PortfolioChatbot {
  constructor() {
    this.isOpen = false;
    this.knowledge = {
      personal: {
        name: "Vishnu Thandel",
        title: "Cybersecurity Professional",
        location: "Nagpur, Maharashtra, India",
        email: "vishnubijuthandel@gmail.com",
        phone: "+91 9422786557",
        about: "I'm a cybersecurity professional with expertise in penetration testing, SaaS/DaaS security, and AI-based security tool development. I specialize in identifying and mitigating vulnerabilities across cloud platforms and virtual desktop environments."
      },
      experience: [
        {
          role: "Freelance AI Developer",
          company: "Self-Employed",
          period: "Dec 2024 - Present",
          description: "Designing and integrating AI modules for patient data handling and workflow automation. Building scalable backend solutions using Python, Flask, and RESTful APIs."
        },
        {
          role: "CGI VFX Artist",
          company: "Enoylity Media Creation",
          period: "Dec 2024 - Present",
          description: "Creating high-quality CGI and VFX to enhance storytelling across media platforms. Utilizing Python scripting to streamline workflows and automate tasks."
        },
        {
          role: "3D Artist",
          company: "IDEVIFY Solutions Pvt Ltd",
          period: "Jan 2024 - Dec 2024",
          description: "Coordinated project tasks in web development and 3D animation with meticulous attention to detail."
        }
      ],
      skills: [
        "Golang", "Python", "GraphQL", "AWS", "Docker", "JavaScript", 
        "React", "Node.js", "MongoDB", "PostgreSQL", "Redis", "Kubernetes",
        "Microservices", "System Design", "Machine Learning", "Data Science"
      ],
      projects: [
        {
          name: "Violence Detection System",
          category: "Data Science",
          description: "AI-powered system for detecting violence in video feeds using machine learning"
        },
        {
          name: "NASA Space Challenge 2024",
          category: "Web Development",
          description: "Global nominee project for NASA Space Apps Challenge"
        },
        {
          name: "Sorting Visualizer",
          category: "Web Development",
          description: "Interactive visualization of various sorting algorithms"
        },
        {
          name: "Smart Resume Filter",
          category: "Data Science",
          description: "ML-powered resume screening and filtering system"
        }
      ],
      achievements: [
        "Winner, PICT Concepts Hackathon 2025",
        "Global Nominee, NASA Space App Challenge 2024",
        "Qualified GATE 2024",
        "Finalist, Kavach Hackathon 2023"
      ],
      education: {
        degree: "Bachelor of Engineering in Information Technology",
        university: "Pune University",
        period: "2021 — 2025",
        cgpa: "8.72 / 10"
      }
    };
    
    this.commonQuestions = {
      greeting: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"],
      experience: ["experience", "work", "job", "career", "professional"],
      skills: ["skills", "technologies", "tech stack", "programming", "languages"],
      projects: ["projects", "work", "portfolio", "github"],
      education: ["education", "university", "college", "degree", "study"],
      contact: ["contact", "email", "phone", "reach", "hire"],
      achievements: ["achievements", "awards", "recognition", "hackathon"],
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
      return `Hello! I'm here to help you learn about Vishnu Thandel. You can ask me about his cybersecurity expertise, AI projects, VFX work, certifications, or anything else from his portfolio!`;
    }
    
    // Experience responses
    if (this.matchesKeywords(lowerMessage, this.commonQuestions.experience)) {
      return `Vishnu is currently working as a Freelance AI Developer and CGI VFX Artist. He's designing AI modules for healthcare automation, building scalable backend solutions with Python and Flask, and creating high-quality CGI/VFX content. Previously, he worked as a 3D Artist at IDEVIFY Solutions.`;
    }
    
    // Skills responses
    if (this.matchesKeywords(lowerMessage, this.commonQuestions.skills)) {
      return `Vishnu's technical skills include: Python, Flask, C#, Java, Bash Scripting, React.js, penetration testing, VAPT, SaaS/DaaS security, and more. He specializes in cybersecurity, AI development, and VFX automation with Python scripting.`;
    }
    
    // Projects responses
    if (this.matchesKeywords(lowerMessage, this.commonQuestions.projects)) {
      return `Vishnu has worked on several exciting projects including: Tech Genie AI Chatbot, Brute Ninja URL Brute Force Tool, Healthcare AI Automation, VAPT Security Framework, VFX Automation Scripts, and Patient Data AI Module. His projects span cybersecurity tools, AI development, and Python applications.`;
    }
    
    // Education responses
    if (this.matchesKeywords(lowerMessage, this.commonQuestions.education)) {
      return `Vishnu graduated with a B. Tech in Information Technology from Priyadarshini College of Engineering, Hingna (2020-2024) with a CGPA of 8.11/10. He also completed HSC Science from Santaji Mahavidyala, Nagpur.`;
    }
    
    // Contact responses
    if (this.matchesKeywords(lowerMessage, this.commonQuestions.contact)) {
      return `You can reach Vishnu at ${this.knowledge.personal.email} or call him at ${this.knowledge.personal.phone}. He's based in ${this.knowledge.personal.location}. Feel free to use the contact form on this website too!`;
    }
    
    // Achievements responses
    if (this.matchesKeywords(lowerMessage, this.commonQuestions.achievements)) {
      return `Vishnu holds several professional certifications including: Certified AppSec Practitioner (SecOps Group), Ethical Hacking Essentials (EC-Council), Cloud Computing & Cybersecurity Fundamentals, IP Addressing and Subnetting, Data Visualization (TATA), and Oracle Cloud Infrastructure.`;
    }
    
    // About responses
    if (this.matchesKeywords(lowerMessage, this.commonQuestions.about)) {
      return this.knowledge.personal.about + " He combines cybersecurity expertise with creative technology to deliver innovative solutions that prioritize both functionality and security.";
    }
    
    // Specific project queries
    if (lowerMessage.includes('tech genie') || lowerMessage.includes('chatbot')) {
      return "The Tech Genie AI Chatbot is an AI-powered conversational interface that demonstrates Vishnu's expertise in AI development and natural language processing.";
    }
    
    if (lowerMessage.includes('brute ninja') || lowerMessage.includes('cybersecurity')) {
      return "Brute Ninja is a URL brute force tool that showcases Vishnu's cybersecurity skills and his ability to develop penetration testing tools for security assessments.";
    }
    
    // Current role specific
    if (lowerMessage.includes('ai developer') || lowerMessage.includes('current')) {
      return "As a Freelance AI Developer, Vishnu designs and integrates AI modules for patient data handling and workflow automation. He also works as a CGI VFX Artist, creating high-quality visual effects enhanced with Python automation workflows.";
    }
    
    // Fallback responses
    const fallbacks = [
      "That's an interesting question! You can ask me about Vishnu's cybersecurity expertise, AI projects, VFX work, certifications, or anything else from his portfolio. What would you like to know?",
      "I'd be happy to help! Try asking about his current roles as an AI Developer and VFX Artist, his cybersecurity skills, or his technical projects.",
      "Feel free to ask me about Vishnu's professional background, his work in cybersecurity and AI, or any specific projects you're curious about!",
      "I can tell you about Vishnu's career in cybersecurity, his AI development work, his VFX projects, or his technical expertise. What interests you most?"
    ];
    
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }
  
  matchesKeywords(message, keywords) {
    return keywords.some(keyword => message.includes(keyword));
  }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize chatbot
  new PortfolioChatbot();
});

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

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize theme manager
  new ThemeManager();
  
  // Initialize chatbot
  new PortfolioChatbot();
  
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
// const serviceItems = document.querySelectorAll('.service-item');
// serviceItems.forEach(item => {
//   item.addEventListener('mouseenter', function() {
//     this.style.transform = 'translateY(-10px)';
//     this.style.transition = 'transform 0.3s ease-in-out';
//   });
  
//   item.addEventListener('mouseleave', function() {
//     this.style.transform = 'translateY(0)';
//   });
// });

// // Add typing effect to name heading
// const nameElement = document.querySelector('.sidebar-info .name');
// if (nameElement) {
//   const text = nameElement.textContent;
//   nameElement.textContent = '';
  
//   let i = 0;
//   const typeWriter = function() {
//     if (i < text.length) {
//       nameElement.textContent += text.charAt(i);
//       i++;
//       setTimeout(typeWriter, 100);
//     }
//   };
  
//   // Start typing effect when sidebar is visible
//   setTimeout(typeWriter, 500);
// }