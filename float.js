document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll('.floating-element');
  const velocities = [
    { x: 2, y: 2 }, // Velocity for element 1
    { x: -2, y: 2 }, // Velocity for element 2
    { x: 2, y: -2 }  // Velocity for element 3
  ];

  const title = document.querySelector('h1'); // Assuming the title is in an <h1> tag

  function centerElements() {
    const titleRect = title.getBoundingClientRect();
    const titleCenterX = titleRect.left + titleRect.width / 2;
    const titleCenterY = titleRect.top + titleRect.height / 2;

    elements.forEach((el, index) => {
      el.style.left = (titleCenterX - el.offsetWidth / 2) + 'px';
      el.style.top = (titleCenterY - el.offsetHeight / 2) + 'px';
    });
  }

  function updatePosition(el, velocity) {
    const rect = el.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let newX = rect.left + velocity.x;
    let newY = rect.top + velocity.y;

    // Bounce off the edges
    if (newX <= 0 || newX + rect.width >= windowWidth) {
      velocity.x = -velocity.x; // Reverse X direction
    }
    if (newY <= 0 || newY + rect.height >= windowHeight) {
      velocity.y = -velocity.y; // Reverse Y direction
    }

    // Ensure the element stays within bounds
    newX = Math.max(0, Math.min(newX, windowWidth - rect.width));
    newY = Math.max(0, Math.min(newY, windowHeight - rect.height));

    el.style.left = newX + 'px';
    el.style.top = newY + 'px';
  }

  function animate() {
    elements.forEach((el, index) => {
      updatePosition(el, velocities[index]);
    });

    requestAnimationFrame(animate); // Request next frame
  }

  centerElements(); // Center elements at the start
  animate(); // Start animation
});
