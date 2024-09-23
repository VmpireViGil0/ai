// Create a style element for CSS
const style = document.createElement('style');
style.textContent = `
  body {
    position: relative;
    overflow: hidden; /* Prevents scrollbars from appearing */
  }

  /* Black transparent background */
  body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* Adjust opacity as needed */
    z-index: 0; /* Behind all other content */
  }

  @keyframes fall {
    0% {
      transform: translateY(-10%); /* Start just above the viewport */
    }
    100% {
      transform: translateY(100vh); /* Fall to the bottom of the viewport */
    }
  }

  .petal {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: pink;
    opacity: 0.7;
    border-radius: 50%;
    animation: fall linear infinite;
    pointer-events: none; /* So they don't interfere with other elements */
    z-index: 1; /* In front of the background */
  }

  /* Injected image style */
  .injected-image {
    position: fixed;
    top: 10px; /* Adjust as needed */
    left: 10px; /* Adjust as needed */
    z-index: 2; /* In front of everything */
    width: 100px; /* Adjust size as needed */
    height: auto; /* Maintain aspect ratio */
  }
`;

// Append the style to the head
document.head.appendChild(style);

// Function to create a petal
function createPetal() {
  const petal = document.createElement('div');
  petal.className = 'petal';
  
  // Randomize position and animation duration
  petal.style.left = Math.random() * window.innerWidth + 'px';
  petal.style.animationDuration = (Math.random() * 3 + 2) + 's'; // 2s to 5s
  petal.style.top = -10 + 'px'; // Start just above the viewport

  // Append the petal to the body
  document.body.appendChild(petal);

  // Remove petal after animation
  petal.addEventListener('animationend', () => {
    petal.remove();
  });
}

// Generate petals every 300ms
setInterval(createPetal, 300);

// Function to inject the image
function injectImage() {
  const img = document.createElement('img');
  img.src = 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1172470/capsule_616x353.jpg';
  img.className = 'injected-image';
  document.body.appendChild(img);
}

// Call the function to inject the image
injectImage();
