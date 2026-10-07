// Общий скрипт демо-сайтов (подключается в каждом public/demos/*.html).
// 1. Плашка сверху: «это демо-концепт», ссылка назад к примерам и «Хочу такой сайт» в WhatsApp.
//    Плюс плавающая кнопка «Написать» в WhatsApp в правом нижнем углу.
// 2. «Живые» кнопки: [data-demo-cart] увеличивает счётчик [data-cart-count], формы не отправляются —
//    вместо этого всплывает подсказка, что это демо. Тип подсказки: form[role=search] или
//    data-demo-toast="pick | booking", иначе общая «заявка ушла бы владельцу». Иначе нажатие на кнопку выглядело бы как поломка.
//
// Язык плашки — из ?lang= (ru | kk | en), его передаёт карусель основного сайта.
// ?capture — режим скриншота для карусели (scripts/capture-demos.mjs): без плашки и кнопки.
(() => {
  // Должен совпадать с contacts.whatsappPhone в config/site.ts — это проверяется при сборке
  const WHATSAPP_PHONE = '77086823182';

  const STRINGS = {
    ru: {
      short: 'Демо',
      long: 'Это концепт дизайна, а не настоящий магазин',
      back: '← Все примеры',
      cta: 'Хочу такой сайт',
      write: 'Написать',
      message: (name) => `Здравствуйте! Посмотрел демо «${name}». Хочу похожий сайт.`,
      added: 'Это демо: в настоящем магазине товар попал бы в корзину',
      sent: 'Это демо: в настоящем магазине заявка ушла бы владельцу',
      search: 'Это демо: здесь появились бы результаты поиска',
      pick: 'Это демо: здесь появилась бы подборка под ваш ответ',
      booking: 'Это демо: в настоящем салоне запись подтвердилась бы в WhatsApp',
    },
    kk: {
      short: 'Демо',
      long: 'Бұл дизайн концептісі, нағыз дүкен емес',
      back: '← Барлық мысалдар',
      cta: 'Осындай сайт керек',
      write: 'Жазу',
      message: (name) => `Сәлеметсіз бе! «${name}» демосын көрдім. Осындай сайт жасатқым келеді.`,
      added: 'Бұл демо: нағыз дүкенде тауар себетке түсер еді',
      sent: 'Бұл демо: нағыз дүкенде өтінім иесіне жіберілер еді',
      search: 'Бұл демо: мұнда іздеу нәтижелері шығар еді',
      pick: 'Бұл демо: мұнда жауабыңызға сай таңдау шығар еді',
      booking: 'Бұл демо: нағыз салонда жазылу WhatsApp арқылы расталар еді',
    },
    en: {
      short: 'Demo',
      long: 'This is a design concept, not a real store',
      back: '← All examples',
      cta: 'I want a site like this',
      write: 'Message',
      message: (name) => `Hello! I saw the “${name}” demo. I’d like a similar website.`,
      added: 'This is a demo: in a real store the item would go to your cart',
      sent: 'This is a demo: in a real store the request would reach the owner',
      search: 'This is a demo: search results would appear here',
      pick: 'This is a demo: a selection based on your answer would appear here',
      booking: 'This is a demo: in a real salon the booking would be confirmed on WhatsApp',
    },
  };

  const params = new URLSearchParams(location.search);

  // Некоторые хостинги перенаправляют luna.html → luna и теряют ?lang=. Тогда язык берём
  // из страницы, с которой пришли (/kk, /en), — только если она на этом же сайте.
  function langFromReferrer() {
    try {
      const from = new URL(document.referrer);
      return from.origin === location.origin ? from.pathname.split('/')[1] : null;
    } catch {
      return null;
    }
  }

  // Только из белого списка: значение попадает в адрес ссылки «назад»
  const langCandidate = params.get('lang') || langFromReferrer();
  const lang = langCandidate && Object.hasOwn(STRINGS, langCandidate) ? langCandidate : 'ru';
  const t = STRINGS[lang];
  const demoName = document.documentElement.dataset.demoName || document.title;

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function renderBar() {
    const bar = el('div', 'demo-bar');
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', t.short);
    bar.lang = lang;

    const label = el('span', 'demo-bar__label');
    label.append(el('span', 'demo-bar__dot'), el('strong', '', t.short), el('span', 'demo-bar__long', t.long));

    const back = el('a', 'demo-bar__back', t.back);
    back.href = `${lang === 'ru' ? '/' : `/${lang}`}#portfolio`;

    const cta = whatsappLink('demo-bar__cta');
    cta.textContent = t.cta;

    bar.append(label, back, cta);
    document.body.prepend(bar);
  }

  function whatsappLink(className) {
    const link = el('a', className);
    link.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(t.message(demoName))}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    return link;
  }

  // Логотип WhatsApp — тот же путь, что в components/ui/WhatsAppIcon.tsx
  const WHATSAPP_ICON =
    'M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.01c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.36 9.36 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.44 9.43m8.03-17.46A11.27 11.27 0 0 0 12.05.71C5.79.71.7 5.8.7 12.06c0 2 .52 3.95 1.52 5.67L.6 23.62l6.02-1.58a11.34 11.34 0 0 0 5.42 1.38h.01c6.26 0 11.35-5.1 11.35-11.36 0-3.03-1.18-5.88-3.32-8.02';

  function renderFloatingButton() {
    const link = whatsappLink('demo-wa');
    link.lang = lang;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', WHATSAPP_ICON);
    svg.append(path);

    link.append(svg, el('span', '', t.write));
    document.body.append(link);
    document.documentElement.classList.add('has-demo-wa');
  }

  let toastTimer;
  function toast(text) {
    let node = document.querySelector('.demo-toast');
    if (!node) {
      node = el('div', 'demo-toast');
      node.setAttribute('role', 'status');
      node.lang = lang;
      document.body.append(node);
    }
    node.textContent = text;
    node.classList.add('is-shown');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => node.classList.remove('is-shown'), 2600);
  }

  if (!params.has('capture')) {
    renderBar();
    renderFloatingButton();
  }

  let cartCount = Number(document.querySelector('[data-cart-count]')?.textContent) || 0;
  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-demo-cart]');
    if (!button) return;
    event.preventDefault();
    cartCount += 1;
    document.querySelectorAll('[data-cart-count]').forEach((n) => (n.textContent = String(cartCount)));
    toast(t.added);
  });

  document.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.target;
    // Тип подсказки — только из набора строк выше; неизвестное значение даёт общую «заявку»
    const kind = form.getAttribute('role') === 'search' ? 'search' : form.dataset.demoToast;
    toast(kind && ['search', 'pick', 'booking'].includes(kind) ? t[kind] : t.sent);
  });
})();
