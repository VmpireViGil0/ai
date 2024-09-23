// Create a style element for CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes fall {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(100vh);
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

  // Append the petal to the body
  document.body.appendChild(petal);

  // Remove petal after animation
  petal.addEventListener('animationend', () => {
    petal.remove();
  });
}

// Generate petals every 300ms
setInterval(createPetal, 300);
