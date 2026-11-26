const languageToggle = document.querySelector('#language-toggle');
const englishCopy = {
  'title': 'Matías Ramírez Torres | Databases and Data Analysis',
  'meta': 'Professional portfolio of Matías Ramírez Torres in Bogotá. Training in MySQL, data management and analysis, with an interest in backend development.',
  'skip': 'Skip to content',
  'nav-aria': 'Main navigation',
  'nav-profile': 'Profile', 'nav-project': 'Project', 'nav-skills': 'Skills', 'nav-education': 'Education', 'nav-contact': 'Contact',
  'toggle-aria': 'Switch to Spanish',
  'hero-context': 'Bogotá, Colombia <span aria-hidden="true">/</span> Available for rotating shifts',
  'hero-description': 'Databases, data management<br>and analysis.',
  'hero-summary': 'I use SQL to organize and query data. I study software development and am learning how to connect databases to the features people use in an application.',
  'hero-project': 'Explore featured project', 'hero-contact': 'Contact me',
  'helmet-aria': 'Halo armored character rendered as a red 3D particle cloud',
  'helmet-canvas-aria': 'Armored character from helmet to torso, rendered as red particles',
  'profile-kicker': 'PROFILE', 'profile-heading': 'From records to analysis.',
  'profile-p1': 'My professional focus is data management and analysis. Keeping records taught me to pay attention to accuracy. With MySQL, I can organize records, relate tables and write queries to answer questions about the data.',
  'profile-p2': 'I am also learning backend development. I am interested in the logic behind a feature: what data it needs, how to validate it and which business rules an operation must meet before it is saved.',
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
  'skill-service': 'Customer service and collaboration', 'skill-service-1': 'Service orientation, effective communication and empathy.', 'skill-service-2': 'Problem solving and handling challenging situations.', 'skill-service-3': 'Organization, accountability and initiative.', 'skill-service-4': 'Teamwork, adaptability and punctuality.', 'skill-languages': 'Languages', 'skill-language-copy': 'B2 English on the EF SET (53/100 in reading and listening).',
  'education-kicker': 'EDUCATION', 'education-heading': 'Studies and courses', 'degree-heading': 'Academic education', 'education-degree': 'Software Development Technology', 'education-university': 'Universidad Agustiniana', 'education-current': 'Since <time datetime="2024">2024</time> · In progress', 'education-school': 'High school diploma', 'education-school-name': 'Colegio Nuestra Señora del Loreto',
  'cert-heading': 'Courses and certifications',
  'cert-mysql': 'Building databases with MySQL', 'cert-mysql-copy': 'SENA · 48 hours · 2026',
  'cert-general': 'Database fundamentals and management systems', 'cert-general-copy': 'SENA · 40 hours · 2026',
  'cert-security': 'Cybersecurity Basics', 'cert-security-copy': 'Introductory cybersecurity training with Netacad.',
  'cert-beginner': 'English Dot Works Beginner', 'cert-beginner-copy': 'SENA · 60 hours · 2022',
  'cert-english1': 'English Dot Works 1', 'cert-english1-copy': 'SENA · 60 hours · 2022',
  'cert-ef': 'EF SET · B2 English', 'cert-ef-copy': 'EF SET · 53/100 in reading and listening · 2025',
  'cert-innovation': 'Innovative Entrepreneurship', 'cert-innovation-copy': 'SENA · 40 hours · 2022',
  'cert-business': 'Entrepreneurial Mindset', 'cert-business-copy': 'SENA · 48 hours · 2023',
  'contact-kicker': 'CONTACT', 'contact-heading': 'Let’s talk.', 'contact-copy': 'I am looking for opportunities in databases, information management and data analysis. I am also interested in projects where I can continue learning backend development.', 'availability': 'Bogotá, Colombia <span aria-hidden="true">·</span> Available for rotating shifts', 'contact-methods-aria': 'Contact methods', 'email-label': 'Direct email', 'github-label': 'GitHub',
  'footer-back': 'Back to top ↑',
};
const selectors = {
  title: ['title'], meta: ['meta[name="description"]'], skip: ['.skip-link'], 'nav-aria': ['#menu-principal'],
  'nav-profile': ['#menu-principal a[href="#perfil"]'], 'nav-project': ['#menu-principal a[href="#proyecto"]'], 'nav-skills': ['#menu-principal a[href="#conocimientos"]'], 'nav-education': ['#menu-principal a[href="#formacion"]'], 'nav-contact': ['#menu-principal a[href="#contacto"]'],
  'hero-context': ['.hero-context'], 'hero-description': ['.hero-description'], 'hero-summary': ['.hero-summary'], 'hero-project': ['.hero-actions a:first-child'], 'hero-contact': ['.hero-actions a:last-child'],
  'helmet-aria': ['.helmet-stage'], 'helmet-canvas-aria': ['.helmet-cloud'],
  'profile-kicker': ['.profile-details .section-kicker'], 'profile-heading': ['.profile-details h2'], 'profile-p1': ['.profile-copy p:nth-child(1)'], 'profile-p2': ['.profile-copy p:nth-child(2)'], 'profile-p3': ['.profile-copy p:nth-child(3)'], 'profile-project': ['.profile-copy a[href="#proyecto"]'], 'profile-contact': ['.profile-copy a[href="#contacto"]'],
  'project-kicker': ['#proyecto > .section-heading .section-kicker'], 'project-meta': ['.experience-meta .section-kicker'], 'project-country': ['.experience-meta p:nth-child(2)'], 'project-pwa': ['.experience-meta p:nth-child(3)'], 'project-repo': ['.project-link'], 'project-title': ['#titulo-neurolearn'], 'project-copy': ['#titulo-neurolearn + p'], 'project-feature-1': ['.project-highlights > div:nth-child(1) p'], 'project-feature-2': ['.project-highlights > div:nth-child(2) p'], 'project-feature-3': ['.project-highlights > div:nth-child(3) p'], 'project-contribution': ['.project-contribution'], 'project-tech-aria': ['.project-stack'],
  'skills-kicker': ['#conocimientos .section-kicker'], 'skills-heading': ['#titulo-conocimientos'], 'skill-db': ['.skill-card:nth-child(1) h3'], 'skill-db-1': ['.skill-card:nth-child(1) li:nth-child(1)'], 'skill-db-2': ['.skill-card:nth-child(1) li:nth-child(2)'], 'skill-db-3': ['.skill-card:nth-child(1) li:nth-child(3)'], 'skill-tools': ['.skill-card:nth-child(2) h3'], 'skill-tools-1': ['.skill-card:nth-child(2) li:nth-child(1)'], 'skill-tools-2': ['.skill-card:nth-child(2) li:nth-child(2)'], 'skill-tools-3': ['.skill-card:nth-child(2) li:nth-child(3)'], 'skill-tools-4': ['.skill-card:nth-child(2) li:nth-child(4)'], 'skill-service': ['.skill-card:nth-child(3) h3'], 'skill-service-1': ['.skill-card:nth-child(3) li:nth-child(1)'], 'skill-service-2': ['.skill-card:nth-child(3) li:nth-child(2)'], 'skill-service-3': ['.skill-card:nth-child(3) li:nth-child(3)'], 'skill-service-4': ['.skill-card:nth-child(3) li:nth-child(4)'], 'skill-languages': ['.skill-card:nth-child(4) h3'], 'skill-language-copy': ['.skill-card:nth-child(4) > p'],
  'education-kicker': ['#formacion .section-kicker'], 'education-heading': ['#titulo-formacion'], 'degree-heading': ['#titulo-estudios'], 'education-degree': ['#titulo-tecnologia'], 'education-university': ['#titulo-tecnologia + p'], 'education-current': ['.degree-feature .degree-dates'], 'education-school': ['#titulo-bachillerato'], 'education-school-name': ['#titulo-bachillerato + p'],
  'cert-heading': ['#titulo-certificaciones'],
  'cert-mysql': ['#nombre-mysql'], 'cert-mysql-copy': ['#curso-mysql .course-note'],
  'cert-general': ['#nombre-general'], 'cert-general-copy': ['#curso-general .course-note'],
  'cert-security': ['#nombre-security'], 'cert-security-copy': ['#curso-security .course-note'],
  'cert-beginner': ['#nombre-beginner'], 'cert-beginner-copy': ['#curso-beginner .course-note'],
  'cert-english1': ['#nombre-english1'], 'cert-english1-copy': ['#curso-english1 .course-note'],
  'cert-ef': ['#nombre-ef'], 'cert-ef-copy': ['#curso-ef .course-note'],
  'cert-innovation': ['#nombre-innovation'], 'cert-innovation-copy': ['#curso-innovation .course-note'],
  'cert-business': ['#nombre-business'], 'cert-business-copy': ['#curso-business .course-note'],
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
  for (const link of document.querySelectorAll('.course-record')) {
    const label = link.hasAttribute('href')
      ? (english ? 'Download PDF' : 'Descargar PDF')
      : (english ? 'PDF pending' : 'PDF pendiente');
    link.querySelector('.pdf-label').textContent = label;
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
