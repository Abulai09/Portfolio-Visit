import type { Price } from '@/config/site';
import type { Content } from '@/config/content/types';

const NBSP = ' '; // неразрывный пробел

/** 250000 → «250 000» (неразрывные пробелы, чтобы число не переносилось). */
export function formatAmount(amount: number): string {
  return String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
}

/** 30000 → «30 000 ₸» — для цен внутри текста (FAQ, примечания). */
export function tenge(amount: number): string {
  return `${formatAmount(amount)}${NBSP}₸`;
}

/** Price → «от 1 200 000 ₸ / мес» или подпись вроде «Цена по ТЗ». Слова — из словаря языка. */
export function formatPrice(price: Price, words: Content['price']): string {
  if (price.amount === null) return words.onRequest;
  const amount = price.from ? words.from(tenge(price.amount)) : tenge(price.amount);
  return price.unit ? `${amount} ${words.units[price.unit]}` : amount;
}
