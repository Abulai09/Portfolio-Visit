// Общий скрипт демо-сайтов (подключается в каждом public/demos/*.html).
// 1. Плашка сверху: «это демо-концепт», ссылка назад к примерам и «Хочу такой сайт» в WhatsApp.
// 2. «Живые» кнопки: [data-demo-cart] увеличивает счётчик [data-cart-count], формы не отправляются —
//    вместо этого всплывает подсказка, что это демо. Тип подсказки: form[role=search] или
//    data-demo-toast="pick | booking", иначе общая «заявка ушла бы владельцу». Иначе нажатие на кнопку выглядело бы как поломка.
//
// Язык плашки — из ?lang= (ru | kk | en), его передаёт карусель основного сайта.
// ?capture — режим скриншота для карусели (scripts/capture-demos.mjs): без плашки.
(() => {
  // Должен совпадать с contacts.whatsappPhone в config/site.ts — это проверяется при сборке
  const WHATSAPP_PHONE = '77086823182';

  const STRINGS = {
    ru: {
      short: 'Демо',
      long: 'Это концепт дизайна, а не настоящий магазин',
      back: '← Все примеры',
      cta: 'Хочу такой сайт',
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

    const cta = el('a', 'demo-bar__cta', t.cta);
    cta.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(t.message(demoName))}`;
    cta.target = '_blank';
    cta.rel = 'noopener noreferrer';

    bar.append(label, back, cta);
    document.body.prepend(bar);
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

  if (!params.has('capture')) renderBar();

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
