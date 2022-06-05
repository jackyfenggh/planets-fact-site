function setupEventListeners() {
  var hamburgerMenu = document.getElementById('hamburger-menu');
  hamburgerMenu.addEventListener('click', toggleMenu);
}

function toggleMenu() {
  var mainContent = document.querySelector('main');
  var mobileNav = document.getElementById('container-planets-nav');
  var planetDetailsTabs = document.getElementById('container-planet-details-nav');

  if (mobileNav.style.display === 'block') {
    mobileNav.style.display = 'none';
    mainContent.style.display = 'block';
    planetDetailsTabs.style.display = 'flex';
  } else { // (mobileNav.style.display === 'none' || mobileNav.style.display === "") 
    mobileNav.style.display = 'block';
    mainContent.style.display = 'none';
    planetDetailsTabs.style.display = 'none';
  }
}

setupEventListeners();