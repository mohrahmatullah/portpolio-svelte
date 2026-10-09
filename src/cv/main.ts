// Printable CV page (cv.html). Rendered to PDF by scripts/build-cv.mjs; open
// /cv.html?lang=en or ?lang=id under `npm run dev` to preview it.
import '@fontsource-variable/inter/wght.css';
import '@fontsource-variable/inter/wght-italic.css';
import { mount } from 'svelte';
import './cv.css';
import Cv from './Cv.svelte';
import type { Lang } from '../data/content';

const target = document.getElementById('cv');
if (!target) throw new Error('Mount point #cv not found in cv.html');

const lang: Lang = new URLSearchParams(location.search).get('lang') === 'id' ? 'id' : 'en';

const cv = mount(Cv, { target, props: { lang } });

export default cv;
