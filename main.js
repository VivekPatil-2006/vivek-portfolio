/**
 * VIVEK PATIL - PERSONAL PORTFOLIO INTERACTIVITY & FEATURES
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS Scroll Animations
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50
    });
  }

  // Navbar Scroll Background Change
  const navbar = document.querySelector('.navbar-custom');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // Mobile Nav Auto-Close on Link Click
  const navLinks = document.querySelectorAll('.nav-link-custom');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse?.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });

  // Active Section Observer for Nav Highlighting
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -65% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // Interactive Terminal Tab Switcher
  const terminalTabs = document.querySelectorAll('.terminal-tab-btn');
  const terminalPanes = document.querySelectorAll('.terminal-pane');

  terminalTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetPaneId = tab.getAttribute('data-tab');

      terminalTabs.forEach(t => t.classList.remove('active'));
      terminalPanes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPane = document.getElementById(targetPaneId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // Interactive Project Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn-custom');
  const projectCols = document.querySelectorAll('.project-col-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      projectCols.forEach(col => {
        const category = col.getAttribute('data-category');
        if (filterValue === 'all' || category?.includes(filterValue)) {
          col.style.display = 'block';
          col.style.opacity = '1';
        } else {
          col.style.display = 'none';
        }
      });
    });
  });

  // Dynamic Theme Accent Color Picker
  const themeDots = document.querySelectorAll('.theme-dot');
  themeDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const theme = dot.getAttribute('data-theme');
      if (theme === 'default') {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', theme);
      }
      showToast(`Accent theme set to ${theme.toUpperCase()}`, 'fa-solid fa-palette');
    });
  });

  // Back to Top Button Behavior
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Toast Notification helper
  window.showToast = function(message, iconClass = 'fa-solid fa-check-circle') {
    const toast = document.getElementById('toastNotification');
    const toastText = document.getElementById('toastText');
    const toastIcon = document.getElementById('toastIcon');

    if (toast && toastText && toastIcon) {
      toastText.textContent = message;
      toastIcon.className = iconClass;
      toast.classList.add('show');

      setTimeout(() => {
        toast.classList.remove('show');
      }, 3500);
    }
  };

  // Copy Email Functionality
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = copyEmailBtn.getAttribute('data-email') || 'vivekjpatil04@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied to clipboard!', 'fa-solid fa-copy');
      }).catch(() => {
        showToast(`Email: ${email}`, 'fa-solid fa-envelope');
      });
    });
  }

  // Project Details Modal Renderer with Direct GitHub Link Buttons
  window.openProjectModal = function(projectId) {
    const modalTitle = document.getElementById('projectModalTitle');
    const modalBody = document.getElementById('projectModalBody');
    const bsModal = new bootstrap.Modal(document.getElementById('projectModal'));

    const projectData = {
      'ospilot': {
        title: 'OSPilot (Offline AI Desktop Assistant)',
        date: 'May 2026 – Jun 2026',
        repoUrl: 'https://github.com/VivekPatil-2006/OSPilot',
        stack: ['Python', 'FastAPI', 'LangGraph', 'Ollama', 'FAISS', 'SQLite', 'Electron', 'Playwright', 'PyAutoGUI'],
        overview: 'Built a privacy-first offline AI desktop assistant combining Electron desktop UI and FastAPI backend, powered by local Ollama LLMs and a LangGraph multi-agent parallel execution pipeline.',
        highlights: [
          'Engineered a local RAG document retrieval engine using FAISS vector store and SQLite.',
          'Built parallel execution multi-agent workflows using LangGraph for system monitoring and automated task execution.',
          'Integrated desktop and web browser automation tools using Playwright and PyAutoGUI.',
          'Designed an offline coding assistant with zero external cloud dependencies.'
        ]
      },
      'ecovation': {
        title: 'EcoVation (Smart Waste Management System)',
        date: 'Aug 2025 – Sept 2025',
        repoUrl: 'https://github.com/VivekPatil-2006/SIH-Waste-Management',
        stack: ['Flutter', 'React', 'Node.js', 'Supabase', 'Android'],
        overview: 'A Smart India Hackathon (SIH) multi-role digital platform streamlining urban waste management by connecting Citizens, Waste Workers, Green Champions, ULB Operators, and State Analysts.',
        highlights: [
          'Developed cross-platform mobile app in Flutter and administrative dashboard in React.',
          'Implemented real-time waste pickup tracking, route optimization, and digital verification workflows.',
          'Designed a gamified Green Points engagement system and integrated a recycling marketplace powered by Supabase Realtime.'
        ]
      },
      'mentortrack': {
        title: 'MentorTrack (Academic Tracking Platform)',
        date: 'Jan 2025 – Mar 2025',
        repoUrl: 'https://github.com/VivekPatil-2006/MentorTrack-PBL',
        stack: ['Android', 'React', 'Node.js', 'Firebase', 'Java'],
        overview: 'A Project-Based Learning (PBL) role-based academic mentoring and tracking platform with dedicated portals for Admin, Technician, Teacher, and Student roles.',
        highlights: [
          'Implemented bulk student onboarding via CSV parsing, automated mentor allocation, and meeting scheduling.',
          'Developed real-time placement reporting, course analytics, and company tracking dashboards.',
          'Integrated AI-powered career growth insights to provide students with personalized skill improvement paths.'
        ]
      }
    };

    const data = projectData[projectId];
    if (data && modalTitle && modalBody) {
      modalTitle.textContent = data.title;
      modalBody.innerHTML = `
        <div class="d-flex align-items-center justify-content-between mb-3">
          <div class="font-mono text-cyan" style="font-size: 0.88rem;">${data.date}</div>
          <a href="${data.repoUrl}" target="_blank" class="btn-primary-custom py-1 px-3" style="font-size: 0.85rem;">
            <i class="fab fa-github"></i> View GitHub Repo
          </a>
        </div>
        <p class="text-secondary mb-4" style="font-size: 1rem; line-height: 1.6;">${data.overview}</p>
        <h5 class="h6 text-white mb-3"><i class="fa-solid fa-list-check me-2 text-info"></i> Key Engineering Highlights:</h5>
        <ul class="text-secondary mb-4" style="padding-left: 20px; font-size: 0.93rem; line-height: 1.7;">
          ${data.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
        <h5 class="h6 text-white mb-2"><i class="fa-solid fa-layer-group me-2 text-info"></i> Technologies & Libraries:</h5>
        <div class="d-flex flex-wrap gap-2">
          ${data.stack.map(s => `<span class="tech-tag-pill">${s}</span>`).join('')}
        </div>
      `;
      bsModal.show();
    }
  };

  // Contact Form Submission Handler (Zero Redirect / Zero Blank Page)
  const contactForm = document.getElementById('contactForm');
  const formSuccessBox = document.getElementById('formSuccessBox');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const name = document.getElementById('contactName')?.value.trim();
      const email = document.getElementById('contactEmail')?.value.trim();
      const subject = document.getElementById('contactSubject')?.value.trim() || 'Portfolio Inquiry';
      const message = document.getElementById('contactMessage')?.value.trim();

      if (!name || !email || !message) return;

      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Sending Message...`;

        try {
          // Attempt FormSubmit AJAX (Free background email delivery)
          const response = await fetch('https://formsubmit.co/ajax/vivekjpatil04@gmail.com', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              name: name,
              email: email,
              _subject: `[Portfolio Contact] ${subject}`,
              message: message,
              _template: 'table'
            })
          });

          const data = await response.json();

          if (response.ok || data.success === 'true' || data.success === true) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<i class="fa-solid fa-check"></i> Message Sent!`;
            showToast('Thank you! Your message has been sent to Vivek.', 'fa-solid fa-paper-plane');
            contactForm.reset();
            setTimeout(() => { submitBtn.innerHTML = originalText; }, 3500);
            return;
          }
        } catch (err) {
          console.log('Background AJAX failed, rendering in-page mail action...');
        }

        // Render clean in-page action box (NO BLANK/UNTITLED TAB EVER)
        const mailtoSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject}`);
        const mailtoBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        const mailtoUrl = `mailto:vivekjpatil04@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

        if (formSuccessBox) {
          formSuccessBox.innerHTML = `
            <div class="p-4 rounded-3 text-center mb-3" style="background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.3);">
              <h4 class="text-success h5 mb-2"><i class="fa-solid fa-paper-plane me-2"></i> Message Prepared!</h4>
              <p class="text-secondary small mb-3">Your message to Vivek Patil (vivekjpatil04@gmail.com) is ready.</p>
              <div class="d-flex justify-content-center gap-2 flex-wrap">
                <a href="${mailtoUrl}" class="btn-primary-custom text-decoration-none py-2 px-3" style="font-size: 0.88rem;">
                  <i class="fa-solid fa-envelope"></i> Send via Email App
                </a>
                <button type="button" class="btn-secondary-custom py-2 px-3" style="font-size: 0.88rem;" onclick="navigator.clipboard.writeText('vivekjpatil04@gmail.com'); showToast('Email copied to clipboard!');">
                  <i class="fa-solid fa-copy"></i> Copy Email Address
                </button>
              </div>
            </div>
          `;
          formSuccessBox.style.display = 'block';
        }

        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        showToast('Message formatted! Click below to send directly.', 'fa-solid fa-envelope-open-text');
        contactForm.reset();
      }
    });
  }
});
