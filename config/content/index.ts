import type { Locale } from '@/config/i18n';
import type { Content } from './types';
import { en } from './en';
import { kk } from './kk';
import { ru } from './ru';

export type { Content } from './types';

const dictionaries: Record<Locale, Content> = { ru, kk, en };

/** Все тексты сайта на нужном языке. */
export function getContent(locale: Locale): Content {
  return dictionaries[locale];
}
