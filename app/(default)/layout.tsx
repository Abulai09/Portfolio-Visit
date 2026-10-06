import { buildMetadata, RootDocument } from '../_site/RootDocument';

// Русский — основной язык, открывается по адресу «/»
export const metadata = buildMetadata('ru');
export { viewport } from '../_site/RootDocument';

export default function DefaultLayout({ children }: LayoutProps<'/'>) {
  return <RootDocument locale="ru">{children}</RootDocument>;
}
