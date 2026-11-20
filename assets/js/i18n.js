const languageToggle = document.querySelector('#language-toggle');
const englishCopy = {
  'title': 'Matías Ramírez Torres | Software Support and Data Analysis',
  'meta': 'Portfolio of Matías Ramírez Torres: Software Development student in Bogotá, interested in software support, help desk and data analysis.',
  'skip': 'Skip to content',
  'nav-aria': 'Main navigation',
  'nav-profile': 'Profile', 'nav-project': 'Project', 'nav-skills': 'Skills', 'nav-education': 'Education', 'nav-certifications': 'Certifications', 'nav-contact': 'Contact',
  'toggle-aria': 'Switch to Spanish',
  'hero-context': 'Bogotá, Colombia <span aria-hidden="true">/</span> Available for rotating shifts',
  'hero-description': 'I understand problems.<br>I find signals in data.',
  'hero-summary': 'I am preparing to grow in software support and data analysis. I bring experience helping people, recording information accurately, and training in databases and SQL.',
  'hero-project': 'Explore featured project', 'hero-contact': 'Contact me',
  'helmet-aria': 'Halo armored character rendered as a red 3D particle cloud',
  'helmet-canvas-aria': 'Armored character from helmet to torso, rendered as red particles',
  'profile-kicker': 'PROFILE', 'profile-heading': 'Thoughtful support.<br>Technical precision.',
  'profile-p1': 'I enjoy helping people solve software issues. I bring customer service experience, careful information handling and problem solving in high-demand environments, together with training in databases and SQL.',
  'profile-p2': 'I am looking for an opportunity to record, analyze and follow incidents through resolution, following service procedures.',
  'profile-p3': 'I live in Bogotá, Colombia, and am available for rotating shifts.',
  'profile-project': 'See the NeuroLearn project', 'profile-contact': 'Contact me',
  'project-kicker': 'FEATURED PROJECT', 'project-meta': 'GRADUATION PROJECT · 2026', 'project-country': 'Colombia', 'project-pwa': 'Installable web application', 'project-repo': 'View repository ↗',
  'project-title': 'Learning that adapts to each student.',
  'project-copy': 'NeuroLearn IA is an educational platform that supports preparation for Colombia’s Saber 11 exam. It includes an AI tutor that adapts its teaching to each student, along with tools for teachers to track classes and assessments.',
  'project-feature-1': 'AI tutor for five Saber 11 subject areas.', 'project-feature-2': 'Assessments, NeuroBots and progress tracking.', 'project-feature-3': 'Separate dashboards for students and teachers.',
  'project-contribution': 'Team graduation project. The project scope document lists Matías Ramírez Torres as a co-author.', 'project-tech-aria': 'Project technologies',
  'skills-kicker': 'CAPABILITIES', 'skills-heading': 'Tools for solving problems.',
  'skill-db': 'Databases and programming', 'skill-db-1': 'Training in MySQL and CRUD operations: creating, reading, updating and deleting data.', 'skill-db-2': 'General database knowledge.', 'skill-db-3': 'Programming fundamentals and logic.',
  'skill-tools': 'Tools and information management', 'skill-tools-1': 'Recording and tracking requests in specialized software.', 'skill-tools-2': 'Advanced Microsoft Office skills.', 'skill-tools-3': 'Experience with Google Drive, Microsoft Teams, Zoom and Google Meet.', 'skill-tools-4': 'Fast, accurate typing and digital information management.',
  'skill-service': 'Customer service and collaboration', 'skill-service-1': 'Service orientation, effective communication and empathy.', 'skill-service-2': 'Problem solving and handling challenging situations.', 'skill-service-3': 'Organization, accountability and initiative.', 'skill-service-4': 'Teamwork, adaptability and punctuality.', 'skill-languages': 'Languages', 'skill-language-copy': 'Basic English for work settings; English Do Works Beginner 1 and 2.',
  'education-kicker': 'LEARNING', 'education-heading': 'Education', 'education-degree': 'Software Development Technology', 'education-university': 'Universidad Agustiniana', 'education-current': 'Since 2024. In progress.', 'education-school': 'High school diploma', 'education-school-name': 'Colegio Nuestra Señora del Loreto', 'education-years': '2018 to 2023.',
  'cert-kicker': 'ADDITIONAL TRAINING', 'cert-heading': 'Foundations for continued growth.', 'cert-intro': 'Additional training completed through SENA:', 'cert-db': 'MySQL Database Development', 'cert-db-copy': 'MySQL and CRUD operations.', 'cert-db-general': 'Database Fundamentals', 'cert-db-general-copy': 'Applied database concepts.', 'cert-security': 'Cybersecurity Basics', 'cert-security-copy': 'Introductory cybersecurity training with Netacad.', 'cert-english': 'English Do Works Beginner 1 and 2', 'cert-english-copy': 'Basic English communication for work.', 'cert-innovative': 'Innovative Entrepreneurship', 'cert-innovative-copy': 'Applying technology ideas to solve problems.', 'cert-entrepreneur': 'Entrepreneurial Mindset', 'cert-entrepreneur-copy': 'Creative thinking and personal initiative.',
  'contact-kicker': 'CONTACT', 'contact-heading': 'Let’s talk.', 'contact-copy': 'I am interested in opportunities in software support, help desk and data analysis.', 'availability': 'Bogotá, Colombia <span aria-hidden="true">·</span> Available for rotating shifts', 'contact-methods-aria': 'Contact methods', 'email-label': 'Direct email', 'github-label': 'GitHub',
  'footer-back': 'Back to top ↑',
};
const selectors = {
  title: ['title'], meta: ['meta[name="description"]'], skip: ['.skip-link'], 'nav-aria': ['#menu-principal'],
  'nav-profile': ['#menu-principal a[href="#perfil"]'], 'nav-project': ['#menu-principal a[href="#proyecto"]'], 'nav-skills': ['#menu-principal a[href="#conocimientos"]'], 'nav-education': ['#menu-principal a[href="#formacion"]'], 'nav-certifications': ['#menu-principal a[href="#certificaciones"]'], 'nav-contact': ['#menu-principal a[href="#contacto"]'],
  'hero-context': ['.hero-context'], 'hero-description': ['.hero-description'], 'hero-summary': ['.hero-summary'], 'hero-project': ['.hero-actions a:first-child'], 'hero-contact': ['.hero-actions a:last-child'],
  'helmet-aria': ['.helmet-stage'], 'helmet-canvas-aria': ['.helmet-cloud'],
  'profile-kicker': ['.profile-details .section-kicker'], 'profile-heading': ['.profile-details h2'], 'profile-p1': ['.profile-copy p:nth-child(1)'], 'profile-p2': ['.profile-copy p:nth-child(2)'], 'profile-p3': ['.profile-copy p:nth-child(3)'], 'profile-project': ['.profile-copy a[href="#proyecto"]'], 'profile-contact': ['.profile-copy a[href="#contacto"]'],
  'project-kicker': ['#proyecto > .section-heading .section-kicker'], 'project-meta': ['.experience-meta .section-kicker'], 'project-country': ['.experience-meta p:nth-child(2)'], 'project-pwa': ['.experience-meta p:nth-child(3)'], 'project-repo': ['.project-link'], 'project-title': ['#titulo-neurolearn'], 'project-copy': ['#titulo-neurolearn + p'], 'project-feature-1': ['.project-highlights > div:nth-child(1) p'], 'project-feature-2': ['.project-highlights > div:nth-child(2) p'], 'project-feature-3': ['.project-highlights > div:nth-child(3) p'], 'project-contribution': ['.project-contribution'], 'project-tech-aria': ['.project-stack'],
  'skills-kicker': ['#conocimientos .section-kicker'], 'skills-heading': ['#titulo-conocimientos'], 'skill-db': ['.skill-card:nth-child(1) h3'], 'skill-db-1': ['.skill-card:nth-child(1) li:nth-child(1)'], 'skill-db-2': ['.skill-card:nth-child(1) li:nth-child(2)'], 'skill-db-3': ['.skill-card:nth-child(1) li:nth-child(3)'], 'skill-tools': ['.skill-card:nth-child(2) h3'], 'skill-tools-1': ['.skill-card:nth-child(2) li:nth-child(1)'], 'skill-tools-2': ['.skill-card:nth-child(2) li:nth-child(2)'], 'skill-tools-3': ['.skill-card:nth-child(2) li:nth-child(3)'], 'skill-tools-4': ['.skill-card:nth-child(2) li:nth-child(4)'], 'skill-service': ['.skill-card:nth-child(3) h3'], 'skill-service-1': ['.skill-card:nth-child(3) li:nth-child(1)'], 'skill-service-2': ['.skill-card:nth-child(3) li:nth-child(2)'], 'skill-service-3': ['.skill-card:nth-child(3) li:nth-child(3)'], 'skill-service-4': ['.skill-card:nth-child(3) li:nth-child(4)'], 'skill-languages': ['.skill-card:nth-child(4) h3'], 'skill-language-copy': ['.skill-card:nth-child(4) > p'],
  'education-kicker': ['#formacion .section-kicker'], 'education-heading': ['#titulo-formacion'], 'education-degree': ['#titulo-tecnologia'], 'education-university': ['#titulo-tecnologia + p'], 'education-current': ['#titulo-tecnologia + p + p'], 'education-school': ['#titulo-bachillerato'], 'education-school-name': ['#titulo-bachillerato + p'], 'education-years': ['#titulo-bachillerato + p + p'],
  'cert-kicker': ['#certificaciones .section-kicker'], 'cert-heading': ['#titulo-certificaciones'], 'cert-intro': ['.certification-intro'], 'cert-db': ['.certification-card:nth-of-type(1) dt'], 'cert-db-copy': ['.certification-card:nth-of-type(1) dd'], 'cert-db-general': ['.certification-card:nth-of-type(2) dt'], 'cert-db-general-copy': ['.certification-card:nth-of-type(2) dd'], 'cert-security': ['.certification-card:nth-of-type(3) dt'], 'cert-security-copy': ['.certification-card:nth-of-type(3) dd'], 'cert-english': ['.certification-card:nth-of-type(4) dt'], 'cert-english-copy': ['.certification-card:nth-of-type(4) dd'], 'cert-innovative': ['.certification-card:nth-of-type(5) dt'], 'cert-innovative-copy': ['.certification-card:nth-of-type(5) dd'], 'cert-entrepreneur': ['.certification-card:nth-of-type(6) dt'], 'cert-entrepreneur-copy': ['.certification-card:nth-of-type(6) dd'],
  'contact-kicker': ['#contacto .section-kicker'], 'contact-heading': ['#titulo-contacto'], 'contact-copy': ['.contact-intro > p:first-child'], availability: ['.contact-location'], 'contact-methods-aria': ['.contact-methods'], 'email-label': ['.contact-method:first-child .contact-label'], 'github-label': ['.contact-method:last-child .contact-label'], 'footer-back': ['footer a[href="#perfil"]'],
};
const originalValues = new Map();
let originalsCaptured = false;

function setLanguage(language) {
  const english = language === 'en';
  if (!originalsCaptured) {
    for (const [key, paths] of Object.entries(selectors)) {
      for (const path of paths) {
        const element = document.querySelector(path);
        if (!element) continue;
        originalValues.set(`${key}:${path}`, key.endsWith('-aria') || key === 'nav-aria' ? element.getAttribute('aria-label') : key === 'meta' ? element.content : element.innerHTML);
      }
    }
    originalsCaptured = true;
  }
  document.documentElement.lang = language;
  for (const [key, paths] of Object.entries(selectors)) {
    for (const path of paths) {
      const element = document.querySelector(path);
      if (!element) continue;
      const value = english ? englishCopy[key] : originalValues.get(`${key}:${path}`);
      if (value === undefined || value === null) continue;
      if (key.endsWith('-aria') || key === 'nav-aria') element.setAttribute('aria-label', value);
      else if (key === 'meta') element.content = value;
      else element.innerHTML = value;
    }
  }
  const toggle = document.querySelector('#language-toggle');
  toggle.textContent = english ? 'ES' : 'EN';
  toggle.setAttribute('aria-label', english ? englishCopy['toggle-aria'] : 'Cambiar a inglés');
  toggle.setAttribute('aria-pressed', String(english));
  window.dispatchEvent(new Event('portfolio-language-change'));
}

const savedLanguage = localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'es';
setLanguage(savedLanguage);
languageToggle.addEventListener('click', () => {
  const next = document.documentElement.lang === 'en' ? 'es' : 'en';
  localStorage.setItem('portfolio-language', next);
  setLanguage(next);
});
