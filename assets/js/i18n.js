const languageToggle = document.querySelector('#language-toggle');
const translations = Array.from(document.querySelectorAll('[data-i18n]'), element => {
  const attribute = element.dataset.i18nAttr;
  return {
    element, attribute, english: portfolioEnglish[element.dataset.i18n],
    spanish: attribute ? element.getAttribute(attribute) : element.innerHTML
  };
});

function setLanguage(language) {
  document.documentElement.lang = language;
  for (const {element, attribute, english, spanish} of translations) {
    const value = language === 'en' ? english : spanish;
    if (attribute) element.setAttribute(attribute, value);
    else element.innerHTML = value;
  }
  for (const button of languageToggle.querySelectorAll('[data-language]')) {
    button.setAttribute('aria-pressed', String(button.dataset.language === language));
  }
  window.dispatchEvent(new Event('portfolio-language-change'));
}

try {
  if (localStorage.getItem('portfolio-language') === 'en') setLanguage('en');
} catch { /* Spanish is available directly in the document. */ }

languageToggle.addEventListener('click', event => {
  const button = event.target.closest('[data-language]');
  if (!button) return;
  const language = button.dataset.language;
  setLanguage(language);
  try { localStorage.setItem('portfolio-language', language); } catch { /* Storage is optional. */ }
});
