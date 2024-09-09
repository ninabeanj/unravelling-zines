document.addEventListener('DOMContentLoaded', () => {
  // Get all post titles
  const postTitles = document.querySelectorAll('.post-title');

  postTitles.forEach(title => {
    title.addEventListener('click', () => {
      // Find the closest post element
      const post = title.closest('.post');
      // Toggle the 'open' class on the post
      post.classList.toggle('open');
    });
  });

  // Get all close buttons
  const closeButtons = document.querySelectorAll('.close-btn');

  closeButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent event from bubbling up to the title
      // Find the closest post element
      const post = button.closest('.post');
      // Remove the 'open' class from the post
      post.classList.remove('open');
    });
  });
});
