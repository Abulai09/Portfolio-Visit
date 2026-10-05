/**
 * Рамка MacBook на чистом CSS: крышка с тонкой рамкой и «чёлкой», алюминиевое основание
 * и мягкая тень. Скриншот вставляется как обычная картинка 16:10 — замена работы
 * сводится к замене файла.
 */
export function MacBook({
  small,
  large,
  alt,
  sizes,
  priority = false,
}: {
  small: string;
  large: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div className="relative">
      {/* Крышка */}
      <div className="relative rounded-[clamp(10px,2.4%,22px)] bg-[#0b0b0f] p-[1.6%] pb-[2.2%] ring-1 ring-[#3b3b44] shadow-[inset_0_0_0_1px_#26262c]">
        <div className="relative overflow-hidden rounded-[clamp(3px,0.6%,6px)] bg-[#1a1a1f]">
          {/* srcSet вместо next/image: при статическом экспорте оптимизатор картинок недоступен,
              поэтому размеры заранее подготовлены скриптом scripts/capture-demos.mjs */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={large}
            srcSet={`${small} 960w, ${large} 1600w`}
            sizes={sizes}
            width={1600}
            height={1000}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className="block aspect-[16/10] h-auto w-full"
          />
          {/* Блик на стекле */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgb(255_255_255/0.07)_0%,transparent_38%)]"
          />
        </div>
        {/* Чёлка с камерой */}
        <div
          aria-hidden="true"
          className="absolute top-[1.6%] left-1/2 h-[2.4%] w-[11%] -translate-x-1/2 rounded-b-[6px] bg-[#0b0b0f]"
        />
      </div>

      {/* Основание: шире крышки, с выемкой для открытия */}
      <div aria-hidden="true" className="relative -mx-[6.5%]">
        <div className="h-[clamp(8px,1.6vw,18px)] rounded-t-[2px] rounded-b-[50%_100%] bg-[linear-gradient(180deg,#e9ebf0_0%,#c9ccd4_55%,#9fa3ad_100%)] shadow-[0_1px_0_#ffffff_inset]" />
        <div className="absolute top-0 left-1/2 h-[45%] w-[15%] -translate-x-1/2 rounded-b-[10px] bg-[linear-gradient(180deg,#b9bcc5,#d5d8df)]" />
      </div>

      {/* Тень под ноутбуком: градиент вместо filter: blur — слайдов много, фильтры дорогие */}
      <div
        aria-hidden="true"
        className="mx-auto h-[clamp(14px,2.6vw,30px)] w-[96%] bg-[radial-gradient(closest-side,rgb(0_0_0/0.5),transparent)]"
      />
    </div>
  );
}
