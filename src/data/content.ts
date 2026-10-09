// Content shared by the website (App.svelte) and the printable CV (src/cv/Cv.svelte).
// After changing anything here, run `npm run cv` to regenerate the CV PDFs.

export type Lang = 'en' | 'id';
export type Localized = Record<Lang, string>;
export type YearMonth = { y: number; m: number };

export type ExperienceId =
  | 'taiwan-mobile'
  | 'sisi'
  | '1980media'
  | 'freelance-2025'
  | 'indosistem-2022'
  | 'k-appraisal'
  | 'choir-express'
  | 'indosistem-2021'
  | 'merah-putih-media';
export type CategoryKey = 'enterprise' | 'erp' | 'hr' | 'booking' | 'commerce' | 'media';
export type SkillGroupKey = 'frontend' | 'backend' | 'databases' | 'tools';

export interface Profile {
  name: string;
  initials: string;
  role: string;
  specialties: string[];
  location: string;
  careerStart: YearMonth;
  contact: {
    email: string;
    /** International format without "+", used for wa.me links. */
    whatsapp: string;
    whatsappDisplay: string;
    linkedin: string;
    linkedinDisplay: string;
  };
}

export interface SkillGroup {
  key: SkillGroupKey;
  items: string[];
}

export interface Experience {
  id: ExperienceId;
  title: string;
  company: string;
  start: YearMonth;
  /** null = current position */
  end: YearMonth | null;
  location: string | null;
  duties: Localized[];
}

export interface Education {
  school: string;
  degree: Localized;
  start: number;
  end: number;
  location: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: number;
}

export interface Language {
  name: Localized;
  level: Localized;
}

export interface ProjectInput {
  title: string;
  exp: ExperienceId;
  category: CategoryKey;
  desc: Localized;
  tech: string[];
}

export interface Project extends ProjectInput {
  key: number;
  company: string;
}
// =====================================================================
// PROFILE  (source: LinkedIn Profile.pdf; contact set by the owner)
// =====================================================================

export const profile: Profile = {
  name: 'Rohmatuloh',
  initials: 'R',
  role: 'Web Developer',
  specialties: ['Odoo', 'Spring Boot', 'Node.js', 'React', 'Vue', 'PHP'],
  location: 'Tangerang, Indonesia',
  careerStart: { y: 2018, m: 4 },
  contact: {
    email: 'rahmat.noble@gmail.com',
    whatsapp: '6283876854003',
    whatsappDisplay: '+62 838-7685-4003',
    linkedin: 'https://www.linkedin.com/in/moh-rahmatullah-b531b7163',
    linkedinDisplay: 'linkedin.com/in/moh-rahmatullah-b531b7163',
  },
};

export const whatsappUrl = `https://wa.me/${profile.contact.whatsapp}`;
export const mailtoUrl = `mailto:${profile.contact.email}`;

// =====================================================================
// SKILLS
// =====================================================================

export const skillGroups: SkillGroup[] = [
  {
    key: 'frontend',
    items: ['React.js', 'Next.js', 'Vue.js', 'JavaScript', 'TypeScript', 'Inertia.js', 'Odoo OWL', 'EasyUI', 'Bulma CSS', 'EJS', 'Ajax'],
  },
  {
    key: 'backend',
    items: [
      'Java Spring Boot',
      'Odoo',
      'PHP',
      'Laravel',
      'Lumen',
      'CodeIgniter',
      'Node.js',
      'NestJS',
      'Express.js',
      'Python',
      'FastAPI',
      'Django',
      'Python Tkinter',
      'REST API',
      'Microservices',
      'BullMQ',
    ],
  },
  {
    key: 'databases',
    items: ['PostgreSQL', 'MySQL / MariaDB', 'SQL Server', 'Oracle', 'MongoDB', 'Redis'],
  },
  {
    key: 'tools',
    items: ['Docker', 'Git', 'Linux', 'NPM', 'Yarn', 'PNPM', 'Apache', 'Nginx', 'Windows'],
  },
];
// =====================================================================
// EXPERIENCE  (end: null = present)
// =====================================================================

export const experience: Experience[] = [
  {
    id: 'taiwan-mobile',
    title: 'Remote Developer',
    company: 'Taiwan Mobile',
    start: { y: 2025, m: 8 },
    end: null,
    location: null,
    duties: [],
  },
  {
    id: 'sisi',
    title: 'Web Developer',
    company: 'PT Sinergi Informatika Semen Indonesia (SISI)',
    start: { y: 2022, m: 12 },
    end: { y: 2026, m: 9 },
    location: 'South Jakarta, Jakarta, Indonesia',
    duties: [
      { en: 'Developed application source code as a fullstack, Odoo and web developer', id: 'Mengembangkan source code aplikasi sebagai fullstack, Odoo, dan web developer' },
      { en: 'Designed database structures', id: 'Merancang struktur database' },
      { en: 'Built RESTful APIs and fixed application issues', id: 'Membangun RESTful API dan memperbaiki kendala aplikasi' },
    ],
  },
  {
    id: '1980media',
    title: 'Web Developer',
    company: '1980Media | PT. Digital Media Konsultama',
    start: { y: 2025, m: 5 },
    end: { y: 2025, m: 8 },
    location: null,
    duties: [],
  },
  {
    id: 'freelance-2025',
    title: 'Frontend Developer',
    company: 'Freelance',
    start: { y: 2025, m: 6 },
    end: { y: 2025, m: 7 },
    location: null,
    duties: [],
  },
  {
    id: 'indosistem-2022',
    title: 'Web Developer',
    company: 'PT Indosistem Teknologi Utama',
    start: { y: 2022, m: 11 },
    end: { y: 2025, m: 5 },
    location: 'West Jakarta, Jakarta, Indonesia',
    duties: [
      { en: 'Also worked as a Django developer', id: 'Juga berperan sebagai Django developer' },
    ],
  },
  {
    id: 'k-appraisal',
    title: 'Programmer',
    company: 'KJPP Karmanto dan Rekan (K-Appraisal)',
    start: { y: 2022, m: 6 },
    end: { y: 2022, m: 9 },
    location: 'South Jakarta, Jakarta, Indonesia',
    duties: [
      { en: 'Developed source code and built RESTful APIs', id: 'Mengembangkan source code dan membangun RESTful API' },
      { en: 'Fixed application issues and managed code with Git', id: 'Memperbaiki kendala aplikasi dan mengelola kode dengan Git' },
    ],
  },
  {
    id: 'choir-express',
    title: 'Back End Developer',
    company: 'Choir Express (PT Fia Express Indonesia)',
    start: { y: 2022, m: 1 },
    end: { y: 2022, m: 6 },
    location: 'South Jakarta, Jakarta, Indonesia',
    duties: [
      { en: 'Integrated the Xendit payment gateway', id: 'Mengintegrasikan payment gateway Xendit' },
      { en: 'Built RESTful APIs and managed code with Git', id: 'Membangun RESTful API dan mengelola kode dengan Git' },
    ],
  },
  {
    id: 'indosistem-2021',
    title: 'Web Developer',
    company: 'PT Indosistem Teknologi Utama',
    start: { y: 2021, m: 1 },
    end: { y: 2022, m: 1 },
    location: null,
    duties: [],
  },
  {
    id: 'merah-putih-media',
    title: 'Back End Developer',
    company: 'PT. Merah Putih Media',
    start: { y: 2018, m: 4 },
    end: { y: 2021, m: 1 },
    location: 'Tangerang, Banten, Indonesia',
    duties: [
      { en: 'Built content management systems and integrated databases with the frontend', id: 'Membangun content management system dan mengintegrasikan database dengan frontend' },
      { en: 'Designed database structures and built RESTful APIs', id: 'Merancang struktur database dan membangun RESTful API' },
    ],
  },
];
experience.sort((a, b) => b.start.y * 12 + b.start.m - (a.start.y * 12 + a.start.m));

// =====================================================================
// EDUCATION & CERTIFICATIONS
// =====================================================================

export const education: Education[] = [
  {
    school: 'Politeknik Piksi Input Serang',
    degree: { en: 'Associate Degree (DIII), Informatics Management', id: 'DIII, Manajemen Informatika' },
    start: 2013,
    end: 2016,
    location: 'Serang, Banten',
  },
  {
    school: 'SMK Negeri 1 Pandeglang',
    degree: { en: 'Software Engineering (Vocational High School)', id: 'Rekayasa Perangkat Lunak (SMK)' },
    start: 2007,
    end: 2010,
    location: 'Pandeglang, Banten',
  },
];

// Profile.pdf lists no certifications; the block renders only when this has entries.
export const certifications: Certification[] = [];

// =====================================================================
// PROJECTS  (exp = experience id; listed newest position first)
// =====================================================================

export const categories: Record<CategoryKey, Localized> = {
  enterprise: { en: 'Enterprise & Telco', id: 'Enterprise & Telko' },
  erp: { en: 'ERP & Business', id: 'ERP & Bisnis' },
  hr: { en: 'HR & HCMS', id: 'SDM & HCMS' },
  booking: { en: 'Booking & Scheduling', id: 'Booking & Penjadwalan' },
  commerce: { en: 'E-commerce & POS', id: 'E-commerce & POS' },
  media: { en: 'Media & Web', id: 'Media & Web' },
};

const projectData: ProjectInput[] = [
  // Taiwan Mobile
  {
    title: 'OSPF',
    exp: 'taiwan-mobile',
    category: 'enterprise',
    desc: { en: 'Monolithic enterprise application for Taiwan Mobile built with Java Spring Boot on Redis, PostgreSQL and Oracle.', id: 'Aplikasi enterprise monolitik untuk Taiwan Mobile dengan Java Spring Boot di atas Redis, PostgreSQL, dan Oracle.' },
    tech: ['Java Spring Boot', 'Redis', 'PostgreSQL', 'Oracle', 'Monolith'],
  },
  {
    title: 'Opbiz',
    exp: 'taiwan-mobile',
    category: 'enterprise',
    desc: { en: 'Monolithic business operations platform for Taiwan Mobile built with Java Spring Boot.', id: 'Platform operasional bisnis monolitik untuk Taiwan Mobile dengan Java Spring Boot.' },
    tech: ['Java Spring Boot', 'Redis', 'PostgreSQL', 'Oracle', 'Monolith'],
  },
  {
    title: 'Opbiz Intra',
    exp: 'taiwan-mobile',
    category: 'enterprise',
    desc: { en: 'Internal Opbiz application exposing REST APIs, built with Java Spring Boot on Oracle and PostgreSQL.', id: 'Aplikasi internal Opbiz yang menyediakan REST API, dibangun dengan Java Spring Boot di atas Oracle dan PostgreSQL.' },
    tech: ['Java Spring Boot', 'Oracle', 'PostgreSQL', 'REST API'],
  },
  {
    title: 'EBGEM Service',
    exp: 'taiwan-mobile',
    category: 'enterprise',
    desc: { en: 'Microservices system combining Spring Boot and Node.js backends with React, Next.js and Vue frontends.', id: 'Sistem microservices yang menggabungkan backend Spring Boot dan Node.js dengan frontend React, Next.js, dan Vue.' },
    tech: ['React.js', 'Node.js', 'TypeScript', 'Java Spring Boot', 'Next.js', 'Express.js', 'Vue.js', 'PostgreSQL', 'Redis', 'Microservices'],
  },
  // Freelance
  {
    title: 'Kejagung App',
    exp: 'freelance-2025',
    category: 'media',
    desc: { en: 'Frontend development of a web application for Kejagung (Attorney General’s Office of Indonesia).', id: 'Pengembangan frontend aplikasi web untuk Kejaksaan Agung (Kejagung).' },
    tech: ['Next.js'],
  },
  // 1980Media
  {
    title: 'Cooperative Application',
    exp: '1980media',
    category: 'erp',
    desc: { en: 'Cooperative (koperasi) management application, containerised with Docker.', id: 'Aplikasi manajemen koperasi yang dijalankan dalam container Docker.' },
    tech: ['CodeIgniter', 'EasyUI', 'MySQL', 'Docker'],
  },
  // SISI
  {
    title: 'Mind ID E-Proc — Contract Management System',
    exp: 'sisi',
    category: 'enterprise',
    desc: { en: 'Fullstack development of the Contract Management System module of the MIND ID e-procurement platform.', id: 'Pengembangan fullstack modul Contract Management System pada platform e-procurement MIND ID.' },
    tech: ['React.js', 'Laravel'],
  },
  {
    title: 'Forca HR — LSP Module',
    exp: 'sisi',
    category: 'hr',
    desc: { en: 'Odoo development of the LSP module in Forca HR for SIG Group.', id: 'Pengembangan modul LSP di Forca HR untuk SIG Group menggunakan Odoo.' },
    tech: ['Odoo'],
  },
  {
    title: 'Travel Request — PT ABM',
    exp: 'sisi',
    category: 'hr',
    desc: { en: 'Fullstack business-travel request application for PT ABM.', id: 'Aplikasi pengajuan perjalanan dinas (fullstack) untuk PT ABM.' },
    tech: ['Vue.js', 'Laravel'],
  },
  {
    title: 'Travel Request — PTPN IV',
    exp: 'sisi',
    category: 'hr',
    desc: { en: 'Fullstack business-travel request application for PT Perkebunan Nusantara IV.', id: 'Aplikasi pengajuan perjalanan dinas (fullstack) untuk PT Perkebunan Nusantara IV.' },
    tech: ['Vue.js', 'Laravel'],
  },
  {
    title: 'HCMS — PT Wijaya Karya',
    exp: 'sisi',
    category: 'hr',
    desc: { en: 'Human Capital Management System for PT Wijaya Karya (WIKA) as part of its human-capital digitalisation program.', id: 'Human Capital Management System untuk PT Wijaya Karya (WIKA) dalam program digitalisasi human capital.' },
    tech: ['PHP', 'EasyUI'],
  },
  {
    title: 'HCMS — PT Adhi Karya',
    exp: 'sisi',
    category: 'hr',
    desc: { en: 'Human Capital Management System for PT Adhi Karya as part of its human-capital digitalisation program.', id: 'Human Capital Management System untuk PT Adhi Karya dalam program digitalisasi human capital.' },
    tech: ['PHP', 'EasyUI'],
  },
  // Indosistem 2022–2025
  {
    title: 'Scheduler Overbooking',
    exp: 'indosistem-2022',
    category: 'booking',
    desc: { en: 'Queue-based scheduler that handles booking overbooking jobs.', id: 'Scheduler berbasis antrian untuk menangani proses overbooking pemesanan.' },
    tech: ['NestJS', 'TypeScript', 'BullMQ'],
  },
  {
    title: 'Booking Agent RESTful API',
    exp: 'indosistem-2022',
    category: 'booking',
    desc: { en: 'RESTful API service for a booking-agent platform.', id: 'Layanan RESTful API untuk platform booking agent.' },
    tech: ['FastAPI'],
  },
  {
    title: 'Booking Agent Dashboard',
    exp: 'indosistem-2022',
    category: 'booking',
    desc: { en: 'Web dashboard for managing booking-agent operations.', id: 'Dashboard web untuk mengelola operasional booking agent.' },
    tech: ['Laravel'],
  },
  {
    title: 'Desktop Dashboard PC',
    exp: 'indosistem-2022',
    category: 'media',
    desc: { en: 'Desktop dashboard application for PC.', id: 'Aplikasi dashboard desktop untuk PC.' },
    tech: ['Python Tkinter'],
  },
  {
    title: 'HRM Application',
    exp: 'indosistem-2022',
    category: 'hr',
    desc: { en: 'Human resource management web application.', id: 'Aplikasi web manajemen sumber daya manusia.' },
    tech: ['Express.js', 'EJS'],
  },
  {
    title: 'Cooperative Dashboard',
    exp: 'indosistem-2022',
    category: 'erp',
    desc: { en: 'Cooperative (koperasi) dashboard built as a Laravel + React single-page app with Inertia.js.', id: 'Dashboard koperasi berbasis Laravel + React dengan Inertia.js.' },
    tech: ['Laravel', 'Inertia.js', 'React.js'],
  },
  {
    title: 'Web ERP',
    exp: 'indosistem-2022',
    category: 'erp',
    desc: { en: 'Web-based enterprise resource planning application.', id: 'Aplikasi enterprise resource planning berbasis web.' },
    tech: ['PHP', 'Bulma CSS'],
  },
  {
    title: 'Point of Sale — Retail',
    exp: 'indosistem-2022',
    category: 'commerce',
    desc: { en: 'Web point-of-sale application for retail stores.', id: 'Aplikasi point of sale berbasis web untuk toko retail.' },
    tech: ['Laravel'],
  },
  {
    title: 'Point of Sale — Restaurant',
    exp: 'indosistem-2022',
    category: 'commerce',
    desc: { en: 'Web point-of-sale application for restaurants.', id: 'Aplikasi point of sale berbasis web untuk restoran.' },
    tech: ['CodeIgniter'],
  },
  // K-Appraisal
  {
    title: 'K-Appraisal Web App',
    exp: 'k-appraisal',
    category: 'media',
    desc: { en: 'Web application for the property-appraisal services of KJPP Karmanto dan Rekan.', id: 'Aplikasi web untuk layanan penilaian (appraisal) KJPP Karmanto dan Rekan.' },
    tech: ['RESTful API', 'Git'],
  },
  // Choir Express
  {
    title: 'Choir Express Marketplace',
    exp: 'choir-express',
    category: 'commerce',
    desc: { en: 'Marketplace web application with order handling and Xendit payment-gateway integration.', id: 'Aplikasi web marketplace dengan pengelolaan order dan integrasi payment gateway Xendit.' },
    tech: ['RESTful API', 'Xendit'],
  },
  {
    title: 'Choir Express Dashboard',
    exp: 'choir-express',
    category: 'media',
    desc: { en: 'Operations dashboard for Choir Express order and tracking information.', id: 'Dashboard operasional untuk informasi order dan tracking Choir Express.' },
    tech: ['RESTful API'],
  },
  // Indosistem 2021–2022
  {
    title: 'Web ERP (Asset Management)',
    exp: 'indosistem-2021',
    category: 'erp',
    desc: { en: 'Web ERP application covering asset management and related modules.', id: 'Aplikasi ERP berbasis web yang mencakup manajemen aset dan modul terkait.' },
    tech: ['ERP', 'Asset Management'],
  },
  // Merah Putih Media
  {
    title: 'News Portal',
    exp: 'merah-putih-media',
    category: 'media',
    desc: { en: 'News media portal with a custom CMS, backend, frontend and REST API.', id: 'Portal media berita dengan CMS, backend, frontend, dan REST API.' },
    tech: ['CMS', 'REST API'],
  },
  {
    title: 'Company Profile',
    exp: 'merah-putih-media',
    category: 'media',
    desc: { en: 'Company profile website with its own CMS and REST API.', id: 'Website company profile dengan CMS dan REST API sendiri.' },
    tech: ['CMS', 'REST API'],
  },
  {
    title: 'Marketplace & E-commerce',
    exp: 'merah-putih-media',
    category: 'commerce',
    desc: { en: 'Marketplace/e-commerce platform with CMS, Midtrans payment and RajaOngkir shipping integrations.', id: 'Platform marketplace/e-commerce dengan CMS, integrasi pembayaran Midtrans, dan ongkos kirim RajaOngkir.' },
    tech: ['CMS', 'RESTful API', 'Midtrans', 'RajaOngkir'],
  },
];

// Every ExperienceId has exactly one entry in `experience`, so these lookups are total.
const companyOf = Object.fromEntries(experience.map((e) => [e.id, e.company])) as Record<ExperienceId, string>;
const expOrder = Object.fromEntries(experience.map((e, i) => [e.id, i])) as Record<ExperienceId, number>;
export const projects: Project[] = projectData
  .map((p, i) => ({ ...p, key: i, company: companyOf[p.exp] }))
  .sort((a, b) => expOrder[a.exp] - expOrder[b.exp]);

export const langs: Lang[] = ['en', 'id'];
export const companyCount = new Set(experience.filter((e) => e.company !== 'Freelance').map((e) => e.company)).size;

// =====================================================================
// LANGUAGES  (source: curiculum-new.docx)
// =====================================================================

export const languages: Language[] = [
  { name: { en: 'Indonesian', id: 'Bahasa Indonesia' }, level: { en: 'Native', id: 'Penutur asli' } },
  { name: { en: 'English', id: 'Bahasa Inggris' }, level: { en: 'Passive', id: 'Pasif' } },
];

// =====================================================================
// SHARED TEXT & DATES
// =====================================================================

export const summary: Record<Lang, (years: number) => string> = {
  en: (y) =>
    `Web developer with ${y}+ years of experience in the IT industry, specializing in backend development. I enjoy building scalable, high-performance applications and crafting efficient backend solutions.`,
  id: (y) =>
    `Web developer dengan pengalaman ${y}+ tahun di industri IT, berfokus pada pengembangan backend. Saya senang membangun aplikasi yang skalabel dan berperforma tinggi serta merancang solusi backend yang efisien.`,
};

export const presentLabel: Localized = { en: 'Present', id: 'Sekarang' };

export const localeOf: Record<Lang, string> = { en: 'en-US', id: 'id-ID' };

export function currentMonth(): YearMonth {
  const now = new Date();
  return { y: now.getFullYear(), m: now.getMonth() + 1 };
}

/** Whole years since the first position. */
export function careerYears(now: YearMonth = currentMonth()): number {
  return Math.floor((now.y * 12 + now.m - (profile.careerStart.y * 12 + profile.careerStart.m)) / 12);
}

export function formatMonth(d: YearMonth, lang: Lang): string {
  return new Intl.DateTimeFormat(localeOf[lang], { month: 'short', year: 'numeric' }).format(new Date(d.y, d.m - 1));
}

export function formatPeriod(e: Experience, lang: Lang): string {
  return `${formatMonth(e.start, lang)} – ${e.end ? formatMonth(e.end, lang) : presentLabel[lang]}`;
}