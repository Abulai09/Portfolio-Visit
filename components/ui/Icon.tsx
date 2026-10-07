import {
  BadgeCheck,
  Bot,
  CalendarCheck,
  Eye,
  FileSignature,
  LayoutTemplate,
  Plug,
  Search,
  Settings2,
  ShoppingBag,
  Sparkles,
  Smartphone,
  Store,
  Users,
  Wallet,
  Workflow,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import type { IconName } from '@/config/site';
import { tones, type Tone } from './tones';

const icons: Record<IconName, LucideIcon> = {
  store: ShoppingBag,
  marketplace: Store,
  layout: LayoutTemplate,
  wallet: Wallet,
  users: Users,
  zap: Zap,
  smartphone: Smartphone,
  settings: Settings2,
  search: Search,
  'file-signature': FileSignature,
  'badge-check': BadgeCheck,
  'calendar-check': CalendarCheck,
  eye: Eye,
  workflow: Workflow,
  bot: Bot,
  plug: Plug,
  sparkles: Sparkles,
};

/** Иконка в цветной плашке — для карточек преимуществ и гарантий. */
export function IconBadge({
  name,
  size = 'md',
  tone = 'violet',
}: {
  name: IconName;
  size?: 'md' | 'lg';
  tone?: Tone;
}) {
  const Cmp = icons[name];
  const box = size === 'lg' ? 'size-14 rounded-2xl' : 'size-12 rounded-xl';
  return (
    <span
      className={`${box} inline-flex shrink-0 items-center justify-center ${tones[tone].badge}`}
      aria-hidden="true"
    >
      <Cmp className={size === 'lg' ? 'size-7' : 'size-6'} strokeWidth={1.75} />
    </span>
  );
}
