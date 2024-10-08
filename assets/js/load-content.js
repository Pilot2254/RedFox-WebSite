// load-content.js

// By adding the async or defer attribute when loading scripts, the browser can continue parsing the HTML without waiting for the JavaScript to finish loading.
// - async loads the script as soon as it’s downloaded but does not wait for the HTML parsing to finish.
// - defer loads the script after the HTML has been fully parsed.

// Function to load a CSS file
function loadCSS(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }
  
  // Function to load a JS file with 'defer' or 'async'
  function loadJS(src, mode) {
    const script = document.createElement('script');
    script.src = src;
  
    if (mode === 'defer') {
      script.defer = true;
    } else if (mode === 'async') {
      script.async = true;
    }
  
    document.head.appendChild(script);
  }

  // Function to set favicon
  function setFavicon(href) {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = href;
    document.head.appendChild(link);
  }

  // Set the favicon
  setFavicon('/assets/images/favicon.png');
  
  // Function to preconnect to a given URL
  function preconnect(url) {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = url;
    document.head.appendChild(link);
  }

  // Preconnect to Google Fonts
  preconnect('https://fonts.googleapis.com');
  preconnect('https://fonts.gstatic.com');

  // Load Google Fonts
  loadCSS('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

  // Load local fonts.css
  loadCSS('/assets/css/fonts.css');
  
  // Load FontAwesome Kit
  loadJS('https://kit.fontawesome.com/76661d0faf.js', 'defer');
  
  // Load local CSS files
  loadCSS('/assets/css/animations.css');
  loadCSS('/assets/css/styles.css');
  loadCSS('/assets/css/scrollbar.css');
  loadCSS('/assets/css/highlight.css');
  loadCSS('/assets/css/cursors.css');
  
  // Load local JS
  loadJS('/assets/js/protection.js', 'async'); // async important and required for this JS file
  loadJS('/assets/js/main.js', 'defer');
  loadJS('/assets/js/table-search.js', 'defer');
  loadJS('/assets/js/transition.js', 'defer');
  loadJS('/assets/js/capture-website-logs.js', 'defer');
  loadJS('/assets/js/catch-errors.js', 'defer');
  loadJS('/assets/js/progress-bar.js', 'async');