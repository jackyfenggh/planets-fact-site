function setupEventListeners() {
  var hamburgerMenu = document.getElementById('hamburger-menu');
  hamburgerMenu.addEventListener('click', toggleMenu);
}

function toggleMenu() {
  var mainContent = document.querySelector('main');
  var planetsNavMenu = document.querySelector('[aria-label="planets-nav"]');
  var planetDetailsTabs = document.querySelector('.container-planet-details-nav');
  var hamburgerMenu = document.querySelector('.hamburger-menu');

  if (!planetsNavMenu.classList.contains('hidden')) {
    planetsNavMenu.classList.add('hidden');
    mainContent.classList.remove('hidden');
    planetDetailsTabs.classList.remove('hidden');
    hamburgerMenu.src = 'assets/hamburger-icon.png';
  } else { // (planetsNavMenu.style.display === 'none' || planetsNavMenu.style.display === "") 
    planetsNavMenu.classList.remove('hidden');
    mainContent.classList.add('hidden');
    planetDetailsTabs.classList.add('hidden');
    hamburgerMenu.src = 'assets/hamburger-icon-dark.png';
  }
}

setupEventListeners();