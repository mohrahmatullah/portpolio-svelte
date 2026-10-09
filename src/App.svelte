<script lang="ts">
  import { flip } from 'svelte/animate';
  import { fade } from 'svelte/transition';
  // Per-icon imports keep dev/build fast (the barrel pulls in every Lucide icon).
  import ArrowRight from '@lucide/svelte/icons/arrow-right';
  import ArrowUp from '@lucide/svelte/icons/arrow-up';
  import Award from '@lucide/svelte/icons/award';
  import Briefcase from '@lucide/svelte/icons/briefcase';
  import Calendar from '@lucide/svelte/icons/calendar';
  import CircleAlert from '@lucide/svelte/icons/circle-alert';
  import CircleCheck from '@lucide/svelte/icons/circle-check';
  import CodeXml from '@lucide/svelte/icons/code-xml';
  import Database from '@lucide/svelte/icons/database';
  import Download from '@lucide/svelte/icons/download';
  import FolderKanban from '@lucide/svelte/icons/folder-kanban';
  import GraduationCap from '@lucide/svelte/icons/graduation-cap';
  import Languages from '@lucide/svelte/icons/languages';
  import Layers from '@lucide/svelte/icons/layers';
  import LoaderCircle from '@lucide/svelte/icons/loader-circle';
  import Mail from '@lucide/svelte/icons/mail';
  import MapPin from '@lucide/svelte/icons/map-pin';
  import Menu from '@lucide/svelte/icons/menu';
  import Monitor from '@lucide/svelte/icons/monitor';
  import Moon from '@lucide/svelte/icons/moon';
  import Send from '@lucide/svelte/icons/send';
  import Server from '@lucide/svelte/icons/server';
  import Sparkles from '@lucide/svelte/icons/sparkles';
  import Sun from '@lucide/svelte/icons/sun';
  import Wrench from '@lucide/svelte/icons/wrench';
  import X from '@lucide/svelte/icons/x';
  import {
    careerYears,
    categories,
    certifications,
    companyCount,
    currentMonth,
    education,
    experience,
    formatPeriod as formatPeriodIn,
    langs,
    mailtoUrl,
    presentLabel,
    profile,
    projects,
    skillGroups,
    summary,
    whatsappUrl,
    type CategoryKey,
    type Experience,
    type Lang,
    type Localized,
    type SkillGroupKey,
  } from './data/content';

  // =====================================================================
  // CONFIG
  // =====================================================================

  // Paste your Formspree endpoint here (e.g. 'https://formspree.io/f/abcdwxyz').
  // While empty, the contact form falls back to opening the visitor's email client.
  const FORMSPREE_ENDPOINT: string = '';


  // =====================================================================
  // TYPES
  // =====================================================================

  type Theme = 'light' | 'dark';
  type IconComponent = typeof Monitor;
  type ProjectFilter = 'all' | CategoryKey;
  type FormField = 'name' | 'email' | 'message';
  type FormStatus = 'idle' | 'sending' | 'success' | 'error' | 'mailto';

  // =====================================================================
  // CONTENT  (data lives in src/data/content.ts, shared with the CV)
  // =====================================================================

  const skillIcons: Record<SkillGroupKey, IconComponent> = {
    frontend: Monitor,
    backend: Server,
    databases: Database,
    tools: Wrench,
  };

  const categoryKeys = (Object.keys(categories) as CategoryKey[]).filter((k) => projects.some((p) => p.category === k));
  const filterKeys: ProjectFilter[] = ['all', ...categoryKeys];

  // =====================================================================
  // UI DICTIONARY
  // =====================================================================

  const en = {
    nav: { home: 'Home', about: 'About', skills: 'Skills', projects: 'Projects', experience: 'Experience', contact: 'Contact' },
    skipToContent: 'Skip to content',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    toDark: 'Switch to dark mode',
    toLight: 'Switch to light mode',
    language: 'Language',
    downloadCv: 'Download CV',
    contactMe: 'Contact Me',
    available: 'Open to new opportunities',
    hello: "Hi, I'm",
    summary: summary.en,
    stats: { years: 'Years of experience', projects: 'Projects delivered', companies: 'Companies' },
    about: {
      eyebrow: 'About me',
      title: 'Backend-focused engineer who ships end to end',
      p1: (y: number) =>
        `I'm Rohmatuloh, a web developer based in Tangerang, Indonesia, with ${y}+ years in the IT industry. My focus is backend development: designing databases, building RESTful APIs and microservices, and crafting reliable systems that scale.`,
      p2: 'My work spans enterprise applications for a telecom operator, e-procurement, ERP and cooperative systems, HR and human-capital platforms, booking engines, point-of-sale and e-commerce. Day to day I work with Java Spring Boot, Odoo, Laravel, Node.js (NestJS, Express.js), Python (FastAPI, Django), React, Next.js and Vue.',
      p3: "I'm passionate about solving complex problems and developing innovative backend systems, and I'm always open to collaborations, discussions and new opportunities.",
      highlights: {
        experience: 'Experience',
        experienceValue: (y: number) => `${y}+ years`,
        location: 'Location',
        focus: 'Focus',
        focusValue: 'Backend & fullstack web development',
        education: 'Education',
        educationValue: 'DIII Informatics Management',
        languages: 'Languages',
        languagesValue: 'Indonesian, English (passive)',
      },
    },
    skills: {
      eyebrow: 'Skills',
      title: 'Tech stack & expertise',
      subtitle: 'Technologies I have used in production across my roles.',
      groups: { frontend: 'Frontend', backend: 'Backend', databases: 'Databases', tools: 'Tools / DevOps' },
    },
    projects: {
      eyebrow: 'Portfolio',
      title: 'Selected projects',
      subtitle: 'Applications I have built or contributed to, grouped by domain.',
      all: 'All',
      filterLabel: 'Filter projects by category',
      showing: (n: number, total: number) => `Showing ${n} of ${total} projects`,
    },
    timeline: {
      eyebrow: 'Career',
      title: 'Experience & education',
      experience: 'Work experience',
      education: 'Education',
      certifications: 'Licenses & certifications',
      present: presentLabel.en,
      current: 'Current',
      keyProjects: 'Key projects',
      duration: (y: number, m: number) => [y ? `${y} yr${y > 1 ? 's' : ''}` : '', m ? `${m} mo${m > 1 ? 's' : ''}` : ''].filter(Boolean).join(' '),
    },
    contact: {
      eyebrow: 'Contact',
      title: "Let's work together",
      subtitle: 'Have a project, a role or just a question? Send me a message and I will get back to you.',
      email: 'Email',
      whatsapp: 'WhatsApp',
      linkedin: 'LinkedIn',
      location: 'Location',
      form: {
        name: 'Name',
        email: 'Email',
        subject: 'Subject',
        optional: 'optional',
        message: 'Message',
        namePh: 'Your name',
        emailPh: 'Your email address',
        subjectPh: 'Project inquiry',
        messagePh: 'Tell me about your project…',
        send: 'Send message',
        sending: 'Sending…',
      },
      errors: {
        nameRequired: 'Please enter your name.',
        emailRequired: 'Please enter your email address.',
        emailInvalid: 'Please enter a valid email address.',
        messageRequired: 'Please enter a message.',
        messageShort: 'Message must be at least 10 characters.',
      },
      status: {
        success: 'Thank you! Your message has been sent. I will reply soon.',
        error: 'Sorry, your message could not be sent. Please reach me directly:',
        mailto: 'Your email app has been opened with the message. Just press send.',
      },
      mailSubject: 'Portfolio contact',
    },
    footer: { rights: 'All rights reserved.', builtWith: 'Built with Svelte & Tailwind CSS.', backToTop: 'Back to top' },
  };

  /** Shape of the UI dictionary; every language must provide exactly these keys. */
  type Dictionary = typeof en;

  const id = {
    nav: { home: 'Beranda', about: 'Tentang', skills: 'Keahlian', projects: 'Proyek', experience: 'Pengalaman', contact: 'Kontak' },
    skipToContent: 'Langsung ke konten',
    openMenu: 'Buka menu',
    closeMenu: 'Tutup menu',
    toDark: 'Ganti ke mode gelap',
    toLight: 'Ganti ke mode terang',
    language: 'Bahasa',
    downloadCv: 'Unduh CV',
    contactMe: 'Hubungi Saya',
    available: 'Terbuka untuk peluang baru',
    hello: 'Halo, saya',
    summary: summary.id,
    stats: { years: 'Tahun pengalaman', projects: 'Proyek dikerjakan', companies: 'Perusahaan' },
    about: {
      eyebrow: 'Tentang saya',
      title: 'Engineer berfokus backend yang mengerjakan end to end',
      p1: (y: number) =>
        `Saya Rohmatuloh, web developer yang berbasis di Tangerang, Indonesia, dengan pengalaman ${y}+ tahun di industri IT. Fokus saya adalah pengembangan backend: merancang database, membangun RESTful API dan microservices, serta membuat sistem andal yang siap berkembang.`,
      p2: 'Pekerjaan saya mencakup aplikasi enterprise untuk operator telekomunikasi, e-procurement, ERP dan sistem koperasi, platform SDM dan human capital, sistem booking, point of sale, hingga e-commerce. Sehari-hari saya bekerja dengan Java Spring Boot, Odoo, Laravel, Node.js (NestJS, Express.js), Python (FastAPI, Django), React, Next.js, dan Vue.',
      p3: 'Saya senang memecahkan masalah kompleks dan mengembangkan sistem backend yang inovatif, serta selalu terbuka untuk kolaborasi, diskusi, dan peluang baru.',
      highlights: {
        experience: 'Pengalaman',
        experienceValue: (y: number) => `${y}+ tahun`,
        location: 'Lokasi',
        focus: 'Fokus',
        focusValue: 'Pengembangan web backend & fullstack',
        education: 'Pendidikan',
        educationValue: 'DIII Manajemen Informatika',
        languages: 'Bahasa',
        languagesValue: 'Indonesia, Inggris (pasif)',
      },
    },
    skills: {
      eyebrow: 'Keahlian',
      title: 'Tech stack & keahlian',
      subtitle: 'Teknologi yang saya gunakan di lingkungan produksi selama berkarier.',
      groups: { frontend: 'Frontend', backend: 'Backend', databases: 'Database', tools: 'Tools / DevOps' },
    },
    projects: {
      eyebrow: 'Portofolio',
      title: 'Proyek pilihan',
      subtitle: 'Aplikasi yang saya bangun atau ikut kembangkan, dikelompokkan per domain.',
      all: 'Semua',
      filterLabel: 'Filter proyek berdasarkan kategori',
      showing: (n: number, total: number) => `Menampilkan ${n} dari ${total} proyek`,
    },
    timeline: {
      eyebrow: 'Karier',
      title: 'Pengalaman & pendidikan',
      experience: 'Pengalaman kerja',
      education: 'Pendidikan',
      certifications: 'Lisensi & sertifikasi',
      present: presentLabel.id,
      current: 'Saat ini',
      keyProjects: 'Proyek utama',
      duration: (y: number, m: number) => [y ? `${y} thn` : '', m ? `${m} bln` : ''].filter(Boolean).join(' '),
    },
    contact: {
      eyebrow: 'Kontak',
      title: 'Mari bekerja sama',
      subtitle: 'Punya proyek, lowongan, atau sekadar pertanyaan? Kirim pesan dan saya akan segera membalas.',
      email: 'Email',
      whatsapp: 'WhatsApp',
      linkedin: 'LinkedIn',
      location: 'Lokasi',
      form: {
        name: 'Nama',
        email: 'Email',
        subject: 'Subjek',
        optional: 'opsional',
        message: 'Pesan',
        namePh: 'Nama Anda',
        emailPh: 'Alamat email Anda',
        subjectPh: 'Pertanyaan proyek',
        messagePh: 'Ceritakan tentang proyek Anda…',
        send: 'Kirim pesan',
        sending: 'Mengirim…',
      },
      errors: {
        nameRequired: 'Mohon isi nama Anda.',
        emailRequired: 'Mohon isi alamat email Anda.',
        emailInvalid: 'Mohon isi alamat email yang valid.',
        messageRequired: 'Mohon isi pesan.',
        messageShort: 'Pesan minimal 10 karakter.',
      },
      status: {
        success: 'Terima kasih! Pesan Anda telah terkirim. Saya akan segera membalas.',
        error: 'Maaf, pesan Anda gagal terkirim. Silakan hubungi saya langsung:',
        mailto: 'Aplikasi email Anda telah dibuka dengan pesan terisi. Tinggal tekan kirim.',
      },
      mailSubject: 'Kontak dari portofolio',
    },
    footer: { rights: 'Hak cipta dilindungi.', builtWith: 'Dibuat dengan Svelte & Tailwind CSS.', backToTop: 'Kembali ke atas' },
  } satisfies Dictionary;

  const content: Record<Lang, Dictionary> = { en, id };

  type ErrorKey = keyof Dictionary['contact']['errors'];
  type FormErrors = Partial<Record<FormField, ErrorKey>>;

  // =====================================================================
  // STATE
  // =====================================================================

  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const motion = reduceMotion ? 0 : 250;

  let theme = $state<Theme>(root.classList.contains('dark') ? 'dark' : 'light');
  let lang = $state<Lang>(root.lang === 'id' ? 'id' : 'en');
  let menuOpen = $state(false);
  let activeSection = $state('home');
  let activeFilter = $state<ProjectFilter>('all');

  let form = $state({ name: '', email: '', subject: '', message: '', _gotcha: '' });
  let errors = $state<FormErrors>({});
  let status = $state<FormStatus>('idle');

  const t = $derived(content[lang]);
  // CV PDFs in /public are generated from src/data/content.ts by `npm run cv`.
  const CV_FILENAME = $derived(`CV-Rohmatuloh-${lang.toUpperCase()}.pdf`);
  const CV_URL = $derived(`./${CV_FILENAME}`);
  const filteredProjects = $derived(
    activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter),
  );

  const nowMonth = currentMonth();
  const years = careerYears(nowMonth);

  type SectionId = keyof Dictionary['nav'];
  const navItems: SectionId[] = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];

  function tr(value: Localized | string): string {
    return typeof value === 'object' ? value[lang] : value;
  }

  function save(key: 'theme' | 'lang', value: string) {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Storage unavailable (private mode, blocked) — the choice just won't persist.
    }
  }

  function toggleTheme() {
    theme = theme === 'dark' ? 'light' : 'dark';
    save('theme', theme);
  }

  function setLang(value: Lang) {
    lang = value;
    save('lang', value);
  }

  $effect(() => {
    root.classList.toggle('dark', theme === 'dark');
  });

  $effect(() => {
    root.lang = lang;
  });

  // Highlight the nav link of the section currently in the middle of the viewport.
  $effect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) activeSection = entry.target.id;
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    for (const id of navItems) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  });

  function onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && menuOpen) menuOpen = false;
  }

  // =====================================================================
  // DATES
  // =====================================================================

  function formatPeriod(e: Experience): string {
    return formatPeriodIn(e, lang);
  }

  // Inclusive month count, matching how LinkedIn reports durations.
  function formatDuration(e: Experience): string {
    const end = e.end ?? nowMonth;
    const months = end.y * 12 + end.m - (e.start.y * 12 + e.start.m) + 1;
    return t.timeline.duration(Math.floor(months / 12), months % 12);
  }

  // =====================================================================
  // CONTACT FORM
  // =====================================================================

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function validate(): FormErrors {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = 'nameRequired';
    if (!form.email.trim()) next.email = 'emailRequired';
    else if (!EMAIL_RE.test(form.email.trim())) next.email = 'emailInvalid';
    if (!form.message.trim()) next.message = 'messageRequired';
    else if (form.message.trim().length < 10) next.message = 'messageShort';
    return next;
  }

  function resetForm() {
    form = { name: '', email: '', subject: '', message: '', _gotcha: '' };
    errors = {};
  }

  const formFields: FormField[] = ['name', 'email', 'message'];

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    // Honeypot filled → most likely a bot; silently drop the submission.
    if (form._gotcha) return;

    errors = validate();
    const firstInvalid = formFields.find((f) => errors[f]);
    if (firstInvalid) {
      document.getElementById(`field-${firstInvalid}`)?.focus();
      return;
    }

    const subject = form.subject.trim() || `${t.contact.mailSubject} — ${form.name.trim()}`;

    if (!FORMSPREE_ENDPOINT) {
      const body = `${form.message.trim()}\n\n— ${form.name.trim()} <${form.email.trim()}>`;
      window.location.href = `${mailtoUrl}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      status = 'mailto';
      return;
    }

    status = 'sending';
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject,
          message: form.message.trim(),
          _subject: subject,
          _replyto: form.email.trim(),
        }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      status = 'success';
      resetForm();
    } catch {
      status = 'error';
    }
  }

  function fieldClass(name: FormField | 'subject'): string {
    const invalid = name !== 'subject' && Boolean(errors[name]);
    return [
      'w-full rounded-xl border bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 shadow-sm transition',
      'focus:outline-none focus:ring-4 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500',
      invalid
        ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20 dark:border-rose-500/70'
        : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-slate-700',
    ].join(' ');
  }
</script>

<svelte:window onkeydown={onKeydown} />

<svelte:head>
  <title>{profile.name} — {profile.role}</title>
</svelte:head>

{#snippet brandIcon(name: 'linkedin' | 'whatsapp', cls: string)}
  <svg class={cls} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    {#if name === 'linkedin'}
      <path
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    {:else}
      <path
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"
      />
    {/if}
  </svg>
{/snippet}

{#snippet sectionHeading(eyebrow: string, title: string, subtitle?: string)}
  <div class="mx-auto mb-12 max-w-2xl text-center">
    <p class="mb-3 font-mono text-sm font-medium tracking-wider text-indigo-600 uppercase dark:text-indigo-400">{eyebrow}</p>
    <h2 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">{title}</h2>
    {#if subtitle}
      <p class="mt-4 text-base text-slate-600 sm:text-lg dark:text-slate-400">{subtitle}</p>
    {/if}
  </div>
{/snippet}

<a
  href="#main"
  class="sr-only z-[60] rounded-lg bg-indigo-600 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
>
  {t.skipToContent}
</a>

<!-- ================================================================== -->
<!-- HEADER                                                              -->
<!-- ================================================================== -->
<header
  class="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-lg dark:border-slate-800/70 dark:bg-slate-950/80"
>
  <nav class="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6" aria-label="Primary">
    <a href="#home" class="flex min-w-0 items-center gap-2.5 font-bold text-slate-900 dark:text-white">
      <span
        class="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-extrabold text-white shadow-md shadow-indigo-500/30"
        >{profile.initials}</span
      >
      <span class="truncate">{profile.name}</span>
    </a>

    <ul class="hidden items-center gap-1 lg:flex">
      {#each navItems.slice(1) as id (id)}
        <li>
          <a
            href={`#${id}`}
            aria-current={activeSection === id ? 'true' : undefined}
            class="rounded-lg px-3 py-2 text-sm font-medium transition-colors {activeSection === id
              ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}">{t.nav[id]}</a
          >
        </li>
      {/each}
    </ul>

    <div class="flex shrink-0 items-center gap-1.5 sm:gap-2">
      <div
        class="flex items-center rounded-lg border border-slate-200 p-0.5 text-xs font-semibold dark:border-slate-700"
        role="group"
        aria-label={t.language}
      >
        {#each langs as code (code)}
          <button
            type="button"
            onclick={() => setLang(code)}
            aria-pressed={lang === code}
            class="rounded-md px-2 py-1.5 uppercase transition-colors {lang === code
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}">{code}</button
          >
        {/each}
      </div>

      <button
        type="button"
        onclick={toggleTheme}
        aria-label={theme === 'dark' ? t.toLight : t.toDark}
        title={theme === 'dark' ? t.toLight : t.toDark}
        class="grid size-9 place-items-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
      >
        {#if theme === 'dark'}
          <Sun class="size-[18px]" aria-hidden="true" />
        {:else}
          <Moon class="size-[18px]" aria-hidden="true" />
        {/if}
      </button>

      <a
        href={CV_URL}
        download={CV_FILENAME}
        class="hidden items-center gap-2 rounded-lg bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 sm:inline-flex"
      >
        <Download class="size-4" aria-hidden="true" />
        {t.downloadCv}
      </a>

      <button
        type="button"
        class="grid size-9 place-items-center rounded-lg border border-slate-200 text-slate-700 lg:hidden dark:border-slate-700 dark:text-slate-200"
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        aria-label={menuOpen ? t.closeMenu : t.openMenu}
        onclick={() => (menuOpen = !menuOpen)}
      >
        {#if menuOpen}
          <X class="size-5" aria-hidden="true" />
        {:else}
          <Menu class="size-5" aria-hidden="true" />
        {/if}
      </button>
    </div>
  </nav>

  {#if menuOpen}
    <div
      id="mobile-menu"
      class="border-t border-slate-200 bg-white px-4 pt-2 pb-4 lg:hidden dark:border-slate-800 dark:bg-slate-950"
      transition:fade={{ duration: motion / 2 }}
    >
      <ul class="flex flex-col gap-1">
        {#each navItems.slice(1) as id (id)}
          <li>
            <a
              href={`#${id}`}
              onclick={() => (menuOpen = false)}
              aria-current={activeSection === id ? 'true' : undefined}
              class="block rounded-lg px-3 py-2.5 text-base font-medium {activeSection === id
                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300'
                : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}">{t.nav[id]}</a
            >
          </li>
        {/each}
      </ul>
      <a
        href={CV_URL}
        download={CV_FILENAME}
        onclick={() => (menuOpen = false)}
        class="mt-3 flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white"
      >
        <Download class="size-4" aria-hidden="true" />
        {t.downloadCv}
      </a>
    </div>
  {/if}
</header>

<main id="main">
  <!-- ================================================================ -->
  <!-- HERO                                                              -->
  <!-- ================================================================ -->
  <section id="home" class="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
    <div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <div
        class="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-400/30 via-violet-400/20 to-sky-300/20 blur-3xl dark:from-indigo-600/25 dark:via-violet-600/15 dark:to-sky-500/10"
      ></div>
      <div
        class="absolute inset-0 bg-[linear-gradient(to_right,rgb(148_163_184/0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgb(148_163_184/0.12)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] bg-[size:48px_48px]"
      ></div>
    </div>

    <div class="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr]">
      <div class="text-center lg:text-left">
        <p
          class="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300"
        >
          <span class="relative flex size-2">
            <span class="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
          </span>
          {t.available}
        </p>

        <h1 class="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl dark:text-white">
          <span class="block text-xl font-semibold text-slate-500 sm:text-2xl dark:text-slate-400">{t.hello}</span>
          <span class="bg-gradient-to-r from-indigo-600 via-violet-600 to-sky-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-violet-400 dark:to-sky-400"
            >{profile.name}</span
          >
        </h1>

        <p class="mt-4 text-xl font-semibold text-slate-800 sm:text-2xl dark:text-slate-200">{profile.role}</p>
        <p class="mt-2 flex flex-wrap justify-center gap-x-2 gap-y-1 font-mono text-sm text-slate-500 lg:justify-start dark:text-slate-400">
          {#each profile.specialties as s, i (s)}
            <span>{s}</span>{#if i < profile.specialties.length - 1}<span aria-hidden="true" class="text-slate-300 dark:text-slate-600">·</span>{/if}
          {/each}
        </p>

        <p class="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg lg:mx-0 dark:text-slate-400">
          {t.summary(years)}
        </p>

        <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
          <a
            href={CV_URL}
            download={CV_FILENAME}
            class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-600/25 transition hover:-translate-y-0.5 hover:bg-indigo-500 sm:w-auto"
          >
            <Download class="size-5" aria-hidden="true" />
            {t.downloadCv}
          </a>
          <a
            href="#contact"
            class="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-slate-400 sm:w-auto dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-500"
          >
            {t.contactMe}
            <ArrowRight class="size-5" aria-hidden="true" />
          </a>
        </div>

        <div class="mt-8 flex items-center justify-center gap-3 lg:justify-start">
          <a
            href={profile.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            class="grid size-11 place-items-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-800 dark:text-slate-400 dark:hover:border-indigo-500/50 dark:hover:text-indigo-400"
          >
            {@render brandIcon('linkedin', 'size-5')}
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            class="grid size-11 place-items-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-emerald-300 hover:text-emerald-600 dark:border-slate-800 dark:text-slate-400 dark:hover:border-emerald-500/50 dark:hover:text-emerald-400"
          >
            {@render brandIcon('whatsapp', 'size-5')}
          </a>
          <a
            href={mailtoUrl}
            aria-label="Email"
            class="grid size-11 place-items-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-800 dark:text-slate-400 dark:hover:border-indigo-500/50 dark:hover:text-indigo-400"
          >
            <Mail class="size-5" aria-hidden="true" />
          </a>
          <span class="ml-1 inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
            <MapPin class="size-4" aria-hidden="true" />
            {profile.location}
          </span>
        </div>
      </div>

      <div class="relative mx-auto w-full max-w-sm">
        <div
          class="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-indigo-500/20 to-violet-500/20 blur-2xl"
          aria-hidden="true"
        ></div>
        <div
          class="relative rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-xl backdrop-blur dark:border-slate-800 dark:bg-slate-900/80"
        >
          <div
            class="mx-auto grid size-32 place-items-center rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-sky-500 text-5xl font-extrabold text-white shadow-lg shadow-indigo-500/30 sm:size-36"
            aria-hidden="true"
          >
            {profile.initials}
          </div>
          <dl class="mt-6 grid grid-cols-3 gap-2 text-center">
            <div class="flex flex-col-reverse justify-end rounded-2xl bg-slate-50 px-2 py-3 dark:bg-slate-800/60">
              <dt class="mt-1 text-[11px] leading-tight text-slate-500 dark:text-slate-400">{t.stats.years}</dt>
              <dd class="text-2xl font-extrabold text-slate-900 dark:text-white">{years}+</dd>
            </div>
            <div class="flex flex-col-reverse justify-end rounded-2xl bg-slate-50 px-2 py-3 dark:bg-slate-800/60">
              <dt class="mt-1 text-[11px] leading-tight text-slate-500 dark:text-slate-400">{t.stats.projects}</dt>
              <dd class="text-2xl font-extrabold text-slate-900 dark:text-white">{projects.length}</dd>
            </div>
            <div class="flex flex-col-reverse justify-end rounded-2xl bg-slate-50 px-2 py-3 dark:bg-slate-800/60">
              <dt class="mt-1 text-[11px] leading-tight text-slate-500 dark:text-slate-400">{t.stats.companies}</dt>
              <dd class="text-2xl font-extrabold text-slate-900 dark:text-white">{companyCount}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </section>

  <!-- ================================================================ -->
  <!-- ABOUT                                                             -->
  <!-- ================================================================ -->
  <section id="about" class="border-t border-slate-100 py-20 sm:py-28 dark:border-slate-900">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      {@render sectionHeading(t.about.eyebrow, t.about.title)}
      <div class="grid grid-cols-1 gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div class="space-y-5 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
          <p>{t.about.p1(years)}</p>
          <p>{t.about.p2}</p>
          <p>{t.about.p3}</p>
        </div>
        <ul class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {#each [
            { icon: Briefcase, label: t.about.highlights.experience, value: t.about.highlights.experienceValue(years) },
            { icon: MapPin, label: t.about.highlights.location, value: profile.location },
            { icon: Layers, label: t.about.highlights.focus, value: t.about.highlights.focusValue },
            { icon: GraduationCap, label: t.about.highlights.education, value: t.about.highlights.educationValue },
            { icon: Languages, label: t.about.highlights.languages, value: t.about.highlights.languagesValue },
          ] as item (item.label)}
            <li
              class="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
            >
              <span class="grid size-10 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                <item.icon class="size-5" aria-hidden="true" />
              </span>
              <span>
                <span class="block text-xs font-medium tracking-wide text-slate-500 uppercase dark:text-slate-500">{item.label}</span>
                <span class="block font-semibold text-slate-900 dark:text-slate-100">{item.value}</span>
              </span>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </section>

  <!-- ================================================================ -->
  <!-- SKILLS                                                            -->
  <!-- ================================================================ -->
  <section id="skills" class="bg-slate-50 py-20 sm:py-28 dark:bg-slate-900/40">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      {@render sectionHeading(t.skills.eyebrow, t.skills.title, t.skills.subtitle)}
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {#each skillGroups as group (group.key)}
          {@const Icon = skillIcons[group.key]}
          <article
            class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <h3 class="flex items-center gap-3 text-lg font-bold text-slate-900 dark:text-white">
              <span class="grid size-10 place-items-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20">
                <Icon class="size-5" aria-hidden="true" />
              </span>
              {t.skills.groups[group.key]}
              <span class="ml-auto text-sm font-medium text-slate-400">{group.items.length}</span>
            </h3>
            <ul class="mt-5 flex flex-wrap gap-2">
              {#each group.items as skill (skill)}
                <li
                  class="inline-flex items-center rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  {skill}
                </li>
              {/each}
            </ul>
          </article>
        {/each}
      </div>
    </div>
  </section>

  <!-- ================================================================ -->
  <!-- PROJECTS                                                          -->
  <!-- ================================================================ -->
  <section id="projects" class="py-20 sm:py-28">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      {@render sectionHeading(t.projects.eyebrow, t.projects.title, t.projects.subtitle)}

      <div class="mb-4 flex flex-wrap justify-center gap-2" role="group" aria-label={t.projects.filterLabel}>
        {#each filterKeys as key (key)}
          <button
            type="button"
            onclick={() => (activeFilter = key)}
            aria-pressed={activeFilter === key}
            class="rounded-full border px-4 py-2 text-sm font-medium transition-colors {activeFilter === key
              ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm'
              : 'border-slate-300 bg-white text-slate-700 hover:border-indigo-400 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-indigo-500 dark:hover:text-indigo-300'}"
          >
            {key === 'all' ? t.projects.all : tr(categories[key])}
          </button>
        {/each}
      </div>
      <p class="mb-8 text-center text-sm text-slate-500 dark:text-slate-400" aria-live="polite">
        {t.projects.showing(filteredProjects.length, projects.length)}
      </p>

      <ul class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {#each filteredProjects as project (project.key)}
          <li animate:flip={{ duration: motion }} in:fade={{ duration: motion }}>
            <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
            <article
              tabindex="0"
              class="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/10 focus:-translate-y-1 focus:border-indigo-400 focus:shadow-xl focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/50 dark:focus:border-indigo-500"
            >
              <div class="flex items-start justify-between gap-3">
                <span
                  class="grid size-10 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white group-focus:bg-indigo-600 group-focus:text-white dark:bg-indigo-500/10 dark:text-indigo-400"
                >
                  <FolderKanban class="size-5" aria-hidden="true" />
                </span>
                <span
                  class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                  >{tr(categories[project.category])}</span
                >
              </div>
              <h3 class="mt-4 text-lg leading-snug font-bold text-slate-900 dark:text-white">{project.title}</h3>
              <p class="mt-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">{project.company}</p>
              <p class="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{tr(project.desc)}</p>
              <ul class="mt-5 flex flex-wrap gap-1.5">
                {#each project.tech as tech (tech)}
                  <li class="rounded-md bg-slate-100 px-2 py-1 font-mono text-[11px] text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {tech}
                  </li>
                {/each}
              </ul>
            </article>
          </li>
        {/each}
      </ul>
    </div>
  </section>

  <!-- ================================================================ -->
  <!-- EXPERIENCE & EDUCATION                                            -->
  <!-- ================================================================ -->
  <section id="experience" class="bg-slate-50 py-20 sm:py-28 dark:bg-slate-900/40">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      {@render sectionHeading(t.timeline.eyebrow, t.timeline.title)}

      <div class="grid grid-cols-1 gap-12 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <h3 class="mb-8 flex items-center gap-3 text-xl font-bold text-slate-900 dark:text-white">
            <Briefcase class="size-6 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
            {t.timeline.experience}
          </h3>
          <ol class="relative space-y-8 border-l-2 border-slate-200 pl-6 sm:pl-8 dark:border-slate-800">
            {#each experience as job (job.id)}
              {@const jobProjects = projects.filter((p) => p.exp === job.id)}
              <li class="relative">
                <span
                  class="absolute top-1.5 -left-[33px] size-4 rounded-full border-4 sm:-left-[41px] {job.end
                    ? 'border-slate-50 bg-slate-400 dark:border-slate-950 dark:bg-slate-600'
                    : 'border-slate-50 bg-emerald-500 ring-4 ring-emerald-500/20 dark:border-slate-950'}"
                  aria-hidden="true"
                ></span>
                <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900">
                  <div class="flex flex-wrap items-center gap-2">
                    <h4 class="text-lg font-bold text-slate-900 dark:text-white">{job.title}</h4>
                    {#if !job.end}
                      <span
                        class="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30"
                        >{t.timeline.current}</span
                      >
                    {/if}
                  </div>
                  <p class="mt-0.5 font-semibold text-indigo-600 dark:text-indigo-400">{job.company}</p>
                  <p class="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
                    <span class="inline-flex items-center gap-1.5">
                      <Calendar class="size-4" aria-hidden="true" />
                      {formatPeriod(job)} · {formatDuration(job)}
                    </span>
                    {#if job.location}
                      <span class="inline-flex items-center gap-1.5">
                        <MapPin class="size-4" aria-hidden="true" />
                        {job.location}
                      </span>
                    {/if}
                  </p>
                  {#if job.duties.length}
                    <ul class="mt-4 space-y-1.5 text-sm text-slate-600 dark:text-slate-400">
                      {#each job.duties as duty (duty.en)}
                        <li class="flex gap-2">
                          <CircleCheck class="mt-0.5 size-4 shrink-0 text-indigo-500" aria-hidden="true" />
                          <span>{tr(duty)}</span>
                        </li>
                      {/each}
                    </ul>
                  {/if}
                  {#if jobProjects.length}
                    <p class="mt-4 text-xs font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-500">
                      {t.timeline.keyProjects}
                    </p>
                    <ul class="mt-2 space-y-1.5 text-sm text-slate-600 dark:text-slate-400">
                      {#each jobProjects as p (p.key)}
                        <li class="flex gap-2">
                          <CodeXml class="mt-0.5 size-4 shrink-0 text-violet-500" aria-hidden="true" />
                          <span
                            ><span class="font-medium text-slate-800 dark:text-slate-200">{p.title}</span>
                            <span class="text-slate-500 dark:text-slate-500">— {p.tech.join(', ')}</span></span
                          >
                        </li>
                      {/each}
                    </ul>
                  {/if}
                </div>
              </li>
            {/each}
          </ol>
        </div>

        <div class="space-y-12">
          <div>
            <h3 class="mb-8 flex items-center gap-3 text-xl font-bold text-slate-900 dark:text-white">
              <GraduationCap class="size-6 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
              {t.timeline.education}
            </h3>
            <ol class="relative space-y-8 border-l-2 border-slate-200 pl-6 sm:pl-8 dark:border-slate-800">
              {#each education as edu (edu.school)}
                <li class="relative">
                  <span
                    class="absolute top-1.5 -left-[33px] size-4 rounded-full border-4 border-slate-50 bg-violet-500 sm:-left-[41px] dark:border-slate-950"
                    aria-hidden="true"
                  ></span>
                  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <h4 class="font-bold text-slate-900 dark:text-white">{edu.school}</h4>
                    <p class="mt-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">{tr(edu.degree)}</p>
                    <p class="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
                      <span class="inline-flex items-center gap-1.5">
                        <Calendar class="size-4" aria-hidden="true" />
                        {edu.start} – {edu.end}
                      </span>
                      <span class="inline-flex items-center gap-1.5">
                        <MapPin class="size-4" aria-hidden="true" />
                        {edu.location}
                      </span>
                    </p>
                  </div>
                </li>
              {/each}
            </ol>
          </div>

          {#if certifications.length}
            <div>
              <h3 class="mb-6 flex items-center gap-3 text-xl font-bold text-slate-900 dark:text-white">
                <Award class="size-6 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                {t.timeline.certifications}
              </h3>
              <ul class="space-y-3">
                {#each certifications as cert (cert.name)}
                  <li class="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                    <p class="font-semibold text-slate-900 dark:text-white">{cert.name}</p>
                    <p class="text-sm text-slate-500 dark:text-slate-400">{cert.issuer} · {cert.year}</p>
                  </li>
                {/each}
              </ul>
            </div>
          {/if}

          <div
            class="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-600 to-violet-600 p-6 text-white shadow-lg shadow-indigo-600/20 dark:border-indigo-500/30"
          >
            <Sparkles class="size-6" aria-hidden="true" />
            <p class="mt-3 text-lg font-bold">{t.available}</p>
            <p class="mt-1 text-sm text-indigo-100">{t.contact.subtitle}</p>
            <div class="mt-5 flex flex-wrap gap-2">
              <a
                href={CV_URL}
                download={CV_FILENAME}
                class="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
              >
                <Download class="size-4" aria-hidden="true" />
                {t.downloadCv}
              </a>
              <a
                href="#contact"
                class="inline-flex items-center gap-2 rounded-lg border border-white/40 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {t.contactMe}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ================================================================ -->
  <!-- CONTACT                                                           -->
  <!-- ================================================================ -->
  <section id="contact" class="py-20 sm:py-28">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      {@render sectionHeading(t.contact.eyebrow, t.contact.title, t.contact.subtitle)}

      <div class="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.4fr]">
        <ul class="space-y-3">
          <li>
            <a
              href={mailtoUrl}
              class="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/50"
            >
              <span class="grid size-12 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                <Mail class="size-5" aria-hidden="true" />
              </span>
              <span class="min-w-0">
                <span class="block text-xs font-medium tracking-wide text-slate-500 uppercase">{t.contact.email}</span>
                <span class="block truncate font-semibold text-slate-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400"
                  >{profile.contact.email}</span
                >
              </span>
            </a>
          </li>
          <li>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-emerald-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500/50"
            >
              <span class="grid size-12 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                {@render brandIcon('whatsapp', 'size-5')}
              </span>
              <span class="min-w-0">
                <span class="block text-xs font-medium tracking-wide text-slate-500 uppercase">{t.contact.whatsapp}</span>
                <span class="block truncate font-semibold text-slate-900 group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400"
                  >{profile.contact.whatsappDisplay}</span
                >
              </span>
            </a>
          </li>
          <li>
            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-sky-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-500/50"
            >
              <span class="grid size-12 shrink-0 place-items-center rounded-xl bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400">
                {@render brandIcon('linkedin', 'size-5')}
              </span>
              <span class="min-w-0">
                <span class="block text-xs font-medium tracking-wide text-slate-500 uppercase">{t.contact.linkedin}</span>
                <span class="block truncate font-semibold text-slate-900 group-hover:text-sky-700 dark:text-white dark:group-hover:text-sky-400"
                  >{profile.contact.linkedinDisplay}</span
                >
              </span>
            </a>
          </li>
          <li class="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <span class="grid size-12 shrink-0 place-items-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
              <MapPin class="size-5" aria-hidden="true" />
            </span>
            <span>
              <span class="block text-xs font-medium tracking-wide text-slate-500 uppercase">{t.contact.location}</span>
              <span class="block font-semibold text-slate-900 dark:text-white">{profile.location}</span>
            </span>
          </li>
        </ul>

        <form
          class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900"
          onsubmit={handleSubmit}
          novalidate
        >
          <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label for="field-name" class="mb-1.5 block text-sm font-semibold text-slate-800 dark:text-slate-200"
                >{t.contact.form.name} <span class="text-rose-500" aria-hidden="true">*</span></label
              >
              <input
                id="field-name"
                type="text"
                autocomplete="name"
                required
                bind:value={form.name}
                placeholder={t.contact.form.namePh}
                aria-invalid={errors.name ? 'true' : undefined}
                aria-describedby={errors.name ? 'error-name' : undefined}
                class={fieldClass('name')}
              />
              {#if errors.name}
                <p id="error-name" class="mt-1.5 text-sm text-rose-600 dark:text-rose-400">{t.contact.errors[errors.name]}</p>
              {/if}
            </div>
            <div>
              <label for="field-email" class="mb-1.5 block text-sm font-semibold text-slate-800 dark:text-slate-200"
                >{t.contact.form.email} <span class="text-rose-500" aria-hidden="true">*</span></label
              >
              <input
                id="field-email"
                type="email"
                autocomplete="email"
                required
                bind:value={form.email}
                placeholder={t.contact.form.emailPh}
                aria-invalid={errors.email ? 'true' : undefined}
                aria-describedby={errors.email ? 'error-email' : undefined}
                class={fieldClass('email')}
              />
              {#if errors.email}
                <p id="error-email" class="mt-1.5 text-sm text-rose-600 dark:text-rose-400">{t.contact.errors[errors.email]}</p>
              {/if}
            </div>
            <div class="sm:col-span-2">
              <label for="field-subject" class="mb-1.5 block text-sm font-semibold text-slate-800 dark:text-slate-200"
                >{t.contact.form.subject} <span class="font-normal text-slate-400">({t.contact.form.optional})</span></label
              >
              <input
                id="field-subject"
                type="text"
                bind:value={form.subject}
                placeholder={t.contact.form.subjectPh}
                class={fieldClass('subject')}
              />
            </div>
            <div class="sm:col-span-2">
              <label for="field-message" class="mb-1.5 block text-sm font-semibold text-slate-800 dark:text-slate-200"
                >{t.contact.form.message} <span class="text-rose-500" aria-hidden="true">*</span></label
              >
              <textarea
                id="field-message"
                rows="5"
                required
                bind:value={form.message}
                placeholder={t.contact.form.messagePh}
                aria-invalid={errors.message ? 'true' : undefined}
                aria-describedby={errors.message ? 'error-message' : undefined}
                class="{fieldClass('message')} resize-y"
              ></textarea>
              {#if errors.message}
                <p id="error-message" class="mt-1.5 text-sm text-rose-600 dark:text-rose-400">{t.contact.errors[errors.message]}</p>
              {/if}
            </div>
            <!-- Honeypot: hidden from people, tempting for bots. -->
            <div class="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
              <label for="field-gotcha">Leave this field empty</label>
              <input id="field-gotcha" type="text" name="_gotcha" tabindex="-1" autocomplete="off" bind:value={form._gotcha} />
            </div>
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            class="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            {#if status === 'sending'}
              <LoaderCircle class="size-5 animate-spin" aria-hidden="true" />
              {t.contact.form.sending}
            {:else}
              <Send class="size-5" aria-hidden="true" />
              {t.contact.form.send}
            {/if}
          </button>

          <div aria-live="polite" class="mt-5 empty:hidden">
            {#if status === 'success' || status === 'mailto'}
              <p
                class="flex items-start gap-2 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300"
              >
                <CircleCheck class="mt-0.5 size-5 shrink-0" aria-hidden="true" />
                {status === 'success' ? t.contact.status.success : t.contact.status.mailto}
              </p>
            {:else if status === 'error'}
              <div class="flex items-start gap-2 rounded-xl bg-rose-50 p-4 text-sm text-rose-800 dark:bg-rose-500/10 dark:text-rose-300">
                <CircleAlert class="mt-0.5 size-5 shrink-0" aria-hidden="true" />
                <p>
                  {t.contact.status.error}
                  <a href={mailtoUrl} class="font-semibold underline">{profile.contact.email}</a>
                  ·
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" class="font-semibold underline"
                    >WhatsApp {profile.contact.whatsappDisplay}</a
                  >
                </p>
              </div>
            {/if}
          </div>
        </form>
      </div>
    </div>
  </section>
</main>

<!-- ================================================================== -->
<!-- FOOTER                                                              -->
<!-- ================================================================== -->
<footer class="border-t border-slate-200 py-10 dark:border-slate-800">
  <div class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-slate-500 sm:flex-row sm:px-6 dark:text-slate-400">
    <p class="text-center sm:text-left">
      © {nowMonth.y} {profile.name}. {t.footer.rights}
      <span class="block sm:inline">{t.footer.builtWith}</span>
    </p>
    <div class="flex items-center gap-2">
      <a
        href={profile.contact.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        class="grid size-9 place-items-center rounded-lg transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
      >
        {@render brandIcon('linkedin', 'size-4')}
      </a>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        class="grid size-9 place-items-center rounded-lg transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
      >
        {@render brandIcon('whatsapp', 'size-4')}
      </a>
      <a
        href={mailtoUrl}
        aria-label="Email"
        class="grid size-9 place-items-center rounded-lg transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
      >
        <Mail class="size-4" aria-hidden="true" />
      </a>
      <a
        href="#home"
        class="ml-2 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 font-medium transition hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:hover:border-slate-600 dark:hover:text-white"
      >
        <ArrowUp class="size-4" aria-hidden="true" />
        {t.footer.backToTop}
      </a>
    </div>
  </div>
</footer>
