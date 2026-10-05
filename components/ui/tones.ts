// Дополнительные цветовые тона. Цвет несёт смысл, а не украшает:
// у пакета — уровень, у шага — место в процессе, у иконок — различие пунктов.
//
// Классы записаны целиком (а не собираются как `bg-tone-${t}`): Tailwind находит классы
// поиском по исходникам и не увидит строку, склеенную во время выполнения.

export type Tone = 'violet' | 'teal' | 'sky' | 'amber' | 'pink' | 'coral';

type ToneClasses = {
  /** Плашка иконки: мягкий фон + цвет иконки */
  badge: string;
  /** Цвет текста/иконки */
  text: string;
  /** Насыщенная заливка для полос и маркеров */
  solid: string;
};

export const tones: Record<Tone, ToneClasses> = {
  violet: { badge: 'bg-tone-violet-soft text-tone-violet-ink', text: 'text-tone-violet-ink', solid: 'bg-tone-violet' },
  teal: { badge: 'bg-tone-teal-soft text-tone-teal-ink', text: 'text-tone-teal-ink', solid: 'bg-tone-teal' },
  sky: { badge: 'bg-tone-sky-soft text-tone-sky-ink', text: 'text-tone-sky-ink', solid: 'bg-tone-sky' },
  amber: { badge: 'bg-tone-amber-soft text-tone-amber-ink', text: 'text-tone-amber-ink', solid: 'bg-tone-amber' },
  pink: { badge: 'bg-tone-pink-soft text-tone-pink-ink', text: 'text-tone-pink-ink', solid: 'bg-tone-pink' },
  coral: { badge: 'bg-coral-soft text-coral-ink', text: 'text-coral-ink', solid: 'bg-coral' },
};

/** Порядок для списков однородных пунктов: соседние карточки всегда разного цвета. */
const CYCLE: Tone[] = ['violet', 'coral', 'teal', 'amber', 'sky', 'pink'];

export function toneAt(index: number): Tone {
  return CYCLE[index % CYCLE.length];
}

/**
 * Шкала для последовательностей (шаги процесса): от индиго к кораллу.
 * Все цвета дают 4.7+ с белым текстом.
 */
export const SEQUENCE_RAMP = ['#4c2bc4', '#6d28d9', '#9333ea', '#c026d3', '#db2777', '#c93519'];
