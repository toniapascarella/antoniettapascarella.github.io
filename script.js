import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Keep the interface language predictable: Italian is the source language, French is the alternate locale.
const translations = {
  it: {},
  fr: {}
};
const heroCanvas = document.getElementById('avatar-canvas');
const companionCanvas = document.getElementById('companion-canvas');
const companion = document.getElementById('characterCompanion');
const companionCaption = document.getElementById('companionCaption');

let heroRenderer, heroScene, heroCamera, avatar;
let companionRenderer, companionScene, companionCamera, companionAvatar;
let clock;

const pointer = {
  x: 0,
  y: 0,
  targetX: 0,
  targetY: 0
};

const poseTarget = { head: 0, tilt: 0, arm: 0, lean: 0, bounce: 0 };
const poseCurrent = { ...poseTarget };
const eyeState = new WeakMap();
const avatarUrl = 'animal-bee.glb';

function setupScene(canvas, small = false) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(small ? 27 : 25, 1, 0.1, 100);
  camera.position.set(0, -7.4, 2.1);
  camera.lookAt(0, 0, 1.45);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);

  scene.add(new THREE.HemisphereLight(0xfff7e8, 0x463c31, 2.0));

  const key = new THREE.DirectionalLight(0xfff1cf, 2.2);
  key.position.set(3, -4, 5);
  scene.add(key);

  const fill = new THREE.DirectionalLight(0xd9d9e8, 1.0);
  fill.position.set(-3, -1, 3);
  scene.add(fill);

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

function prepareAvatar(model, small = false) {
  model.rotation.set(Math.PI, 0, 0);
  model.position.set(0, 0, 0);

  const box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  model.position.x -= center.x;
  model.position.z -= center.z;

  const desiredHeight = small ? 4.1 : 5.0;
  if (size.y > 0) {
    const scale = desiredHeight / size.y;
    model.scale.setScalar(scale);
  }

  return model;
}

function loadAvatar(scene, callback, small = false) {
  new GLTFLoader().load(
    avatarUrl,
    gltf => {
      const model = prepareAvatar(gltf.scene, small);
      scene.add(model);
      callback(model);
    },
    undefined,
    error => console.error('Unable to load animal-bee.glb:', error)
  );
}

function applyPose(name) {
  const poses = {
    home: { head: 0, tilt: 0, arm: 0, lean: 0, bounce: 0 },
    about: { head: -0.11, tilt: 0.035, arm: -0.08, lean: -0.025, bounce: 0.01 },
    work: { head: 0.15, tilt: -0.025, arm: 0.18, lean: 0.02, bounce: -0.006 },
    contact: { head: -0.16, tilt: 0.045, arm: -0.24, lean: -0.015, bounce: 0.012 }
  };

  const labels = {
    home: 'in ascolto',
    about: 'ti racconto',
    work: 'guarda qui',
    contact: 'scrivimi'
  };

  Object.assign(poseTarget, poses[name] || poses.home);
  if (companionCaption) companionCaption.textContent = labels[name] || labels.home;
}

function findPart(root, names) {
  const wanted = names.map(name => name.toLowerCase());
  let found = null;

  root.traverse(node => {
    if (found || !node.name) return;
    const name = node.name.toLowerCase();
    if (wanted.some(value => name === value || name.includes(value))) found = node;
  });

  return found;
}

function animateAvatar(model, time) {
  if (!model) return;

  for (const key of Object.keys(poseCurrent)) {
    poseCurrent[key] += (poseTarget[key] - poseCurrent[key]) * 0.06;
  }

  pointer.x += (pointer.targetX - pointer.x) * 0.09;
  pointer.y += (pointer.targetY - pointer.y) * 0.09;

  const breathe = reducedMotion ? 0 : Math.sin(time * 1.5) * 0.018;
  model.position.y = breathe + poseCurrent.bounce;
  model.position.x = poseCurrent.lean;

  const baseX = Math.PI;
  const targetY = -pointer.x * 0.22 + poseCurrent.head;
  const targetZ = -pointer.y * 0.07 + poseCurrent.tilt;

  model.rotation.x += (baseX - model.rotation.x) * 0.06;
  model.rotation.y += (targetY - model.rotation.y) * 0.06;
  model.rotation.z += (targetZ - model.rotation.z) * 0.06;

  const armLeft = findPart(model, ['arm_-1', 'arm_left', 'left_arm']);
  const armRight = findPart(model, ['arm_1', 'arm_right', 'right_arm']);
  const handLeft = findPart(model, ['hand_-1', 'hand_left', 'left_hand']);
  const handRight = findPart(model, ['hand_1', 'hand_right', 'right_hand']);
  const head = findPart(model, ['head', 'face']);
  const pupilLeft = findPart(model, ['pupil_-1']);
  const pupilRight = findPart(model, ['pupil_1']);
  const irisLeft = findPart(model, ['iris_-1']);
  const irisRight = findPart(model, ['iris_1']);

  if (!eyeState.has(model)) {
    eyeState.set(model, {
      pupilLeft: pupilLeft ? { x: pupilLeft.rotation.x, y: pupilLeft.rotation.y } : null,
      pupilRight: pupilRight ? { x: pupilRight.rotation.x, y: pupilRight.rotation.y } : null,
      irisLeft: irisLeft ? { x: irisLeft.rotation.x, y: irisLeft.rotation.y } : null,
      irisRight: irisRight ? { x: irisRight.rotation.x, y: irisRight.rotation.y } : null
    });
  }

  const eyes = eyeState.get(model);
  const eyeX = -pointer.y * 0.18;
  const eyeY = pointer.x * 0.20;

  if (pupilLeft && eyes.pupilLeft) {
    pupilLeft.rotation.x = eyes.pupilLeft.x + eyeX;
    pupilLeft.rotation.y = eyes.pupilLeft.y + eyeY;
  }
  if (pupilRight && eyes.pupilRight) {
    pupilRight.rotation.x = eyes.pupilRight.x + eyeX;
    pupilRight.rotation.y = eyes.pupilRight.y + eyeY;
  }
  if (irisLeft && eyes.irisLeft) {
    irisLeft.rotation.x = eyes.irisLeft.x + eyeX * 0.8;
    irisLeft.rotation.y = eyes.irisLeft.y + eyeY * 0.8;
  }
  if (irisRight && eyes.irisRight) {
    irisRight.rotation.x = eyes.irisRight.x + eyeX * 0.8;
    irisRight.rotation.y = eyes.irisRight.y + eyeY * 0.8;
  }

  if (armLeft) armLeft.rotation.z += (-poseCurrent.arm * 0.20 - armLeft.rotation.z) * 0.07;
  if (armRight) armRight.rotation.z += (poseCurrent.arm * 0.20 - armRight.rotation.z) * 0.07;
  if (handLeft) handLeft.rotation.z += (-poseCurrent.arm * 0.10 - handLeft.rotation.z) * 0.07;
  if (handRight) handRight.rotation.z += (poseCurrent.arm * 0.10 - handRight.rotation.z) * 0.07;
  if (head) head.rotation.z += (poseCurrent.tilt * 0.35 - head.rotation.z) * 0.05;
}

function setPointerFromEvent(event, canvas) {
  const rect = canvas.getBoundingClientRect();
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
  loadAvatar(heroScene, model => { avatar = model; });
  resizeScene(hero, heroCanvas);
  window.addEventListener('resize', () => resizeScene(hero, heroCanvas));

  heroCanvas.addEventListener('pointermove', event => setPointerFromEvent(event, heroCanvas));
  heroCanvas.addEventListener('pointerleave', resetPointer);

  if (companionCanvas) {
    const small = setupScene(companionCanvas, true);
    companionScene = small.scene;
    companionCamera = small.camera;
    companionRenderer = small.renderer;
    loadAvatar(companionScene, model => { companionAvatar = model; }, true);
    resizeScene(small, companionCanvas);
    window.addEventListener('resize', () => resizeScene(small, companionCanvas));

    companionCanvas.addEventListener('pointermove', event => setPointerFromEvent(event, companionCanvas));
    companionCanvas.addEventListener('pointerleave', resetPointer);
  }

  clock = new THREE.Clock();
  requestAnimationFrame(render);
}

function render() {
  requestAnimationFrame(render);
  const time = clock.getElapsedTime();
  animateAvatar(avatar, time);
  animateAvatar(companionAvatar, time);

  if (heroRenderer) heroRenderer.render(heroScene, heroCamera);
  if (companionRenderer) companionRenderer.render(companionScene, companionCamera);
}

init3D();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

const sections = [...document.querySelectorAll('main section[id]')];

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const poses = {
      home: 'home',
      'chi-sono': 'about',
      progetto: 'work',
      contatti: 'contact'
    };

    if (poses[entry.target.id]) {
      applyPose(poses[entry.target.id]);

      const showCompanion = entry.target.id !== 'home';
      companion?.classList.toggle('is-active', showCompanion);
      companion?.setAttribute('aria-hidden', String(!showCompanion));
    }
  });
}, { threshold: 0.42 });

sections.forEach(section => sectionObserver.observe(section));

document.querySelectorAll('.lift,.case-link').forEach(element => {
  element.addEventListener('mouseenter', () => {
    applyPose('work');
    pointer.x = 0.34;
  });

  element.addEventListener('mouseleave', () => {
    pointer.x = 0;
  });
});

const progress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${total > 0 ? (window.scrollY / total) * 100 : 0}%`;
}, { passive: true });



// The typing sound is synthesized in the browser, so there is no external audio asset or licensing dependency.
const AudioContextClass = window.AudioContext || window.webkitAudioContext;
let audioContext = null;
let soundOn = true;

function enableAudio() {
  if (!AudioContextClass) return;
  if (!audioContext) audioContext = new AudioContextClass();
  if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
}

function playKeySound() {
  if (!soundOn || !audioContext || audioContext.state !== 'running') return;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const now = audioContext.currentTime;
  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(145 + Math.random() * 24, now);
  oscillator.frequency.exponentialRampToValueAtTime(92, now + 0.035);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.035, now + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.055);
}

function playUiSound(kind = 'click') {
  if (!soundOn || !audioContext || audioContext.state !== 'running') return;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const now = audioContext.currentTime;
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(kind === 'click' ? 520 : 330, now);
  oscillator.frequency.exponentialRampToValueAtTime(kind === 'click' ? 760 : 420, now + 0.055);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(kind === 'click' ? 0.022 : 0.008, now + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + (kind === 'click' ? 0.1 : 0.055));
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.12);
}

document.addEventListener('pointerdown', enableAudio, { once: true });

// The hero name is intentionally typed once on first load, then retyped when the locale changes.
const typedName = document.getElementById('typedName');
let typingTimer = null;
let typingRun = 0;

function typeHeroName() {
  if (!typedName) return;
  const run = ++typingRun;
  clearTimeout(typingTimer);
  const text = i18next.language === 'fr' ? 'Antonietta Pascarella' : 'Antonietta Pascarella';
  typedName.textContent = '';
  if (reducedMotion) { typedName.textContent = text; return; }
  let index = 0;
  const typeNext = () => {
    if (run !== typingRun) return;
    typedName.textContent = text.slice(0, index + 1);
    if (text[index] !== ' ') playKeySound();
    index += 1;
    if (index < text.length) typingTimer = window.setTimeout(typeNext, 70 + Math.random() * 55);
  };
  typingTimer = window.setTimeout(typeNext, 260);
}

const soundToggle = document.getElementById('soundToggle');
const languageToggle = document.getElementById('languageToggle');

function updateSoundButton() {
  if (!soundToggle) return;
  const icon = soundToggle.querySelector('[data-lucide]');
  if (icon) icon.setAttribute('data-lucide', soundOn ? 'volume-2' : 'volume-x');
  const label = soundToggle.querySelector('[data-i18n]');
  if (label) label.textContent = i18next.t(soundOn ? 'controls.soundOn' : 'controls.soundOff');
  soundToggle.setAttribute('aria-pressed', String(soundOn));
  soundToggle.setAttribute('aria-label', i18next.t(soundOn ? 'controls.turnOff' : 'controls.turnOn'));
  window.lucide?.createIcons();
}

const resources = {
  it: { translation: {
    nav:{home:'01. Home',about:'02. About',work:'03. Work',contact:'04. Contact'},
    controls:{soundOn:'Sound on',soundOff:'Sound off',turnOff:'Turn sound off',turnOn:'Turn sound on'},
    hero:{kicker:'UI/UX Designer · Bologna',greeting:'Ciao, sono',role:'UX/UI Designer',intro:'Sono Antonietta, laureata magistrale in Informatica con lode. Ho portato nel design il metodo che mi ha insegnato l'informatica: ricerca strutturata, iterazioni documentate e decisioni motivate, non solo schermate belle da vedere.',cta:'Scopri il progetto ↓',note:'scroll / move the character / listen to the details'},
    avatar:{status:'interactive character',listening:'in ascolto'},
    about:{label:'Chi sono',title:'Dall'informatica al design, senza perdere il metodo',p1:'Il mio percorso in informatica mi ha dato familiarità con il pensiero sistemico, la lettura di dati reali e la costruzione di processi ripetibili. Nel design applico lo stesso approccio: ogni scelta, che sia un flusso, un componente o una gerarchia visiva, nasce da un'ipotesi verificabile e non da un'intuizione isolata.',p2:'Lavoro sia sul lato UX (ricerca, architettura dell'informazione, user flow) sia sul lato UI (design system, alta fedeltà, accessibilità), con un'attenzione particolare ai contesti industriali e data-intensive, dove la chiarezza dell'informazione conta quanto l'estetica.'},
    work:{label:'Caso studio',title:'Redesign dell'interfaccia operativa per un impianto industriale',lede:'Progetto realizzato per un'azienda italiana attiva nella produzione di impianti industriali, in collaborazione con il team tecnico dell'agenzia per cui lavoro.',metaRole:'Ruolo',metaPhases:'Fasi',metaTools:'Strumenti',role:'UX/UI Design, sviluppo del design system',phases:'Wireframe → Mockup → Prototipo interattivo',tools:'Figma, Stark (audit accessibilità)',context1:'Il progetto nasce da una pipeline dati IoT/ML già esistente (raccolta e predizione dei dati di impianto). Il mio compito è stato progettare l'interfaccia web che rende questi dati fruibili a due profili utente: il <em>Plant Manager</em>, interessato alla performance d'insieme, e il <em>Maintenance Technician</em>, focalizzato su manutenzione predittiva e allarmi.',context2:'Il cliente desiderava rinnovare un'applicazione esistente, poco leggibile e priva di un sistema coerente. Le esigenze di business e utente erano già state raccolte dal cliente attraverso interviste dirette con gli utenti finali; ho ricevuto brief e interfacce originali, e da lì ho condotto un'analisi euristica per individuare criticità di usabilità prima di ridisegnare.',beforeAfterTitle:'Prima e dopo',compareIntro:'Confronto tra l'interfaccia originale e il nuovo design system, pensato per dare gerarchia visiva immediata tramite color-coding per categoria funzionale.',before:'Prima: tile monocromatiche, nessuna gerarchia',after:'Dopo: color coding per modulo funzionale',processTitle:'Dal wireframe al prototipo',process1:'Il lavoro ha coperto l'intero flusso applicativo: autenticazione con login, registrazione e reset password su due canali (email e telefono), selezione geografica con mappa interattiva sincronizzata a una lista filtrabile, landing page a moduli e le sette funzionalità core dell'app, tra cui manutenzione predittiva, performance dell'impianto, risparmio energetico, storico dati e gestione allarmi.',process2:'Ogni schermata è passata da wireframe a bassa fedeltà a mockup ad alta fedeltà, fino a un prototipo Figma cliccabile. Ho dedicato attenzione anche ai micro stati dei singoli componenti, come un filtro con zero, uno o più elementi selezionati, e non solo alle schermate considerate "finali".'},
    palette:{title:'Design system, la palette',intro:'Palette estratta dal file Figma di produzione, organizzata per funzione: base, brand, semantica (stati positivi/critici/warning) e accenti categorici per modulo.'},
    accessibility:{label:'Accessibilità',title:'Conformità WCAG verificata, non presunta',text:'Tutti i mockup del progetto sono stati sottoposti a verifica tramite <strong>Stark, Universal Accessibility Framework (SUAF)</strong>, per controllare la conformità alle <a href="https://www.w3.org/WAI/WCAG2AA-Conformance" target="_blank" rel="noopener">Web Content Accessibility Guidelines</a>. Il risultato è una conformità di livello <strong>AA</strong> su tutti i componenti verificati, e <strong>AAA</strong> per la maggior parte di essi, contrasto colore, dimensione del testo e stati interattivi inclusi.'},
    contact:{label:'Contatti',title:'Parliamone',text:'Sono disponibile per nuove collaborazioni e progetti di UX/UI design.'},
    footer:{text:'Antonietta Pascarella, UI/UX Designer · Bologna, Italia'}
  }},
  fr: { translation: {
    nav:{home:'01. Accueil',about:'02. À propos',work:'03. Projets',contact:'04. Contact'},
    controls:{soundOn:'Son activé',soundOff:'Son désactivé',turnOff:'Désactiver le son',turnOn:'Activer le son'},
    hero:{kicker:'UI/UX Designer · Bologne',greeting:'Bonjour, je suis',role:'UX/UI Designer',intro:'Je suis Antonietta, diplômée d’un master en informatique avec mention. J’ai apporté au design la méthode apprise en informatique : recherche structurée, itérations documentées et décisions argumentées, au-delà des écrans simplement esthétiques.',cta:'Découvrir le projet ↓',note:'faire défiler / déplacer le personnage / écouter les détails'},
    avatar:{status:'personnage interactif',listening:'à l’écoute'},
    about:{label:'À propos',title:'De l’informatique au design, sans perdre la méthode',p1:'Mon parcours en informatique m’a familiarisée avec la pensée systémique, la lecture de données réelles et la construction de processus reproductibles. En design, j’applique la même approche : chaque choix, qu’il s’agisse d’un flux, d’un composant ou d’une hiérarchie visuelle, part d’une hypothèse vérifiable plutôt que d’une intuition isolée.',p2:'Je travaille sur la partie UX (recherche, architecture de l’information, user flows) comme sur la partie UI (design system, haute fidélité, accessibilité), avec une attention particulière aux contextes industriels et data-intensive, où la clarté de l’information compte autant que l’esthétique.'},
    work:{label:'Étude de cas',title:'Refonte de l’interface opérationnelle d’une installation industrielle',lede:'Projet réalisé pour une entreprise italienne spécialisée dans la production d’installations industrielles, en collaboration avec l’équipe technique de l’agence où je travaille.',metaRole:'Rôle',metaPhases:'Étapes',metaTools:'Outils',role:'UX/UI Design, développement du design system',phases:'Wireframe → Mockup → Prototype interactif',tools:'Figma, Stark (audit d’accessibilité)',context1:'Le projet s’appuie sur une pipeline de données IoT/ML existante (collecte et prédiction des données de l’installation). Mon rôle a été de concevoir l’interface web qui rend ces données accessibles à deux profils : le <em>Plant Manager</em>, intéressé par la performance globale, et le <em>Maintenance Technician</em>, centré sur la maintenance prédictive et les alertes.',context2:'Le client souhaitait moderniser une application existante, peu lisible et dépourvue de système cohérent. Les besoins métier et utilisateurs avaient déjà été recueillis par le client lors d’entretiens directs avec les utilisateurs finaux ; j’ai reçu le brief et les interfaces d’origine, puis mené une analyse heuristique pour identifier les problèmes d’utilisabilité avant la refonte.',beforeAfterTitle:'Avant et après',compareIntro:'Comparaison entre l’interface originale et le nouveau design system, conçu pour créer une hiérarchie visuelle immédiate grâce au color-coding par catégorie fonctionnelle.',before:'Avant : tuiles monochromes, aucune hiérarchie',after:'Après : color-coding par module fonctionnel',processTitle:'Du wireframe au prototype',process1:'Le travail a couvert l’ensemble du parcours applicatif : authentification avec connexion, inscription et réinitialisation du mot de passe par e-mail ou téléphone, sélection géographique avec carte interactive synchronisée à une liste filtrable, landing page modulaire et les sept fonctionnalités principales de l’application, dont la maintenance prédictive, la performance de l’installation, les économies d’énergie, l’historique des données et la gestion des alertes.',process2:'Chaque écran est passé d’un wireframe basse fidélité à une maquette haute fidélité, puis à un prototype Figma cliquable. J’ai également porté attention aux micro-états des composants, par exemple un filtre avec zéro, un ou plusieurs éléments sélectionnés, et pas uniquement aux écrans considérés comme « finaux ».'},
    palette:{title:'Design system, la palette',intro:'Palette extraite du fichier Figma de production et organisée par fonction : base, marque, sémantique (états positifs/critiques/warning) et accents catégoriels par module.'},
    accessibility:{label:'Accessibilité',title:'Conformité WCAG vérifiée, pas supposée',text:'Toutes les maquettes du projet ont été vérifiées avec <strong>Stark, Universal Accessibility Framework (SUAF)</strong> afin de contrôler leur conformité aux <a href="https://www.w3.org/WAI/WCAG2AA-Conformance" target="_blank" rel="noopener">Web Content Accessibility Guidelines</a>. Le résultat est une conformité de niveau <strong>AA</strong> pour tous les composants vérifiés et <strong>AAA</strong> pour la majorité d’entre eux, notamment en matière de contraste, de taille de texte et d’états interactifs.'},
    contact:{label:'Contact',title:'Parlons-en',text:'Je suis disponible pour de nouvelles collaborations et des projets de design UX/UI.'},
    footer:{text:'Antonietta Pascarella, UI/UX Designer · Bologne, Italie'}
  }}
};

// Use i18next for locale management, while keeping the actual portfolio copy curated rather than machine-translated at runtime.
i18next.init({ resources, lng: localStorage.getItem('portfolio-language') || (navigator.language?.toLowerCase().startsWith('fr') ? 'fr' : 'it'), fallbackLng:'it', interpolation:{escapeValue:false} }).then(() => {
  applyLanguage();
  typeHeroName();
});

const extraFrenchText = {
  'UX Research':'Recherche UX','UI Design':'Design UI','Design System':'Design system','Data-Informed Design':'Design fondé sur les données',
  'Scopri il progetto ↓':'Découvrir le projet ↓','scroll / move the character / listen to the details':'faire défiler / déplacer le personnage / écouter les détails',
  'ciao, sono Antonietta! ♡':'bonjour, je suis Antonietta','Il contesto':'Le contexte','Prima e dopo':'Avant et après','Dal wireframe al prototipo':'Du wireframe au prototype',
  'Dalla documentazione del progetto':'Extrait de la documentation du projet','Design system, la palette':'Design system, la palette',
  'Base & neutrali':'Base et neutres','Brand':'Marque','Semantica: positivo, critico, warning':'Sémantique : positif, critique, warning','Accenti categorici per modulo':'Accents catégoriels par module',
  'Nero principale':'Noir principal','Superficie scura':'Surface sombre','Bianco input':'Blanc des champs','Bianco':'Blanc','Grigio testo':'Gris texte','Nero':'Noir',
  'Giallo brand':'Jaune de marque','Blu brand':'Bleu de marque','Verde pieno':'Vert plein','Menta':'Menthe','Verde chiaro':'Vert clair','Rosso':'Rouge','Arancione':'Orange','Arancione warning':'Orange warning','Arancione chiaro':'Orange clair',
  'Viola Mixer':'Violet Mixer','Viola chiaro':'Violet clair','Lilla tenue':'Lilas doux','Viola linea':'Violet ligne','Blu filter':'Bleu filtre','Blu electrical':'Bleu électrique','Blu lavanda':'Bleu lavande','Azzurro maintenance':'Bleu maintenance','Rosa energy':'Rose energy','Oro period':'Or period','Giallo plant':'Jaune plant','Turchese':'Turquoise',
  'Email':'E-mail','LinkedIn':'LinkedIn','Behance':'Behance'
};

function applyExtraTextLanguage() {
  document.querySelectorAll('body *').forEach(element => {
    if (element.closest('[data-i18n]') || element.tagName === 'SCRIPT' || element.tagName === 'STYLE') return;
    Array.from(element.childNodes).forEach(node => {
      if (node.nodeType !== Node.TEXT_NODE) return;
      const original = node.textContent.trim();
      if (!original || !(original in extraFrenchText)) return;
      if (!node.dataset.originalText) node.dataset.originalText = original;
      node.textContent = i18next.language === 'fr' ? node.textContent.replace(original, extraFrenchText[original]) : node.textContent.replace(extraFrenchText[original], node.dataset.originalText);
    });
  });
}

function applyLanguage() {
  document.documentElement.lang = i18next.language;
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.innerHTML = i18next.t(key);
  });
  if (languageToggle) {
    const next = i18next.language === 'it' ? 'FR' : 'IT';
    languageToggle.querySelector('#languageLabel')?.replaceChildren(document.createTextNode(next));
    languageToggle.setAttribute('aria-label', i18next.language === 'it' ? 'Switch to French' : 'Passer à l’italien');
  }
  applyExtraTextLanguage();
  updateSoundButton();
  typeHeroName();
}

languageToggle?.addEventListener('click', () => {
  enableAudio();
  playUiSound('click');
  const next = i18next.language === 'it' ? 'fr' : 'it';
  i18next.changeLanguage(next).then(() => {
    localStorage.setItem('portfolio-language', next);
    applyLanguage();
  });
});

soundToggle?.addEventListener('click', () => {
  enableAudio();
  soundOn = !soundOn;
  updateSoundButton();
  if (soundOn) playUiSound('click');
});

document.querySelectorAll('[data-sound]').forEach(element => {
  element.addEventListener('mouseenter', () => {
    if (element.dataset.sound === 'hover') playUiSound('hover');
  });
  element.addEventListener('click', () => playUiSound('click'));
});

window.lucide?.createIcons();
