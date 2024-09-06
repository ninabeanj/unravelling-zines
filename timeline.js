document.addEventListener('DOMContentLoaded', () => {
  const timelineEvents = document.querySelectorAll('.timeline-event');

  // Initialize circles with content
  timelineEvents.forEach(event => {
    const content = event.getAttribute('data-content');
    if (content) {
      const [title, description] = content.split('|');
      event.innerHTML = `
        <div class="circle">
          <h3>${title}</h3>
          <p>${description}</p>
        </div>
      `;
    }
  });

  // Function to draw lines between events
  const drawLines = () => {
    // Remove existing lines
    document.querySelectorAll('.timeline-line').forEach(line => line.remove());

    // Get the timeline container for positioning the lines
    const timeline = document.querySelector('.timeline');
    const timelineRect = timeline.getBoundingClientRect();

    timelineEvents.forEach((event, index) => {
      if (index < timelineEvents.length - 1) {
        const nextEvent = timelineEvents[index + 1];

        const eventRect = event.getBoundingClientRect();
        const nextEventRect = nextEvent.getBoundingClientRect();

        // Calculate start and end points
        const startX = eventRect.left + eventRect.width / 2 - timelineRect.left;
        const startY = eventRect.bottom - timelineRect.top; // Bottom of the current event
        const endX = nextEventRect.left + nextEventRect.width / 2 - timelineRect.left;
        const endY = nextEventRect.top - timelineRect.top; // Top of the next event

        const line = document.createElement('div');
        line.className = 'timeline-line';
        timeline.appendChild(line);

        const deltaX = endX - startX;
        const deltaY = endY - startY;

        const lineLength = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;

        line.style.width = `${lineLength}px`;
        line.style.transform = `rotate(${angle}deg)`;
        line.style.transformOrigin = '0 0'; // Rotate around the start point
        line.style.left = `${startX}px`;
        line.style.top = `${startY}px`;
      }
    });
  };

  // Call drawLines after content is loaded
  drawLines();
});
