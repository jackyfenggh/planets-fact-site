// fetch planet data and set to planetData

const planet_data_url = "https://jackyfenggh.github.io/data/planet-data.json";
// let mercury, venus, earth, mars, jupiter, saturn, uranus, neptune;

let planetData = {};

let pageContentSettings = {
  'currentPlanet': 'mercury',
  'currentTab': 'overview'
}

fetch(planet_data_url)
  .then(function (response) {
    return response = response.json();
  })
  .then(function (data) {
    const [ mercury, venus, earth, mars, jupiter, saturn, uranus, neptune ] = data;
    planetData = {
      'mercury': mercury,
      'venus': venus,
      'earth': earth,
      'mars': mars,
      'jupiter': jupiter,
      'saturn': saturn,
      'uranus': uranus,
      'neptune': neptune
    };
  });

function setupEventListeners() {
  const hamburgerMenu = document.getElementById('hamburger-menu');
  hamburgerMenu.addEventListener('click', toggleMenu);

  const planetsNav = document.getElementById('container-planets-nav');
  planetsNav.addEventListener('click', updatePlanet);

  const planetDetailsNav = document.getElementsByClassName('container-planet-details-nav');
  for (let i = 0; i < planetDetailsNav.length; i++) {
    planetDetailsNav[i].addEventListener('click', updatePlanetDetailsTab);
  }
}

function toggleMenu() {
  const mainContent = document.querySelector('main');
  const planetsNavMenu = document.querySelector('[aria-label="planets-nav"]');
  const planetDetailsTabs = document.querySelector('.container-planet-details-nav');
  const hamburgerMenu = document.querySelector('.hamburger-menu');

  if (planetsNavMenu.classList.contains('hidden')) {
    planetsNavMenu.classList.remove('hidden');
    mainContent.classList.add('hidden');
    planetDetailsTabs.classList.add('hidden');
    hamburgerMenu.src = 'assets/hamburger-icon-dark.png';
  } else {
    planetsNavMenu.classList.add('hidden');
    mainContent.classList.remove('hidden');
    planetDetailsTabs.classList.remove('hidden');
    hamburgerMenu.src = 'assets/hamburger-icon.png';
  }
}

function updatePlanet(event) {
  const targetPlanet = event.target.textContent.toLowerCase();
  const targetTab = 'overview';

  if (targetPlanet === pageContentSettings.currentPlanet) {
    return;
  }

  updateCurrentPlanetStyling(targetPlanet);
  updateDynamicElements(targetTab, targetPlanet);
  updateCurrentTabStyling(targetTab);

  pageContentSettings.currentPlanet = targetPlanet;
  pageContentSettings.currentTab = targetTab;
}

function updateCurrentPlanetStyling(targetPlanet) {
  // remove current-planet class from current-planet h3
  const currentPlanet = document.getElementsByClassName('current-planet');
  currentPlanet[0].classList.remove('current-planet');

  // add current-planet class to target planet h3
  const newCurrentPlanet = document.getElementById(targetPlanet);
  newCurrentPlanet.classList.add('current-planet');
}

function updatePlanetDetailsTab(event) {
  if (event.target.tagName === 'UL') {
    return;
  }

  // get target tab name
  const targetTab = event.target.textContent.toLowerCase();
  const currentPlanet = pageContentSettings.currentPlanet;

  if (targetTab === pageContentSettings.currentTab) {
    return;
  }

  updateCurrentTabStyling(targetTab);
  updateDynamicElements(targetTab, currentPlanet);

  pageContentSettings.currentTab = targetTab;
}

function updateCurrentTabStyling(targetTab) {
  // there are 2 navigation menus for the detail tabs
  // due to the difference in page layouts across screen sizes

  // remove current-tab class from current tab elements
  const currentTabs = document.getElementsByClassName('current-tab');
  for (let i = currentTabs.length - 1; i >= 0; i--) {
    currentTabs[i].classList.remove('current-tab');
  }

  // add current-tab class to target tab elements
  const newCurrentTabs = document.getElementsByClassName(targetTab);
  for (let i = newCurrentTabs.length - 1; i >= 0; i--) {
    newCurrentTabs[i].classList.add('current-tab');
  }
}

function updateDynamicElements(targetTab, targetPlanet) {
  const planet = targetPlanet;
  const details = targetTab;

  // update hero image
  const heroImage = document.getElementById('hero-image');
  heroImage.src = planetData[planet]['images'][details];
  
  // update paragraph
  const planetDetailsParagraph = document.getElementById('info-card-text');
  planetDetailsParagraph.textContent = planetData[planet][details].content;

  // update source
  const planetDetailsSource = document.getElementById('info-card-source');
  planetDetailsSource.href = planetData[planet][details].source;

  // update planet name
  const planetName = document.getElementById('info-card-planet-name');
  planetName.textContent = targetPlanet.toUpperCase();

  // update planet facts
  const factFigures = document.getElementsByClassName('fact-figure');
  const [ rotation, revolution, radius, temperature ] = factFigures;

  rotation.textContent = planetData[planet]['rotation'];
  revolution.textContent = planetData[planet]['revolution'];
  radius.textContent = planetData[planet]['radius'];
  temperature.textContent = planetData[planet]['temperature'];
}

setupEventListeners();