
const translations = {
  it: {
    'nav.home':`01. Home`,
    'nav.about':`02. Chi sono`,
    'nav.work':`03. Progetto`,
    'nav.contact':`04. Contatti`,
    'hero.kicker':`UI/UX Designer · Bologna`,
    'hero.intro':`Sono Antonietta, laureata magistrale in Informatica con lode. Ho portato nel design il metodo che mi ha insegnato l'informatica: ricerca strutturata, iterazioni documentate e decisioni motivate, non solo schermate belle da vedere.`,
    'hero.cta':`Scopri il progetto ↓`,
    'hero.note':`scroll / muovi il personaggio / ascolta i dettagli`,
    'hero.avatarLabel':`ciao, sono Antonietta! ♡`,
    'hero.avatarStatus':`interactive character`,
    'avatar.listening':`in ascolto`,
    'about.label':`Chi sono`,
    'about.title':`Dall'informatica al design, senza perdere il metodo`,
    'about.p1':`Il mio percorso in informatica mi ha dato familiarità con il pensiero sistemico, la lettura di dati reali e la costruzione di processi ripetibili. Nel design applico lo stesso approccio: ogni scelta, che sia un flusso, un componente o una gerarchia visiva, nasce da un'ipotesi verificabile e non da un'intuizione isolata.`,
    'about.p2':`Lavoro sia sul lato UX (ricerca, architettura dell'informazione, user flow) sia sul lato UI (design system, alta fedeltà, accessibilità), con un'attenzione particolare ai contesti industriali e data-intensive, dove la chiarezza dell'informazione conta quanto l'estetica.`,
    'case.label':`Caso studio`,
    'case.title':`Redesign dell'interfaccia operativa per un impianto industriale`,
    'case.lede':`Progetto realizzato per un'azienda italiana attiva nella produzione di impianti industriali, in collaborazione con il team tecnico dell'agenzia per cui lavoro.`,
    'case.contextTitle':`Il contesto`,
    'case.beforeAfterTitle':`Prima e dopo`,
    'case.processTitle':`Dal wireframe al prototipo`,
    'case.contextP1':`Il progetto nasce da una pipeline dati IoT/ML già esistente (raccolta e predizione dei dati di impianto). Il mio compito è stato progettare l'interfaccia web che rende questi dati fruibili a due profili utente: il Plant Manager, interessato alla performance d'insieme, e il Maintenance Technician, focalizzato su manutenzione predittiva e allarmi.`,
    'case.contextP2':`Il cliente desiderava rinnovare un'applicazione esistente, poco leggibile e priva di un sistema coerente. Le esigenze di business e utente erano già state raccolte dal cliente attraverso interviste dirette con gli utenti finali; ho ricevuto brief e interfacce originali, e da lì ho condotto un'analisi euristica per individuare criticità di usabilità prima di ridisegnare.`,
    'case.beforeAfterText':`Confronto tra l'interfaccia originale e il nuovo design system, pensato per dare gerarchia visiva immediata tramite color-coding per categoria funzionale.`,
    'case.beforeCaption':`Prima: tile monocromatiche, nessuna gerarchia`,
    'case.afterCaption':`Dopo: color coding per modulo funzionale`,
    'case.processP1':`Il lavoro ha coperto l'intero flusso applicativo: autenticazione con login, registrazione e reset password su due canali (email e telefono), selezione geografica con mappa interattiva sincronizzata a una lista filtrabile, landing page a moduli e le sette funzionalità core dell'app, tra cui manutenzione predittiva, performance dell'impianto, risparmio energetico, storico dati e gestione allarmi.`,
    'case.processP2':`Ogni schermata è passata da wireframe a bassa fedeltà a mockup ad alta fedeltà, fino a un prototipo Figma cliccabile. Ho dedicato attenzione anche ai micro stati dei singoli componenti, come un filtro con zero, uno o più elementi selezionati, e non solo alle schermate considerate "finali".`,
    'case.quote':`Le user stories sono state scritte alla fine del processo invece che all'inizio, come normalmente ci si aspetterebbe in un workflow UX. Scrivendole a posteriori sono emersi elementi che avrebbero potuto migliorare ulteriormente l'app fin dalle prime fasi: una lezione che porto con me nei progetti successivi.<footer>Dalla documentazione del progetto</footer>`,
    'accessibility.p':`Tutti i mockup del progetto sono stati sottoposti a verifica tramite <strong>Stark, Universal Accessibility Framework (SUAF)</strong>, per controllare la conformità alle <a href="https://www.w3.org/WAI/WCAG2AA-Conformance" target="_blank" rel="noopener">Web Content Accessibility Guidelines</a>. Il risultato è una conformità di livello <strong>AA</strong> su tutti i componenti verificati, e <strong>AAA</strong> per la maggior parte di essi, contrasto colore, dimensione del testo e stati interattivi inclusi.`,
    'footer.note':`Antonietta Pascarella, UI/UX Designer · Bologna, Italia`,
    'contact.lede':`Sono disponibile per nuove collaborazioni e progetti di UX/UI design.`,
    'palette.lede':`Palette estratta dal file Figma di produzione, organizzata per funzione: base, brand, semantica (stati positivi/critici/warning) e accenti categorici per modulo.`,
    'palette.title':`Design system, la palette`,
    'palette.base':`Base & neutrali`,
    'palette.brand':`Brand`,
    'palette.semantic':`Semantica: positivo, critico, warning`,
    'palette.accent':`Accenti categorici per modulo`,
    'accessibility.label':`Accessibilità`,
    'accessibility.title':`Conformità WCAG verificata, non presunta`,
    'contact.label':`Contatti`,
    'contact.title':`Parliamone`,
    'contact.lede':`Sono disponibile per nuove collaborazioni e progetti di UX/UI design.`
  },
  en: {
    'nav.home':`01. Home`,
    'nav.about':`02. About`,
    'nav.work':`03. Work`,
    'nav.contact':`04. Contact`,
    'meta.roleLabel':`Role`,
    'meta.role':`UX/UI Design, design system development`,
    'meta.phasesLabel':`Phases`,
    'meta.phases':`Wireframe → Mockup → Interactive prototype`,
    'meta.toolsLabel':`Tools`,
    'meta.tools':`Figma, Stark (accessibility audit)`,
    'hero.kicker':`UI/UX Designer · Bologna`,
    'hero.intro':`I hold a master's degree in Computer Science with honours. I brought the method I learned through computer science into design: structured research, documented iterations and decisions grounded in evidence, not just attractive screens.`,
    'hero.cta':`Explore the project ↓`,
    'hero.note':`scroll / move the character / listen to the details`,
    'hero.avatarLabel':`hi, I'm Antonietta! ♡`,
    'hero.avatarStatus':`interactive character`,
    'avatar.listening':`listening`,
    'about.label':`About me`,
    'about.title':`From computer science to design, without losing the method`,
    'about.p1':`My background in computer science gave me a strong foundation in systems thinking, working with real data and building repeatable processes. I bring the same approach to design: every decision, whether it concerns a flow, a component or a visual hierarchy, starts from a testable hypothesis rather than an isolated intuition.`,
    'about.p2':`I work across UX (research, information architecture, user flows) and UI (design systems, high-fidelity design, accessibility), with a particular interest in industrial and data-intensive contexts where clarity of information matters as much as aesthetics.`,
    'case.label':`Case study`,
    'case.title':`Redesigning the operational interface for an industrial plant`,
    'case.lede':`A project for an Italian company working in industrial plant production, developed in collaboration with the technical team of the agency I work for.`,
    'case.contextTitle':`The context`,
    'case.beforeAfterTitle':`Before and after`,
    'case.processTitle':`From wireframe to prototype`,
    'case.contextP1':`The project started from an existing IoT/ML data pipeline for collecting and predicting plant data. My task was to design the web interface that makes those data usable for two user profiles: the Plant Manager, focused on overall performance, and the Maintenance Technician, focused on predictive maintenance and alarms.`,
    'case.contextP2':`The client wanted to renew an existing application that was difficult to read and lacked a coherent system. Business and user needs had already been gathered through direct interviews with end users; I received the brief and original interfaces and then ran a heuristic analysis to identify usability issues before redesigning.`,
    'case.beforeAfterText':`A comparison between the original interface and the new design system, built to create immediate visual hierarchy through functional color coding.`,
    'case.beforeCaption':`Before: monochrome tiles, no hierarchy`,
    'case.afterCaption':`After: color coding by functional module`,
    'case.processP1':`The work covered the full application flow: login, registration and password reset through two channels (email and phone), geographic selection with an interactive map synchronized with a filterable list, a modular landing page and the seven core features, including predictive maintenance, plant performance, energy savings, data history and alarm management.`,
    'case.processP2':`Every screen moved from low-fidelity wireframes to high-fidelity mockups and finally to a clickable Figma prototype. I also documented component micro-states, such as filters with zero, one or multiple selected items, rather than focusing only on screens considered "final".`,
    'case.quote':`The user stories were written at the end of the process rather than at the beginning, as you would normally expect in a UX workflow. Writing them retrospectively revealed details that could have improved the app from the earliest stages — a lesson I carry into subsequent projects.<footer>From the project documentation</footer>`,
    'accessibility.p':`All project mockups were reviewed with <strong>Stark, Universal Accessibility Framework (SUAF)</strong> against the <a href="https://www.w3.org/WAI/WCAG2AA-Conformance" target="_blank" rel="noopener">Web Content Accessibility Guidelines</a>. The result was AA compliance across the verified components, with AAA achieved by most of them, including colour contrast, text sizing and interactive states.`,
    'footer.note':`Antonietta Pascarella, UI/UX Designer · Bologna, Italy`,
    'contact.lede':`I am available for new collaborations and UX/UI design projects.`,
    'palette.lede':`The palette was extracted from the production Figma file and organized by function: base, brand, semantic states and categorical accents by module.`,
    'palette.title':`Design system, the palette`,
    'palette.base':`Base & neutrals`,
    'palette.brand':`Brand`,
    'palette.semantic':`Semantic: positive, critical, warning`,
    'palette.accent':`Categorical accents by module`,
    'accessibility.label':`Accessibility`,
    'accessibility.title':`WCAG compliance verified, not assumed`,
    'contact.label':`Contact`,
    'contact.title':`Let's talk`,
    'contact.lede':`I am available for new collaborations and UX/UI design projects.`
  }
};

const languageToggle = document.getElementById('languageToggle');
const languageLabel = document.getElementById('languageLabel');
let currentLanguage = (() => {
  const stored = localStorage.getItem('antonietta-language');
  if (stored === 'it' || stored === 'en') return stored;
  return navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'it';
})();

function applyLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language;

  document.querySelectorAll('[data-i18n-html]').forEach(element => {
    const key = element.dataset.i18nHtml;
    const value = translations[language][key] ?? translations.it[key];
    if (value !== undefined) element.innerHTML = value;
  });

  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.dataset.i18n;
    const value = translations[language][key] ?? translations.it[key];
    if (value !== undefined) element.textContent = value;
  });

  const nextLanguage = language === 'it' ? 'en' : 'it';
  languageLabel.textContent = nextLanguage.toUpperCase();
  languageToggle.setAttribute('aria-label', language === 'it' ? 'Switch to English' : 'Passa all\'italiano');
  languageToggle.setAttribute('aria-pressed', String(language === 'en'));

  localStorage.setItem('antonietta-language', language);
}

languageToggle?.addEventListener('click', () => {
  applyLanguage(currentLanguage === 'it' ? 'en' : 'it');
});


import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const heroCanvas = document.getElementById('avatar-canvas');
const companionCanvas = document.getElementById('companion-canvas');
const companion = document.getElementById('characterCompanion');
const companionCaption = document.getElementById('companionCaption');

let heroRenderer, heroScene, heroCamera, bee;
let companionRenderer, companionScene, companionCamera, companionBee;
let clock;

const pointer = {
  x: 0,
  y: 0,
  targetX: 0,
  targetY: 0
};

const poseTarget = {
  head: 0,
  tilt: 0,
  lean: 0,
  bounce: 0
};

const poseCurrent = { ...poseTarget };
const mixers = new WeakMap();
const beeParts = new WeakMap();

const beeUrl = 'animal-bee.glb';
const textureUrl = 'colormap.png';

function setupScene(canvas, small = false) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(small ? 28 : 25, 1, 0.01, 100);

  camera.position.set(0, -6.4, small ? 1.05 : 1.25);
  camera.lookAt(0, 0, small ? 0.95 : 1.20);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.setClearColor(0x000000, 0);

  scene.add(new THREE.HemisphereLight(0xfff8ec, 0x5b5042, 1.8));

  const key = new THREE.DirectionalLight(0xfff0d2, 2.2);
  key.position.set(2.5, -4.5, 5);
  scene.add(key);

  const fill = new THREE.DirectionalLight(0xe7e8f0, 1.0);
  fill.position.set(-3.5, -2, 2.5);
  scene.add(fill);

  const rim = new THREE.DirectionalLight(0xd6d4e5, 0.65);
  rim.position.set(2, 2.5, 4);
  scene.add(rim);

  return { scene, camera, renderer };
}

function resizeScene(sceneData, canvas) {
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(1, rect.width);
  const height = Math.max(1, rect.height);

  sceneData.renderer.setSize(width, height, false);
  sceneData.camera.aspect = width / height;
  sceneData.camera.updateProjectionMatrix();
}

function centerModel(source, small = false) {
  source.rotation.set(0, 0, 0);
  source.updateMatrixWorld(true);

  const bounds = new THREE.Box3().setFromObject(source);
  const size = bounds.getSize(new THREE.Vector3());
  const center = bounds.getCenter(new THREE.Vector3());

  const targetHeight = small ? 1.45 : 2.15;
  const scale = targetHeight / Math.max(size.z, 0.001);

  source.scale.setScalar(scale);
  source.position.set(
    -center.x * scale,
    -center.y * scale,
    -center.z * scale
  );
  source.updateMatrixWorld(true);

  const wrapper = new THREE.Group();
  wrapper.add(source);

  wrapper.position.set(0, 0, small ? 0.78 : 1.05);
  wrapper.rotation.set(0, 0, 0);

  wrapper.userData.source = source;
  wrapper.userData.baseZ = wrapper.position.z;

  return wrapper;
}

function findParts(root) {
  const parts = {
    eyes: [],
    wings: [],
    antennae: []
  };

  root.traverse(node => {
    if (!node.name) return;

    const name = node.name.toLowerCase();

    if (
      name.includes('eye') ||
      name.includes('pupil') ||
      name.includes('iris')
    ) {
      parts.eyes.push(node);
    }

    if (
      name.includes('wing') ||
      name.includes('ala')
    ) {
      parts.wings.push(node);
    }

    if (
      name.includes('antenna') ||
      name.includes('antena')
    ) {
      parts.antennae.push(node);
    }
  });

  return parts;
}

function applyTextureFallback(source) {
  const loader = new THREE.TextureLoader();

  loader.load(
    textureUrl,
    texture => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 4;
      texture.flipY = false;

      source.traverse(node => {
        if (!node.isMesh || !node.material) return;

        const materials = Array.isArray(node.material)
          ? node.material
          : [node.material];

        materials.forEach(material => {
          if (!material.map) {
            material.map = texture;
            material.needsUpdate = true;
          }
        });
      });
    },
    undefined,
    () => {
      console.info('colormap.png was not needed or could not be loaded.');
    }
  );
}

function loadBee(scene, callback, small = false) {
  const loader = new GLTFLoader();

  loader.load(
    beeUrl,
    gltf => {
      const source = gltf.scene;

      applyTextureFallback(source);

      const model = centerModel(source, small);

      if (gltf.animations.length) {
        const mixer = new THREE.AnimationMixer(source);

        gltf.animations.forEach(clip => {
          const action = mixer.clipAction(clip);
          action.play();
        });

        mixers.set(model, mixer);
      }

      beeParts.set(model, findParts(source));

      scene.add(model);
      callback(model);
    },
    undefined,
    error => {
      console.error('Unable to load animal-bee.glb:', error);
    }
  );
}

function applyPose(name) {
  const poses = {
    home: { head: 0, tilt: 0, lean: 0, bounce: 0 },
    about: { head: -0.08, tilt: 0.025, lean: -0.018, bounce: 0.008 },
    work: { head: 0.11, tilt: -0.02, lean: 0.018, bounce: -0.005 },
    contact: { head: -0.12, tilt: 0.035, lean: -0.012, bounce: 0.01 }
  };

  const labels = {
    home: 'in ascolto',
    about: 'ti racconto',
    work: 'guarda qui',
    contact: 'scrivimi'
  };

  Object.assign(poseTarget, poses[name] || poses.home);

  if (companionCaption) {
    companionCaption.textContent = labels[name] || labels.home;
  }
}

function animateBee(model, time, delta) {
  if (!model) return;

  for (const key of Object.keys(poseCurrent)) {
    poseCurrent[key] += (poseTarget[key] - poseCurrent[key]) * 0.055;
  }

  pointer.x += (pointer.targetX - pointer.x) * 0.08;
  pointer.y += (pointer.targetY - pointer.y) * 0.08;

  const breathe = reducedMotion ? 0 : Math.sin(time * 1.6) * 0.009;

  const targetX = pointer.y * 0.055 + poseCurrent.tilt;
  const targetY = -pointer.x * 0.18 + poseCurrent.head;
  const targetZ = poseCurrent.lean;

  model.position.z += (
    model.userData.baseZ +
    breathe +
    poseCurrent.bounce -
    model.position.z
  ) * 0.07;

  model.rotation.x += (targetX - model.rotation.x) * 0.065;
  model.rotation.y += (targetY - model.rotation.y) * 0.065;
  model.rotation.z += (targetZ - model.rotation.z) * 0.065;

  const mixer = mixers.get(model);
  if (mixer) {
    mixer.update(delta);
  }

  const parts = beeParts.get(model);

  if (!parts) return;

  if (!reducedMotion) {
    parts.wings.forEach((wing, index) => {
      const direction = index % 2 === 0 ? 1 : -1;
      wing.rotation.z += (
        Math.sin(time * 7.0) * 0.035 * direction -
        wing.rotation.z
      ) * 0.18;
    });
  }

  const eyeTurn = pointer.x * 0.035;
  const eyeLift = -pointer.y * 0.02;

  parts.eyes.forEach(eye => {
    const base = eye.userData.basePosition;

    if (!base) {
      eye.userData.basePosition = eye.position.clone();
      return;
    }

    eye.position.x += (
      base.x + eyeTurn - eye.position.x
    ) * 0.12;

    eye.position.y += (
      base.y + eyeLift - eye.position.y
    ) * 0.12;
  });
}

function setPointerFromEvent(event, canvas) {
  const rect = canvas.getBoundingClientRect();

  if (!rect.width || !rect.height) return;

  const x = (event.clientX - rect.left) / rect.width;
  const y = (event.clientY - rect.top) / rect.height;

  pointer.targetX = THREE.MathUtils.clamp((x - 0.5) * 2, -1, 1);
  pointer.targetY = THREE.MathUtils.clamp((y - 0.5) * 2, -1, 1);
}

function resetPointer() {
  pointer.targetX = 0;
  pointer.targetY = 0;
}

function init3D() {
  if (!heroCanvas) return;

  const hero = setupScene(heroCanvas);
  heroScene = hero.scene;
  heroCamera = hero.camera;
  heroRenderer = hero.renderer;

  loadBee(
    heroScene,
    model => {
      bee = model;
      heroCanvas.classList.add('is-ready');
    },
    false
  );

  resizeScene(hero, heroCanvas);
  window.addEventListener('resize', () => resizeScene(hero, heroCanvas));

  heroCanvas.addEventListener(
    'pointermove',
    event => setPointerFromEvent(event, heroCanvas)
  );

  heroCanvas.addEventListener('pointerleave', resetPointer);

  if (companionCanvas) {
    const small = setupScene(companionCanvas, true);

    companionScene = small.scene;
    companionCamera = small.camera;
    companionRenderer = small.renderer;

    loadBee(
      companionScene,
      model => {
        companionBee = model;
        companionCanvas.classList.add('is-ready');
      },
      true
    );

    resizeScene(small, companionCanvas);
    window.addEventListener('resize', () => resizeScene(small, companionCanvas));

    companionCanvas.addEventListener(
      'pointermove',
      event => setPointerFromEvent(event, companionCanvas)
    );

    companionCanvas.addEventListener('pointerleave', resetPointer);
  }

  clock = new THREE.Clock();
  requestAnimationFrame(render);
}

function render() {
  requestAnimationFrame(render);

  const delta = clock.getDelta();
  const time = clock.elapsedTime;

  animateBee(bee, time, delta);
  animateBee(companionBee, time, delta);

  if (heroRenderer) {
    heroRenderer.render(heroScene, heroCamera);
  }

  if (companionRenderer) {
    companionRenderer.render(companionScene, companionCamera);
  }
}

init3D();

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach(element => {
  revealObserver.observe(element);
});

const sections = [...document.querySelectorAll('main section[id]')];

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const poses = {
        home: 'home',
        'chi-sono': 'about',
        progetto: 'work',
        contatti: 'contact'
      };

      const pose = poses[entry.target.id];

      if (pose) {
        applyPose(pose);
      }

      const isHome = entry.target.id === 'home';

      companion?.classList.toggle('is-active', !isHome);
      companion?.setAttribute('aria-hidden', String(isHome));
    });
  },
  { threshold: 0.42 }
);

sections.forEach(section => sectionObserver.observe(section));

document.querySelectorAll('.lift, .case-link').forEach(element => {
  element.addEventListener('mouseenter', () => {
    applyPose('work');
    pointer.targetX = 0.28;
  });

  element.addEventListener('mouseleave', resetPointer);
});

const progress = document.getElementById('scrollProgress');

window.addEventListener(
  'scroll',
  () => {
    const height = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = (
      height > 0 ? (scrollY / height) * 100 : 0
    ) + '%';
  },
  { passive: true }
);

const AudioContextClass =
  window.AudioContext || window.webkitAudioContext;

let audioCtx = null;
let soundOn = true;

function blip(kind = 'hover') {
  if (!soundOn || !AudioContextClass) return;

  audioCtx ||= new AudioContextClass();

  if (audioCtx.state !== 'running') {
    return;
  }

  const oscillator = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const now = audioCtx.currentTime;

  oscillator.type = 'sine';

  oscillator.frequency.setValueAtTime(
    kind === 'click' ? 520 : 330,
    now
  );

  oscillator.frequency.exponentialRampToValueAtTime(
    kind === 'click' ? 760 : 420,
    now + 0.055
  );

  gain.gain.setValueAtTime(0.0001, now);

  gain.gain.exponentialRampToValueAtTime(
    kind === 'click' ? 0.028 : 0.009,
    now + 0.008
  );

  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    now + (kind === 'click' ? 0.1 : 0.055)
  );

  oscillator.connect(gain);
  gain.connect(audioCtx.destination);

  oscillator.start(now);
  oscillator.stop(now + 0.12);
}

function enableAudio() {
  if (!AudioContextClass) return;

  audioCtx ||= new AudioContextClass();

  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

window.addEventListener('pointerdown', enableAudio, {
  once: true,
  passive: true
});

document.querySelectorAll('[data-sound]').forEach(element => {
  element.addEventListener('mouseenter', () => {
    if (element.dataset.sound === 'hover') {
      blip('hover');
    }
  });

  element.addEventListener('click', () => {
    enableAudio();
    blip('click');
  });
});

const soundToggle = document.getElementById('soundToggle');

soundToggle?.addEventListener('click', () => {
  enableAudio();

  soundOn = !soundOn;

  soundToggle.querySelector('[data-ui-label=\"sound\"]')?.replaceChildren(document.createTextNode(soundOn ? 'Sound on' : 'Sound off'));
  soundToggle.querySelector('svg')?.replaceWith(Object.assign(document.createElement('i'), { dataset: { lucide: soundOn ? 'volume-2' : 'volume-x' }, ariaHidden: 'true' }));
  if (typeof lucide !== 'undefined') lucide.createIcons();

  soundToggle.setAttribute('aria-pressed', String(soundOn));
  soundToggle.setAttribute('aria-label', soundOn ? 'Turn sound off' : 'Turn sound on');

  if (soundOn) {
    blip('click');
  }
});

/* ---------- hero typing interaction ----------
   The greeting is short enough to feel intentional rather than like a loading screen.
   Audio is synthesized locally with Web Audio, so there is no external sound asset or
   third-party recording to license. Browsers still require a user gesture before audio
   can start, so the first interaction unlocks the sound context when possible. */
const typedGreeting = document.getElementById('typedGreeting');
const typingText = currentLanguage === 'it'
  ? 'Ciao, sono Antonietta Pascarella'
  : 'Hi, I\'m Antonietta Pascarella';
let typingIndex = 0;
let typingTimer = null;

function playKeySound() {
  if (!soundOn || !audioCtx || audioCtx.state !== 'running') return;

  const now = audioCtx.currentTime;
  const oscillator = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(110 + Math.random() * 35, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.012, now + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.028);

  oscillator.connect(gain);
  gain.connect(audioCtx.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.032);
}

function startTyping() {
  if (!typedGreeting) return;
  if (typingTimer) clearInterval(typingTimer);

  const text = currentLanguage === 'it'
    ? 'Ciao, sono Antonietta Pascarella'
    : 'Hi, I\'m Antonietta Pascarella';

  typedGreeting.textContent = '';
  typingIndex = 0;

  if (reducedMotion) {
    typedGreeting.textContent = text;
    return;
  }

  typingTimer = setInterval(() => {
    typedGreeting.textContent = text.slice(0, typingIndex + 1);
    playKeySound();
    typingIndex += 1;

    if (typingIndex >= text.length) {
      clearInterval(typingTimer);
      typingTimer = null;
    }
  }, 62);
}


applyLanguage(currentLanguage);
startTyping();
languageToggle?.addEventListener('click', () => {
  window.setTimeout(startTyping, 20);
});

if (typeof lucide !== 'undefined') {
  lucide.createIcons();
}
