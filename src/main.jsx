import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import { createRoot } from "react-dom/client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  AtSign,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Code2,
  Command,
  ExternalLink,
  Globe,
  Layers,
  LayoutDashboard,
  Mail,
  Menu,
  Moon,
  Plus,
  Search,
  Send,
  Settings,
  ShoppingBag,
  Sun,
  Trash2,
  X,
  Zap,
} from "lucide-react";
import "./style.css";
gsap.registerPlugin(ScrollTrigger);

const C = createContext(null);
const useSite = () => useContext(C);
const word = (lang, en, fa) => (lang === "fa" ? fa : en);
const copy = {
  en: {
    navWork: "Selected work",
    navAbout: "About",
    navContact: "Contact",
    available: "Available for selected projects",
    heroKicker: "INDEPENDENT DEVELOPER · DIGITAL CRAFT",
    heroA: "I build digital",
    heroB: "experiences that",
    heroC: "feel effortless.",
    heroDesc:
      "Thoughtful interfaces, useful products, and smart technology — designed to make everyday things feel a little more extraordinary.",
    viewWork: "Explore the work",
    sayHello: "Let’s talk",
    scroll: "SCROLL TO EXPLORE",
    introLabel: "A LITTLE ABOUT ME",
    introTitle: "Curiosity turned into a craft.",
    introText:
      "I’m Adrian Hafezi. I started learning programming at 14, and that early curiosity grew into a passion for building things people genuinely enjoy using. I focus on front-end development and AI, and I also work across the back end when a product needs it.",
    introText2:
      "I care about the details: clear structure, thoughtful motion, accessible experiences, and interfaces that feel natural on every screen.",
    focus: "WHAT I BRING",
    focus1: "Front-end development",
    focus2: "AI-powered experiences",
    focus3: "Back-end foundations",
    focus4: "Product-minded design",
    workLabel: "THE WORK",
    workTitle: "A collection of useful ideas.",
    workText:
      "Ten concept products, each with a different visual language and a real interaction at its core. Pick one and take it for a spin.",
    openProject: "Open experience",
    contactLabel: "HAVE SOMETHING IN MIND?",
    contactTitle: "Let’s make it real.",
    contactText:
      "Have an idea, a product to build, or a tricky problem to solve? Send me a message. I’d love to hear what you’re working on.",
    telegram: "Message me on Telegram",
    footer: "Designed & built with curiosity.",
    back: "Back to all work",
    tryIt: "TRY THE EXPERIENCE",
    reset: "Reset demo",
    saved: "Saved locally",
    empty: "Nothing here yet.",
    add: "Add",
    search: "Search",
    total: "Total",
    status: "Status",
    actions: "Actions",
    name: "Name",
    email: "Email",
    amount: "Amount",
    date: "Date",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    complete: "Complete",
    pending: "Pending",
    all: "All",
    language: "Language",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
  },
  fa: {
    navWork: "نمونه‌کارها",
    navAbout: "درباره من",
    navContact: "ارتباط",
    available: "آماده همکاری روی پروژه‌های منتخب",
    heroKicker: "توسعه‌دهنده مستقل · خالق تجربه‌های دیجیتال",
    heroA: "تجربه‌های دیجیتال",
    heroB: "می‌سازم که",
    heroC: "ساده و روان‌اند.",
    heroDesc:
      "رابط‌های دقیق، محصولات کاربردی و فناوری هوشمند؛ برای اینکه کارهای روزمره تجربه‌ای متفاوت داشته باشند.",
    viewWork: "دیدن نمونه‌کارها",
    sayHello: "شروع گفتگو",
    scroll: "برای کشف بیشتر اسکرول کن",
    introLabel: "کمی درباره من",
    introTitle: "کنجکاوی، تبدیل به مهارت شد.",
    introText:
      "من ادرین حافظی هستم. از ۱۴ سالگی یادگیری برنامه‌نویسی رو شروع کردم. این کنجکاوی به علاقه‌ای جدی برای ساخت محصولاتی تبدیل شد که مردم از کار کردن باهاشون لذت ببرن. تمرکز اصلی من توسعه فرانت‌اند و هوش مصنوعیه و در صورت نیاز، بخش بک‌اند رو هم توسعه می‌دم.",
    introText2:
      "به جزئیات اهمیت می‌دم؛ ساختار تمیز، حرکت‌های ظریف، تجربه در دسترس و رابطی که روی هر صفحه‌ای طبیعی باشه.",
    focus: "حوزه‌های کاری",
    focus1: "توسعه فرانت‌اند",
    focus2: "تجربه‌های مبتنی بر هوش مصنوعی",
    focus3: "زیرساخت بک‌اند",
    focus4: "طراحی با نگاه محصول",
    workLabel: "پروژه‌ها",
    workTitle: "مجموعه‌ای از ایده‌های کاربردی.",
    workText:
      "ده محصول مفهومی با ظاهرهای متفاوت و قابلیت‌های واقعی. یکی رو انتخاب کن و باهاش کار کن.",
    openProject: "مشاهده و تجربه",
    contactLabel: "ایده‌ای در ذهن داری؟",
    contactTitle: "با هم واقعی‌اش کنیم.",
    contactText:
      "ایده‌ای داری، محصولی برای ساختن یا مسئله‌ای پیچیده برای حل کردن؟ برام پیام بفرست. دوست دارم درباره کاری که انجام می‌دی بیشتر بدونم.",
    telegram: "پیام در تلگرام",
    footer: "با کنجکاوی طراحی و ساخته شده.",
    back: "بازگشت به همه پروژه‌ها",
    tryIt: "تجربه تعاملی",
    reset: "بازنشانی دمو",
    saved: "به‌صورت محلی ذخیره شد",
    empty: "هنوز چیزی اینجا نیست.",
    add: "افزودن",
    search: "جستجو",
    total: "مجموع",
    status: "وضعیت",
    actions: "عملیات",
    name: "نام",
    email: "ایمیل",
    amount: "مبلغ",
    date: "تاریخ",
    save: "ذخیره",
    cancel: "لغو",
    delete: "حذف",
    complete: "تکمیل‌شده",
    pending: "در انتظار",
    all: "همه",
    language: "زبان",
    theme: "پوسته",
    light: "روشن",
    dark: "تیره",
  },
};
const projects = [
  {
    id: "commerce",
    n: "01",
    title: { en: "Forma — Online store", fa: "Forma — فروشگاه آنلاین" },
    type: { en: "E-commerce · Editorial", fa: "فروشگاه · ادیتوریال" },
    desc: {
      en: "A considered storefront for everyday objects, with a working cart and saved basket.",
      fa: "فروشگاهی مینیمال برای محصولات روزمره، با سبد خرید و مدیریت سفارش واقعی.",
    },
    tone: "lavender",
    icon: ShoppingBag,
  },
  {
    id: "studio",
    n: "02",
    title: { en: "Northstar — Analytics", fa: "Northstar — تحلیل داده" },
    type: { en: "SaaS · Dashboard", fa: "نرم‌افزار · داشبورد" },
    desc: {
      en: "A compact analytics workspace with date filters, KPI cards and live chart controls.",
      fa: "فضای تحلیل داده با شاخص‌های کلیدی، فیلتر بازه زمانی و نمودارهای تعاملی.",
    },
    tone: "mint",
    icon: BarChart3,
  },
  {
    id: "booking",
    n: "03",
    title: { en: "Sonder — Booking", fa: "Sonder — رزرو آنلاین" },
    type: { en: "Hospitality · Booking", fa: "رزرو · خدمات" },
    desc: {
      en: "A calm booking flow with selectable dates, guest counts and reservation summary.",
      fa: "فرایند رزرو ساده با انتخاب تاریخ، تعداد مهمان و خلاصه سفارش.",
    },
    tone: "peach",
    icon: Clock,
  },
  {
    id: "tasks",
    n: "04",
    title: { en: "Dayform — Task manager", fa: "Dayform — مدیریت کارها" },
    type: { en: "Productivity · App", fa: "بهره‌وری · اپلیکیشن" },
    desc: {
      en: "A focused daily planner. Add tasks, complete them and keep your progress locally.",
      fa: "برنامه‌ریز روزانه برای ثبت کارها، تکمیل وظایف و نگهداری پیشرفت.",
    },
    tone: "blue",
    icon: CheckCircle2,
  },
  {
    id: "invoice",
    n: "05",
    title: { en: "Ledger — Invoices", fa: "Ledger — صدور فاکتور" },
    type: { en: "Business · Finance", fa: "کسب‌وکار · مالی" },
    desc: {
      en: "Create invoices, add line items and calculate totals without a server.",
      fa: "ساخت فاکتور، افزودن ردیف‌های مالی و محاسبه خودکار مبلغ نهایی.",
    },
    tone: "sand",
    icon: Layers,
  },
  {
    id: "estate",
    n: "06",
    title: { en: "Haven — Property finder", fa: "Haven — جستجوی ملک" },
    type: { en: "Real estate · Search", fa: "املاک · جستجو" },
    desc: {
      en: "Explore a curated property list with working filters and saved favorites.",
      fa: "جستجوی ملک با فیلترهای کاربردی و امکان ذخیره علاقه‌مندی‌ها.",
    },
    tone: "sage",
    icon: Globe,
  },
  {
    id: "restaurant",
    n: "07",
    title: { en: "Morrow — Restaurant", fa: "Morrow — رستوران" },
    type: { en: "Food · Ordering", fa: "غذا · سفارش آنلاین" },
    desc: {
      en: "A menu-led ordering experience with quantity controls and a live order total.",
      fa: "منوی رستوران با کنترل تعداد سفارش و محاسبه زنده مبلغ سبد خرید.",
    },
    tone: "rose",
    icon: ShoppingBag,
  },
  {
    id: "course",
    n: "08",
    title: { en: "Luma — Learning", fa: "Luma — آموزش آنلاین" },
    type: { en: "Education · LMS", fa: "آموزش · پلتفرم" },
    desc: {
      en: "A small learning portal with lessons, progress tracking and completion states.",
      fa: "پلتفرم آموزشی کوچک با درس‌ها، نمایش میزان پیشرفت و ثبت تکمیل.",
    },
    tone: "sky",
    icon: Code2,
  },
  {
    id: "crm",
    n: "09",
    title: { en: "Relay — Client CRM", fa: "Relay — مدیریت مشتری" },
    type: { en: "Business · CRM", fa: "کسب‌وکار · مدیریت مشتری" },
    desc: {
      en: "Manage a contact list, search clients and update relationship stages.",
      fa: "مدیریت مخاطبان، جستجوی مشتری و تغییر مرحله ارتباط با هر مشتری.",
    },
    tone: "lilac",
    icon: AtSign,
  },
  {
    id: "portfolio",
    n: "10",
    title: {
      en: "Canvas — Creative portfolio",
      fa: "Canvas — پورتفولیوی خلاق",
    },
    type: { en: "Creative · Portfolio", fa: "خلاقیت · نمونه‌کار" },
    desc: {
      en: "A visual case-study layout with project details, category filters and a contact CTA.",
      fa: "قالب تصویری برای نمایش پروژه‌ها، دسته‌بندی نمونه‌کار و دعوت به ارتباط.",
    },
    tone: "charcoal",
    icon: Layers,
  },
];
function SiteProvider({ children }) {
  const [lang, setLang] = useState(
    () => localStorage.getItem("adrian-lang") || "en",
  );
  const [theme, setTheme] = useState(
    () => localStorage.getItem("adrian-theme") || "light",
  );
  useEffect(() => {
    localStorage.setItem("adrian-lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
  }, [lang]);
  useEffect(() => {
    localStorage.setItem("adrian-theme", theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  const t = copy[lang];
  return (
    <C.Provider value={{ lang, setLang, theme, setTheme, t }}>
      {children}
    </C.Provider>
  );
}
function useMotion() {
  const root = useRef(null);
  useLayoutEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-reveal]").forEach((el) =>
        gsap.fromTo(
          el,
          { y: 38, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          },
        ),
      );
      gsap.utils.toArray("[data-float]").forEach((el, i) =>
        gsap.to(el, {
          y: i % 2 ? -16 : 14,
          rotate: i % 2 ? 5 : -5,
          duration: 3 + i * 0.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        }),
      );
    }, root);
    return () => ctx.revert();
  }, []);
  return root;
}

function TopProgress() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;

      setProgress(max > 0 ? window.scrollY / max : 0);
      setIsVisible(window.scrollY > 180);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();

    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <button
      className={`top-progress ${isVisible ? "is-visible" : ""}`}
      aria-label="Back to top"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <svg className="progress-circle" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="20" />
        <circle
          className="progress-ring"
          cx="24"
          cy="24"
          r="20"
          style={{ strokeDashoffset: 125.6 * (1 - progress) }}
        />
      </svg>

      <ArrowUp size={17} />
    </button>
  );
}

function Controls() {
  const { lang, setLang, theme, setTheme } = useSite();
  return (
    <div className="controls">
      <button
        className="lang-toggle"
        onClick={() => setLang(lang === "en" ? "fa" : "en")}
        aria-label="Change language"
      >
        <span className={lang === "en" ? "active" : ""}>EN</span>
        <span className="toggle-track">
          <i />
        </span>
        <span className={lang === "fa" ? "active" : ""}>فا</span>
      </button>
      <button
        className="theme-toggle"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        aria-label="Toggle theme"
      >
        {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
      </button>
    </div>
  );
}

function Header() {
  const { t } = useSite();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`header ${isScrolled ? "is-scrolled" : ""}`}>
      <a href="#home" className="brand">
        <span className="brand-mark">A.</span>
        <span>
          ADRIAN<span className="brand-muted"> HAFEZI</span>
        </span>
      </a>

      <nav>
        <a href="#work">{t.navWork}</a>
        <a href="#about">{t.navAbout}</a>
        <a href="#contact">{t.navContact}</a>
      </nav>

      <Controls />
    </header>
  );
}

function Home() {
  const { lang, t } = useSite();
  const root = useMotion();
  return (
    <main ref={root} id="home">
      <Header />
      <section className="hero section-wrap">
        <div className="hero-copy">
          <div className="availability" data-reveal>
            <i />
            {t.available}
          </div>
          <p className="eyebrow" data-reveal>
            {t.heroKicker}
          </p>
          <h1 data-reveal>
            {t.heroA}
            <br />
            <span className="serif-word">{t.heroB}</span>
            <br />
            {t.heroC}
          </h1>
          <p className="hero-desc" data-reveal>
            {t.heroDesc}
          </p>
          <div className="hero-actions" data-reveal>
            <a className="button-primary" href="#work">
              {t.viewWork}
              <ArrowUpRight size={17} />
            </a>
            <a className="text-link" href="#contact">
              {t.sayHello}
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-orbit orbit-one" data-float />
          <div className="art-orbit orbit-two" data-float />
          <div className="art-core" data-float>
            <span>A</span>
            <small>
              CREATIVE
              <br />
              DEVELOPER
            </small>
          </div>
          <div className="art-tag tag-one" data-float>
            <Code2 size={15} /> FRONT-END
          </div>
          <div className="art-tag tag-two" data-float>
            <Zap size={15} /> AI + IDEAS
          </div>
          <div className="art-dot dot-one" />
          <div className="art-dot dot-two" />
        </div>
        <div className="hero-bottom">
          <span>© 2026 — PORTFOLIO</span>
          <span>
            <ArrowDown size={14} /> {t.scroll}
          </span>
          <span>BASED IN THE DIGITAL WORLD</span>
        </div>
      </section>
      <section className="about-section section-wrap" id="about">
        <div className="section-index" data-reveal>
          <span>01 / {t.introLabel}</span>
          <span className="index-line" />
        </div>
        <div className="about-grid">
          <h2 data-reveal>{t.introTitle}</h2>
          <div className="about-copy" data-reveal>
            <p>{t.introText}</p>
            <p>{t.introText2}</p>
            <div className="focus-list">
              <span>{t.focus}</span>
              <div>
                {[t.focus1, t.focus2, t.focus3, t.focus4].map((x, i) => (
                  <b key={x}>
                    <i>0{i + 1}</i>
                    {x}
                  </b>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="work-section section-wrap" id="work">
        <div className="section-index" data-reveal>
          <span>02 / {t.workLabel}</span>
          <span className="index-line" />
        </div>
        <div className="work-heading" data-reveal>
          <h2>{t.workTitle}</h2>
          <p>{t.workText}</p>
        </div>
        <div className="project-list">
          {projects.map((p, i) => (
            <ProjectRow key={p.id} p={p} i={i} />
          ))}
        </div>
      </section>
      <section className="contact-section section-wrap" id="contact">
        <div className="contact-shape" data-float />
        <div className="section-index" data-reveal>
          <span>03 / {t.contactLabel}</span>
          <span className="index-line" />
        </div>
        <div className="contact-content" data-reveal>
          <h2>{t.contactTitle}</h2>
          <p>{t.contactText}</p>
          <a
            className="telegram-card"
            href="https://t.me/Adrian_Hafezi"
            target="_blank"
            rel="noreferrer"
          >
            <span className="telegram-icon">
              <Send size={20} />
            </span>
            <span>
              <small>{t.telegram}</small>
              <b>@Adrian_Hafezi</b>
            </span>
            <ArrowUpRight className="telegram-arrow" />
          </a>
        </div>
      </section>
      <Footer />
      <TopProgress />
    </main>
  );
}
function ProjectRow({ p, i }) {
  const { lang, t } = useSite();
  const Icon = p.icon;
  return (
    <a
      href={"#project/" + p.id}
      className={"project-row " + p.tone}
      data-reveal
    >
      <span className="project-number">{p.n}</span>
      <span className="project-symbol">
        <Icon size={25} />
      </span>
      <span className="project-info">
        <b>{p.title[lang]}</b>
        <small>{p.type[lang]}</small>
      </span>
      <span className="project-desc">{p.desc[lang]}</span>
      <span className="project-open">
        {t.openProject}
        <ArrowUpRight size={17} />
      </span>
    </a>
  );
}
function Footer() {
  const { t } = useSite();
  return (
    <footer className="footer section-wrap">
      <a href="#home" className="brand">
        <span className="brand-mark">A.</span>
        <span>
          ADRIAN<span className="brand-muted"> HAFEZI</span>
        </span>
      </a>
      <span>{t.footer}</span>
      <span>© 2026</span>
    </footer>
  );
}
const initial = {
  tasks: [
    { id: 1, text: "Review the new landing page", done: false },
    { id: 2, text: "Send project proposal", done: true },
    { id: 3, text: "Prepare weekly notes", done: false },
  ],
  clients: [
    {
      id: 1,
      name: "Olivia Martin",
      email: "olivia@example.com",
      stage: "Lead",
    },
    { id: 2, name: "Noah Wilson", email: "noah@example.com", stage: "Active" },
    { id: 3, name: "Mia Chen", email: "mia@example.com", stage: "Proposal" },
  ],
  properties: [
    {
      id: 1,
      name: "The Cedar House",
      city: "Portland",
      price: 685000,
      type: "House",
    },
    {
      id: 2,
      name: "Lightwell Apartment",
      city: "Brooklyn",
      price: 420000,
      type: "Apartment",
    },
    { id: 3, name: "Casa Sol", city: "Austin", price: 795000, type: "House" },
  ],
  cart: [],
  lessons: [
    { id: 1, title: "Design foundations", done: true },
    { id: 2, title: "Build with components", done: false },
    { id: 3, title: "Motion that matters", done: false },
  ],
  invoices: [],
};
function useLocal(key, fallback) {
  const [v, setV] = useState(() => {
    try {
      const x = localStorage.getItem("adrian-demo-" + key);
      return x ? JSON.parse(x) : fallback;
    } catch {
      return fallback;
    }
  });
  useEffect(
    () => localStorage.setItem("adrian-demo-" + key, JSON.stringify(v)),
    [key, v],
  );
  return [v, setV];
}
function DemoShell({ children }) {
  const { t } = useSite();
  return (
    <div className="demo-shell" data-reveal>
      <div className="demo-top">
        <span className="demo-live">
          <i /> LIVE INTERACTIVE DEMO
        </span>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          {t.reset}
          <Settings size={14} />
        </button>
      </div>
      {children}
      <p className="demo-note">
        <Check size={13} />
        {t.saved} · Your demo data stays in this browser.
      </p>
    </div>
  );
}
function StoreDemo() {
  const { lang } = useSite();
  const [cart, setCart] = useLocal("cart", initial.cart);
  const products = [
    [
      word(lang, "Everyday bottle", "بطری روزمره"),
      28,
      "https://images2.habeco.si/upload/product/additional/440152_productzoom.webp",
    ],
    [
      word(lang, "Studio notebook", "دفتر طراحی"),
      18,
      "https://m.media-amazon.com/images/I/41R4Vchf+PL._SX342_SY445_ML2_.jpg",
    ],
    [
      word(lang, "Soft carry tote", "کیف پارچه‌ای"),
      34,
      "https://www.hydroflask.com/media/catalog/product/cache/b2f1ce2dfe10d3d31bf2056bf6e0d10f/m/i/miniit114-carryout-tote-10l-oat-angled.jpg",
    ],
  ];
  return (
    <DemoShell>
      <div className="store-demo">
        <div>
          <small>FORMA OBJECTS / 2026</small>
          <h3>
            {word(lang, "Good things,", "چیزهای خوب،")}
            <br />
            <em>{word(lang, "well made.", "با دقت ساخته‌شده.")}</em>
          </h3>
          <p>
            {word(
              lang,
              "Useful objects for slower, more thoughtful days.",
              "وسایل کاربردی برای روزهایی آرام‌تر و آگاهانه‌تر.",
            )}
          </p>
        </div>
        <div className="store-products">
          {products.map((p, i) => (
            <article key={p[0]}>
              <img src={p[2]} alt={p[0]} />
              <b>{p[0]}</b>
              <span>${p[1]}</span>
              <button
                onClick={() =>
                  setCart([
                    ...cart,
                    { id: Date.now() + i, name: p[0], price: p[1] },
                  ])
                }
              >
                {word(lang, "Add to bag", "افزودن به سبد")} <Plus size={14} />
              </button>
            </article>
          ))}
        </div>
        <div className="cart-line">
          <b>
            {word(lang, "YOUR BAG ·", "سبد خرید ·")} {cart.length}{" "}
            {word(lang, "ITEMS", "مورد")}
          </b>
          <span>${cart.reduce((a, b) => a + b.price, 0)}</span>
          <button onClick={() => setCart([])}>
            {word(lang, "Clear bag", "خالی کردن سبد")}
          </button>
        </div>
      </div>
    </DemoShell>
  );
}
function AnalyticsDemo() {
  const { lang } = useSite();
  const [period, setPeriod] = useState("Week");
  const values =
    period === "Week"
      ? [28, 48, 38, 68, 54, 82, 62]
      : period === "Month"
        ? [35, 44, 58, 48, 72, 66, 90]
        : [18, 32, 42, 38, 60, 76, 94];
  return (
    <DemoShell>
      <div className="analytics-demo">
        <div className="demo-heading">
          <div>
            <small>
              {word(lang, "OVERVIEW / PERFORMANCE", "نمای کلی / عملکرد")}
            </small>
            <h3>{word(lang, "Good morning, Alex", "صبح بخیر، الکس")}</h3>
          </div>
          <select value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="Week">{word(lang, "Week", "هفته")}</option>
            <option value="Month">{word(lang, "Month", "ماه")}</option>
            <option value="Year">{word(lang, "Year", "سال")}</option>
          </select>
        </div>
        <div className="kpi-grid">
          <div>
            <small>{word(lang, "REVENUE", "درآمد")}</small>
            <b>$24,680</b>
            <span>↗ 12.8%</span>
          </div>
          <div>
            <small>{word(lang, "ACTIVE USERS", "کاربران فعال")}</small>
            <b>8,492</b>
            <span>↗ 8.2%</span>
          </div>
          <div>
            <small>{word(lang, "CONVERSION", "نرخ تبدیل")}</small>
            <b>4.86%</b>
            <span>↗ 2.4%</span>
          </div>
        </div>
        <div className="chart-card">
          <div>
            <b>{word(lang, "Traffic overview", "نمای کلی بازدید")}</b>
            <small>Visitors · {period}</small>
          </div>
          <div className="bars">
            {values.map((v, i) => (
              <div key={i}>
                <i style={{ height: v + "%" }} />
                <small>{["M", "T", "W", "T", "F", "S", "S"][i]}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
function BookingDemo() {
  const { lang } = useSite();
  const [date, setDate] = useState("2026-11-04");
  const [guests, setGuests] = useState(2);
  const [confirmed, setConfirmed] = useState(false);
  return (
    <DemoShell>
      <div className="booking-demo">
        <div>
          <small>
            SONDER / {word(lang, "YOUR NEXT STAY", "اقامت بعدی شما")}
          </small>
          <h3>
            {word(lang, "Make room", "جا باز کن")}
            <br />
            {word(lang, "for", "برای")}{" "}
            <em>{word(lang, "somewhere new.", "یک جای تازه.")}</em>
          </h3>
          <p>
            {word(
              lang,
              "Choose your dates and the number of guests.",
              "تاریخ و تعداد مهمان‌ها رو انتخاب کن.",
            )}
          </p>
        </div>
        <div className="booking-form">
          <label>
            {word(lang, "CHECK-IN", "تاریخ ورود")}
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setConfirmed(false);
              }}
            />
          </label>
          <label>
            {word(lang, "GUESTS", "مهمان‌ها")}
            <div className="stepper">
              <button onClick={() => setGuests(Math.max(1, guests - 1))}>
                −
              </button>
              <b>{guests}</b>
              <button onClick={() => setGuests(Math.min(8, guests + 1))}>
                +
              </button>
            </div>
          </label>
          <button className="demo-primary" onClick={() => setConfirmed(true)}>
            {word(lang, "Find a stay", "جستجوی اقامت")} <ArrowRight size={15} />
          </button>
          {confirmed && (
            <p className="success-msg">
              <CheckCircle2 size={15} /> Stay search ready for {guests} guests ·{" "}
              {date}
            </p>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
function TasksDemo() {
  const { lang } = useSite();
  const [tasks, setTasks] = useLocal("tasks", initial.tasks);
  const [text, setText] = useState("");
  const add = () => {
    if (text.trim()) {
      setTasks([...tasks, { id: Date.now(), text: text.trim(), done: false }]);
      setText("");
    }
  };
  return (
    <DemoShell>
      <div className="tasks-demo">
        <div className="demo-heading">
          <div>
            <small>DAYFORM / {word(lang, "MY SPACE", "فضای من")}</small>
            <h3>
              {word(lang, "Today, made lighter.", "امروز رو ساده‌تر کن.")}
            </h3>
          </div>
          <span>
            {tasks.filter((x) => x.done).length}/{tasks.length} done
          </span>
        </div>
        <div className="task-progress">
          <i
            style={{
              width:
                (tasks.length
                  ? (tasks.filter((x) => x.done).length / tasks.length) * 100
                  : 0) + "%",
            }}
          />
        </div>
        <div className="task-add">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder={word(
              lang,
              "Add something to your day...",
              "کاری به برنامه امروزت اضافه کن...",
            )}
          />
          <button onClick={add}>
            <Plus size={17} />
          </button>
        </div>
        <div className="task-list">
          {tasks.map((x) => (
            <div key={x.id} className={x.done ? "is-done" : ""}>
              <button
                className="task-check"
                onClick={() =>
                  setTasks(
                    tasks.map((t) =>
                      t.id === x.id ? { ...t, done: !t.done } : t,
                    ),
                  )
                }
              >
                {x.done && <Check size={13} />}
              </button>
              <span>{x.text}</span>
              <button
                className="task-delete"
                onClick={() => setTasks(tasks.filter((t) => t.id !== x.id))}
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </DemoShell>
  );
}
function InvoiceDemo() {
  const { lang } = useSite();
  const [items, setItems] = useLocal("invoices", [
    { id: 1, name: "Website design", qty: 1, price: 850 },
    { id: 2, name: "Development", qty: 1, price: 1200 },
  ]);
  const total = items.reduce((s, x) => s + x.qty * x.price, 0);
  return (
    <DemoShell>
      <div className="invoice-demo">
        <div className="invoice-head">
          <div>
            <small>
              LEDGER / {word(lang, "INVOICE BUILDER", "ساخت فاکتور")}
            </small>
            <h3>
              {word(lang, "Invoice", "فاکتور")} <em>#2026-014</em>
            </h3>
          </div>
          <span>DRAFT</span>
        </div>
        <div className="invoice-meta">
          <div>
            <small>{word(lang, "FROM", "از طرف")}</small>
            <b>Adrian Hafezi</b>
            <span>adrian@example.com</span>
          </div>
          <div>
            <small>{word(lang, "BILL TO", "صورتحساب برای")}</small>
            <b>Alex Morgan</b>
            <span>alex@studio.co</span>
          </div>
        </div>
        <div className="invoice-items">
          {items.map((x) => (
            <div key={x.id}>
              <span>{x.name}</span>
              <span>
                {x.qty} × ${x.price}
              </span>
              <b>${x.qty * x.price}</b>
              <button
                onClick={() => setItems(items.filter((y) => y.id !== x.id))}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
        <button
          className="invoice-add"
          onClick={() =>
            setItems([
              ...items,
              {
                id: Date.now(),
                name: word(lang, "New service", "خدمت جدید"),
                qty: 1,
                price: 250,
              },
            ])
          }
        >
          <Plus size={14} /> {word(lang, "Add line item", "افزودن ردیف")}
        </button>
        <div className="invoice-total">
          <span>{word(lang, "Total due", "مبلغ نهایی")}</span>
          <b>${total.toLocaleString()}</b>
        </div>
      </div>
    </DemoShell>
  );
}
function EstateDemo() {
  const { lang } = useSite();
  const [filter, setFilter] = useState("All");
  const [favs, setFavs] = useLocal("favs", []);
  const list = initial.properties.filter(
    (p) => filter === "All" || p.type === filter,
  );
  return (
    <DemoShell>
      <div className="estate-demo">
        <div className="demo-heading">
          <div>
            <small>
              HAVEN / {word(lang, "FIND YOUR PLACE", "خانه‌ات رو پیدا کن")}
            </small>
            <h3>{word(lang, "Space to feel at home.", "جایی برای آرامش.")}</h3>
          </div>
          <span>03 LISTINGS</span>
        </div>
        <div className="filter-pills">
          {["All", "House", "Apartment"].map((x) => (
            <button
              className={filter === x ? "selected" : ""}
              onClick={() => setFilter(x)}
            >
              {word(
                lang,
                x,
                { All: "همه", House: "خانه", Apartment: "آپارتمان" }[x],
              )}
            </button>
          ))}
        </div>
        <div className="estate-list">
          {list.map((p, i) => (
            <article key={p.id}>
              <img
                src={
                  [
                    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/ec/e1/38/the-cedar-house-inn.jpg?w=700&h=400&s=1",
                    "https://images.adsttc.com/media/images/63fc/dbf5/2b86/6c1c/c2da/9c40/slideshow/house-of-light-well-n-yd-architects_1.jpg?1677515803",
                    "https://wildadriaticway.com/wp-content/uploads/2023/10/Villa_Casa_Sol_1.webp",
                  ][p.id - 1]
                }
                alt={p.name}
              />
              <div>
                <small>
                  {p.type} · {p.city}
                </small>
                <b>{p.name}</b>
                <strong>${p.price.toLocaleString()}</strong>
              </div>
              <button
                onClick={() =>
                  setFavs(
                    favs.includes(p.id)
                      ? favs.filter((x) => x !== p.id)
                      : [...favs, p.id],
                  )
                }
              >
                {favs.includes(p.id) ? "♥" : "♡"}
              </button>
            </article>
          ))}
        </div>
        <small>{favs.length} SAVED FAVORITES</small>
      </div>
    </DemoShell>
  );
}
function RestaurantDemo() {
  const { lang } = useSite();
  const [cart, setCart] = useLocal("foodcart", []);
  const menu = [
    ["Roasted tomato pasta", 16],
    ["Crispy garden bowl", 13],
    ["Miso glazed salmon", 21],
  ];
  const count = cart.reduce((s, x) => s + x.qty, 0);
  return (
    <DemoShell>
      <div className="restaurant-demo">
        <div className="restaurant-banner">
          <small>
            MORROW / {word(lang, "SEASONAL KITCHEN", "آشپزخانه فصلی")}
          </small>
          <h3>
            {word(lang, "Fresh plates.", "غذای تازه.")}
            <br />
            <em>{word(lang, "Good company.", "همراهی خوب.")}</em>
          </h3>
          <p>
            {word(
              lang,
              "Thoughtful ingredients, uncomplicated food.",
              "مواد اولیه باکیفیت و غذایی ساده و خوش‌طعم.",
            )}
          </p>
        </div>
        <div className="menu-list">
          {menu.map((x, i) => (
            <div>
              <span className="food-number">0{i + 1}</span>
              <b>
                {x[0]}
                <small>Seasonal · made fresh</small>
              </b>
              <strong>${x[1]}</strong>
              <button
                onClick={() =>
                  setCart([
                    ...cart,
                    { id: Date.now() + i, name: x[0], price: x[1], qty: 1 },
                  ])
                }
              >
                <Plus size={15} />
              </button>
            </div>
          ))}
        </div>
        <div className="food-total">
          <span>{count} items in your order</span>
          <b>${cart.reduce((s, x) => s + x.price * x.qty, 0)}</b>
          <button onClick={() => setCart([])}>Clear</button>
        </div>
      </div>
    </DemoShell>
  );
}
function CourseDemo() {
  const { lang } = useSite();
  const [lessons, setLessons] = useLocal("lessons", initial.lessons);
  const done = lessons.filter((x) => x.done).length;
  return (
    <DemoShell>
      <div className="course-demo">
        <div className="course-cover">
          <small>LUMA / {word(lang, "LEARNING PATH", "مسیر یادگیری")}</small>
          <span>01 — 03</span>
          <h3>
            {word(lang, "Build things", "چیزهایی بساز")}
            <br />
            <em>{word(lang, "that matter.", "که ارزشمندند.")}</em>
          </h3>
          <p>
            {word(
              lang,
              "Product design & development essentials",
              "مبانی طراحی و توسعه محصول",
            )}
          </p>
        </div>
        <div className="course-progress">
          <span>{word(lang, "YOUR PROGRESS", "پیشرفت شما")}</span>
          <b>{Math.round((done / lessons.length) * 100)}%</b>
        </div>
        <div className="lesson-list">
          {lessons.map((x, i) => (
            <button
              onClick={() =>
                setLessons(
                  lessons.map((y) =>
                    y.id === x.id ? { ...y, done: !y.done } : y,
                  ),
                )
              }
            >
              <span>
                {x.done ? (
                  <CheckCircle2 />
                ) : (
                  <span className="lesson-num">0{i + 1}</span>
                )}
              </span>
              <b>
                {x.title}
                <small>
                  {x.done
                    ? word(lang, "Completed", "تکمیل‌شده")
                    : word(
                        lang,
                        "Mark as complete",
                        "علامت‌گذاری به‌عنوان تکمیل",
                      )}
                </small>
              </b>
              <ChevronRight />
            </button>
          ))}
        </div>
      </div>
    </DemoShell>
  );
}
function CrmDemo() {
  const { lang } = useSite();
  const [clients, setClients] = useLocal("clients", initial.clients);
  const [q, setQ] = useState("");
  const [name, setName] = useState("");
  const [stage, setStage] = useState("Lead");
  const filtered = clients.filter((x) =>
    (x.name + x.email).toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <DemoShell>
      <div className="crm-demo">
        <div className="demo-heading">
          <div>
            <small>RELAY / {word(lang, "RELATIONSHIPS", "ارتباط‌ها")}</small>
            <h3>
              {word(lang, "Your people, in one place.", "مخاطبانت، یک‌جا.")}
            </h3>
          </div>
          <b>{clients.length} CONTACTS</b>
        </div>
        <div className="crm-add">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={word(lang, "New client name", "نام مشتری جدید")}
          />
          <select value={stage} onChange={(e) => setStage(e.target.value)}>
            <option>Lead</option>
            <option>Active</option>
            <option>Proposal</option>
          </select>
          <button
            onClick={() => {
              if (name.trim()) {
                setClients([
                  ...clients,
                  {
                    id: Date.now(),
                    name,
                    email:
                      name.toLowerCase().replaceAll(" ", "") + "@example.com",
                    stage,
                  },
                ]);
                setName("");
              }
            }}
          >
            <Plus size={15} />
          </button>
        </div>
        <div className="crm-search">
          <Search size={15} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={word(lang, "Search contacts...", "جستجوی مخاطبان...")}
          />
        </div>
        <div className="crm-list">
          {filtered.map((x) => (
            <div>
              <span className="avatar-mini">
                {x.name
                  .split(" ")
                  .map((y) => y[0])
                  .join("")}
              </span>
              <b>
                {x.name}
                <small>{x.email}</small>
              </b>
              <select
                value={x.stage}
                onChange={(e) =>
                  setClients(
                    clients.map((y) =>
                      y.id === x.id ? { ...y, stage: e.target.value } : y,
                    ),
                  )
                }
              >
                <option>Lead</option>
                <option>Active</option>
                <option>Proposal</option>
              </select>
              <button
                onClick={() => setClients(clients.filter((y) => y.id !== x.id))}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </DemoShell>
  );
}
function PortfolioDemo() {
  const { lang } = useSite();
  const [c, setC] = useState("All");
  const items = [
    [
      "Identity system",
      "Branding",
      "https://images.unsplash.com/photo-1634942536790-253d4f9c8e1b?w=700",
    ],
    [
      "Quiet spaces",
      "Art direction",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=700",
    ],
    [
      "Object studies",
      "Product",
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=700",
    ],
    [
      "Soft geometry",
      "Art direction",
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=700",
    ],
  ];
  return (
    <DemoShell>
      <div className="creative-demo">
        <div className="demo-heading">
          <div>
            <small>
              CANVAS / {word(lang, "SELECTED STORIES", "داستان‌های منتخب")}
            </small>
            <h3>
              {word(lang, "Ideas made visible.", "ایده‌ها رو به تصویر بکش.")}
            </h3>
          </div>
          <span>2024 — 2026</span>
        </div>
        <div className="filter-pills">
          {["All", "Branding", "Art direction", "Product"].map((x) => (
            <button
              className={c === x ? "selected" : ""}
              onClick={() => setC(x)}
            >
              {word(
                lang,
                x,
                {
                  All: "همه",
                  Branding: "هویت بصری",
                  "Art direction": "کارگردانی هنری",
                  Product: "محصول",
                }[x],
              )}
            </button>
          ))}
        </div>
        <div className="creative-grid">
          {items
            .filter((x) => c === "All" || x[1] === c)
            .map((x) => (
              <article>
                <img src={x[2]} alt={x[0]} />
                <div>
                  <b>{x[0]}</b>
                  <small>{x[1]}</small>
                </div>
              </article>
            ))}
        </div>
      </div>
    </DemoShell>
  );
}
const demoMap = {
  commerce: StoreDemo,
  studio: AnalyticsDemo,
  booking: BookingDemo,
  tasks: TasksDemo,
  invoice: InvoiceDemo,
  estate: EstateDemo,
  restaurant: RestaurantDemo,
  course: CourseDemo,
  crm: CrmDemo,
  portfolio: PortfolioDemo,
};
function ProjectPage({ id }) {
  const { lang, t } = useSite();
  const p = projects.find((x) => x.id === id);
  const root = useMotion();
  if (!p) return <Home />;
  const Demo = demoMap[id];
  return (
    <main ref={root} className="project-page">
      <Header />
      <div className="project-page-wrap section-wrap">
        <a className="back-link" href="#work">
          <ArrowLeft size={16} />
          {t.back}
        </a>
        <div className="project-hero" data-reveal>
          <span className="project-page-num">
            {p.n} / 10 · {p.type[lang]}
          </span>
          <h1>{p.title[lang]}</h1>
          <p>{p.desc[lang]}</p>
          <div className="project-page-meta">
            <span>REACT</span>
            <span>GSAP MOTION</span>
            <span>LOCAL STORAGE</span>
            <span>RESPONSIVE</span>
          </div>
        </div>
        <div className="demo-heading-label" data-reveal>
          {t.tryIt}
        </div>
        <Demo />
      </div>
      <Footer />
      <TopProgress />
    </main>
  );
}
function App() {
  const [route, setRoute] = useState(location.hash);
  useEffect(() => {
    const f = () => setRoute(location.hash);
    addEventListener("hashchange", f);
    return () => removeEventListener("hashchange", f);
  }, []);
  const id = route.startsWith("#project/") ? route.split("/")[1] : null;
  return <SiteProvider>{id ? <ProjectPage id={id} /> : <Home />}</SiteProvider>;
}

createRoot(document.getElementById("root")).render(<App />);
