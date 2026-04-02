const translations = {
  en: {
    // Nav
    'nav.privacy': 'Privacy',
    'nav.support': 'Support',

    // Hero
    'hero.tagline': 'A minimalist football management game for quick sessions.',

    // Privacy
    'privacy.title': 'Privacy Policy',
    'privacy.updated': 'Last updated: March 13, 2026',
    'privacy.p1':
      'Fast Eleven is a single-player offline game. The app does not collect, store, or share any personal data. All game data is stored locally on your device and is never transmitted to any server.',
    'privacy.p2':
      'The app uses <a href="https://sentry.io/privacy/" target="_blank">Sentry</a> for anonymous crash reporting. Crash reports contain only technical information about the error (device model, OS version, stack trace) and do not include any personally identifiable information. No names, emails, locations, or usage data are collected.',
    'privacy.p3':
      'The app does not use analytics, advertising, tracking, or any third-party services beyond crash reporting.',
    'privacy.p4':
      'The app does not require an internet connection to function. No account or registration is needed.',

    // Support
    'support.title': 'Support',
    'support.intro':
      'If you encounter any issues or have feedback, please reach out:',
    'support.email.label': 'Email:',
    'support.github.label': 'GitHub:',
    'support.github.link': 'Report an issue',

    // Footer
    'footer.rights': '&copy; 2026 Fast Eleven. All rights reserved.',
  },
  pt: {
    // Nav
    'nav.privacy': 'Privacidade',
    'nav.support': 'Suporte',

    // Hero
    'hero.tagline':
      'Um jogo minimalista de gestão de futebol para sessões rápidas.',

    // Privacy
    'privacy.title': 'Política de Privacidade',
    'privacy.updated': 'Última atualização: 13 de março de 2026',
    'privacy.p1':
      'Fast Eleven é um jogo offline para um jogador. O app não coleta, armazena ou compartilha nenhum dado pessoal. Todos os dados do jogo são armazenados localmente no seu dispositivo e nunca são transmitidos para nenhum servidor.',
    'privacy.p2':
      'O app utiliza o <a href="https://sentry.io/privacy/" target="_blank">Sentry</a> para relatórios anônimos de erros. Os relatórios contêm apenas informações técnicas sobre o erro (modelo do dispositivo, versão do sistema operacional, stack trace) e não incluem nenhuma informação pessoalmente identificável. Nenhum nome, e-mail, localização ou dado de uso é coletado.',
    'privacy.p3':
      'O app não utiliza análises, publicidade, rastreamento ou quaisquer serviços de terceiros além do relatório de erros.',
    'privacy.p4':
      'O app não requer conexão com a internet para funcionar. Nenhuma conta ou registro é necessário.',

    // Support
    'support.title': 'Suporte',
    'support.intro':
      'Se você encontrar algum problema ou tiver feedback, entre em contato:',
    'support.email.label': 'E-mail:',
    'support.github.label': 'GitHub:',
    'support.github.link': 'Reportar um problema',

    // Footer
    'footer.rights': '&copy; 2026 Fast Eleven. Todos os direitos reservados.',
  },
};

function getLanguage() {
  var saved = localStorage.getItem('fast11-lang');
  if (saved) return saved;
  var browserLang = navigator.language || navigator.userLanguage || 'en';
  return browserLang.toLowerCase().startsWith('pt') ? 'pt' : 'en';
}

function setLanguage(lang) {
  localStorage.setItem('fast11-lang', lang);
  applyTranslations(lang);
  updateLangButtons(lang);
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
}

function applyTranslations(lang) {
  var t = translations[lang] || translations.en;

  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    var key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      el.textContent = t[key];
    }
  });

  document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
    var key = el.getAttribute('data-i18n-html');
    if (t[key] !== undefined) {
      el.innerHTML = t[key];
    }
  });

  // Update Apple badge image locale
  var appleBadge = document.querySelector('#app-store-btn img');
  if (appleBadge) {
    var locale = lang === 'pt' ? 'pt-br' : 'en-us';
    appleBadge.src =
      'https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/' +
      locale +
      '?size=250x83';
    appleBadge.alt =
      lang === 'pt' ? 'Baixar na App Store' : 'Download on the App Store';
  }
}

function updateLangButtons(lang) {
  document.querySelectorAll('.lang-switcher button').forEach(function (btn) {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  var lang = getLanguage();
  applyTranslations(lang);
  updateLangButtons(lang);
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

  // Device detection for store buttons
  var ua = navigator.userAgent || navigator.vendor || window.opera;
  var isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
  var isAndroid = /android/i.test(ua);
  var appStore = document.getElementById('app-store-btn');
  var playStore = document.getElementById('play-store-btn');

  if (appStore && playStore) {
    if (isIOS) {
      playStore.style.display = 'none';
    } else if (isAndroid) {
      appStore.style.display = 'none';
    }
  }
});
