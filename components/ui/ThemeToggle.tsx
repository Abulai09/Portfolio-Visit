'use client';

import { Moon, Sun } from 'lucide-react';
import { toggleTheme } from '@/lib/theme';

// Какую иконку показать, решает CSS (.theme-icon-*) по текущей теме, а не React-состояние:
// так на сервере и в браузере разметка одинаковая и иконка не «прыгает» после загрузки.
export function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Сменить тему оформления"
      title="Светлая / тёмная тема"
      className="inline-flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-accent-soft hover:text-accent-ink"
    >
      <Moon className="theme-icon-moon size-5" aria-hidden="true" />
      <Sun className="theme-icon-sun size-5" aria-hidden="true" />
    </button>
  );
}
