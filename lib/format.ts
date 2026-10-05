import type { Price } from '@/config/site';

const NBSP = ' ';

/** 250000 → «250 000» (неразрывные пробелы, чтобы число не переносилось). */
export function formatAmount(amount: number): string {
  return String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
}

/** Price → «от 1 200 000 ₸ / мес» или подпись вроде «Цена по ТЗ». */
export function formatPrice(price: Price): string {
  if (price.amount === null) return price.label ?? 'Цена по запросу';
  const parts = [`${formatAmount(price.amount)}${NBSP}₸`];
  if (price.from) parts.unshift('от');
  if (price.unit) parts.push(price.unit);
  return parts.join(' ');
}
