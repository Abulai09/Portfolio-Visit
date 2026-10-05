// Тема оформления. По умолчанию — как на устройстве (prefers-color-scheme).
// Ручной выбор хранится в localStorage и ставится атрибутом data-theme на <html>.
// Если выбор совпадает с темой устройства, он сбрасывается — сайт снова следует за устройством.

export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';

/**
 * Инлайн-скрипт для <head>: выполняется до отрисовки, поэтому нет «вспышки» не той темы.
 * try/catch — localStorage бывает недоступен (приватный режим, запрет cookies).
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t;}catch(e){}})();`;

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function currentTheme(): Theme {
  const forced = document.documentElement.dataset.theme;
  return forced === 'light' || forced === 'dark' ? forced : systemTheme();
}

export function toggleTheme(): void {
  const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark';
  const root = document.documentElement;
  try {
    if (next === systemTheme()) {
      delete root.dataset.theme;
      localStorage.removeItem(THEME_STORAGE_KEY);
    } else {
      root.dataset.theme = next;
      localStorage.setItem(THEME_STORAGE_KEY, next);
    }
  } catch {
    // localStorage недоступен — тема всё равно переключится до перезагрузки страницы
    root.dataset.theme = next;
  }
}
