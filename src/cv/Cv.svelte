<script lang="ts">
  import Mail from '@lucide/svelte/icons/mail';
  import MapPin from '@lucide/svelte/icons/map-pin';
  import Phone from '@lucide/svelte/icons/phone';
  import photo from '../assets/cv-photo.jpg';
  import {
    careerYears,
    education,
    experience,
    formatPeriod,
    languages,
    mailtoUrl,
    profile,
    projects,
    skillGroups,
    summary,
    whatsappUrl,
    type Lang,
    type SkillGroupKey,
  } from '../data/content';

  let { lang }: { lang: Lang } = $props();

  const labels = {
    en: {
      profile: 'Profile',
      experience: 'Experience',
      skills: 'Skills',
      education: 'Education',
      languages: 'Languages',
      keyProjects: 'Key projects',
      groups: { frontend: 'Frontend', backend: 'Backend', databases: 'Databases', tools: 'Tools / DevOps' },
    },
    id: {
      profile: 'Profil',
      experience: 'Pengalaman',
      skills: 'Keahlian',
      education: 'Pendidikan',
      languages: 'Bahasa',
      keyProjects: 'Proyek utama',
      groups: { frontend: 'Frontend', backend: 'Backend', databases: 'Database', tools: 'Tools / DevOps' },
    },
  } satisfies Record<Lang, { groups: Record<SkillGroupKey, string> } & Record<string, unknown>>;

  const l = $derived(labels[lang]);
  const years = careerYears();
  const [linkedinHost, linkedinHandle] = profile.contact.linkedinDisplay.split('/in/');

  $effect(() => {
    document.documentElement.lang = lang;
    document.title = `CV — ${profile.name} (${lang.toUpperCase()})`;
  });
</script>

<!-- Repeats on every printed page: Chromium prints position:fixed boxes once per page. -->
<div class="sidebar-bg" aria-hidden="true"></div>

<div class="sheet">
  <aside class="sidebar">
    <img class="photo" src={photo} alt={profile.name} />
    <h1 class="name">{profile.name}</h1>
    <p class="role">{profile.role}</p>

    <ul class="contact">
      <li>
        <span class="icon"><Mail size={11} strokeWidth={2.25} aria-hidden="true" /></span>
        <a href={mailtoUrl}>{profile.contact.email}</a>
      </li>
      <li>
        <span class="icon"><Phone size={11} strokeWidth={2.25} aria-hidden="true" /></span>
        <a href={whatsappUrl}>{profile.contact.whatsappDisplay}</a>
      </li>
      <li>
        <span class="icon"><MapPin size={11} strokeWidth={2.25} aria-hidden="true" /></span>
        <span>{profile.location}</span>
      </li>
      <li>
        <span class="icon">
          <!-- LinkedIn glyph (Lucide no longer ships brand icons). -->
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </span>
        <!-- Wrap after "/in/" rather than at a hyphen inside the handle. -->
        <a href={profile.contact.linkedin}>{linkedinHost}/in/<wbr /><span class="nowrap">{linkedinHandle}</span></a>
      </li>
    </ul>

    <section>
      <h2>{l.skills}</h2>
      {#each skillGroups as group (group.key)}
        <div class="skill-group">
          <h3>{l.groups[group.key]}</h3>
          <p>{group.items.join(', ')}</p>
        </div>
      {/each}
    </section>

    <section>
      <h2>{l.education}</h2>
      {#each education as edu (edu.school)}
        <div class="edu">
          <h3>{edu.degree[lang]}</h3>
          <p>{edu.school}</p>
          <p class="muted">{edu.start} – {edu.end}</p>
        </div>
      {/each}
    </section>

    <section>
      <h2>{l.languages}</h2>
      <ul class="langs">
        {#each languages as language (language.name.en)}
          <li><strong>{language.name[lang]}</strong> — {language.level[lang]}</li>
        {/each}
      </ul>
    </section>
  </aside>

  <main class="main">
    <section>
      <h2>{l.profile}</h2>
      <p class="summary">{summary[lang](years)}</p>
    </section>

    <section>
      <h2>{l.experience}</h2>
      {#each experience as job (job.id)}
        {@const jobProjects = projects.filter((p) => p.exp === job.id).map((p) => p.title)}
        <article class="job">
          <header>
            <h3>{job.title}</h3>
            <span class="period">{formatPeriod(job, lang)}</span>
          </header>
          <p class="company">{job.company}{job.location ? ` · ${job.location}` : ''}</p>
          {#if job.duties.length}
            <ul class="duties">
              {#each job.duties as duty (duty.en)}
                <li>{duty[lang]}</li>
              {/each}
            </ul>
          {/if}
          {#if jobProjects.length}
            <p class="projects"><strong>{l.keyProjects}:</strong> {jobProjects.join(', ')}</p>
          {/if}
        </article>
      {/each}
    </section>
  </main>
</div>

<style>
  /* On screen, show the sheet at A4 width so the preview matches the PDF. */
  @media screen {
    .sheet {
      width: 210mm;
      min-height: 297mm;
      margin: 0 auto;
      background: #fff;
    }
    .sidebar-bg {
      display: none;
    }
  }

  .sidebar-bg {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 67mm;
    background: #fbb01c;
    z-index: 0;
  }

  .sheet {
    display: grid;
    grid-template-columns: 67mm 1fr;
    position: relative;
    z-index: 1;
  }

  /* ---------------------------------------------------------------- sidebar */

  .sidebar {
    background: #fbb01c;
    padding: 12mm 7mm 10mm;
    font-size: 8.3pt;
  }

  .photo {
    display: block;
    width: 30mm;
    height: 30mm;
    margin: 0 auto 5mm;
    border-radius: 50%;
    object-fit: cover;
    object-position: center top;
    border: 1.2mm solid #fff;
  }

  .name {
    font-size: 19pt;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    line-height: 1.1;
    text-align: center;
  }

  .role {
    margin-top: 1.5mm;
    font-size: 10.5pt;
    font-weight: 500;
    text-align: center;
  }

  .contact {
    margin-top: 6mm;
    padding: 4.5mm 0;
    border-top: 0.3mm solid #dfdfdf;
    border-bottom: 0.3mm solid #dfdfdf;
    display: grid;
    gap: 2.6mm;
  }

  .contact li {
    display: flex;
    align-items: center;
    gap: 2.5mm;
    overflow-wrap: anywhere;
    font-size: 8pt;
  }

  .nowrap {
    white-space: nowrap;
  }

  .icon {
    flex: none;
    display: grid;
    place-items: center;
    width: 6mm;
    height: 6mm;
    border-radius: 50%;
    background: #111;
    color: #fff;
  }

  .sidebar section {
    margin-top: 5.5mm;
  }

  .sidebar h2 {
    font-size: 10.5pt;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding-bottom: 1.5mm;
    margin-bottom: 2.5mm;
    border-bottom: 0.3mm solid #dfdfdf;
  }

  .sidebar h3 {
    font-size: 8.5pt;
    font-weight: 700;
  }

  .skill-group + .skill-group,
  .edu + .edu {
    margin-top: 2.2mm;
  }

  .muted {
    color: #3d3d3d;
  }

  .langs {
    display: grid;
    gap: 1mm;
  }

  /* ------------------------------------------------------------------- main */

  .main {
    padding: 12mm 11mm 10mm 9mm;
    /* Repeat the top/bottom padding on page 2. */
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
  }

  .main section + section {
    margin-top: 6mm;
  }

  .main h2 {
    position: relative;
    font-size: 12pt;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding-bottom: 1.8mm;
    margin-bottom: 3.5mm;
    border-bottom: 0.3mm solid #dfdfdf;
  }

  .main h2::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -0.3mm;
    width: 12mm;
    height: 0.8mm;
    background: #fbb01c;
  }

  .summary {
    font-size: 9pt;
    line-height: 1.55;
    text-align: justify;
  }

  .job {
    break-inside: avoid;
  }

  .job + .job {
    margin-top: 3.8mm;
  }

  .job header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 3mm;
  }

  .job h3 {
    font-size: 9.5pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .period {
    flex: none;
    font-size: 8pt;
    font-weight: 600;
    color: #555;
  }

  .company {
    font-size: 8.5pt;
    font-style: italic;
    color: #3d3d3d;
  }

  .duties {
    margin-top: 1mm;
    font-size: 8.4pt;
  }

  .duties li {
    position: relative;
    padding-left: 3.5mm;
  }

  .duties li::before {
    content: '';
    position: absolute;
    left: 0.6mm;
    top: 0.62em;
    width: 1.2mm;
    height: 1.2mm;
    border-radius: 50%;
    background: #fbb01c;
  }

  .projects {
    margin-top: 1mm;
    font-size: 8.2pt;
    color: #333;
  }
</style>
