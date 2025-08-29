// Menu Functions
function openNav() {
  document.getElementById("mySidebar").classList.add("open");
  document.querySelector(".menu-toggle").classList.add("hidden"); // Hide button
}

function closeNav() {
  document.getElementById("mySidebar").classList.remove("open");
  document.querySelector(".menu-toggle").classList.remove("hidden"); // Show button
}

// Toggle collapsible sections
document.querySelectorAll('.collapsible').forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling; // <hr>
    const nextContent = content.nextElementSibling; // .section-content

    if (nextContent && nextContent.classList.contains('section-content')) {
      nextContent.classList.toggle('active');
    }
  });
});

// Dark Mode Toggle
function toggleTheme() {
  const body = document.body;
  const themeToggle = document.querySelector('.theme-toggle');
  if (body.classList.contains('dark')) {
    body.className = 'light';
    themeToggle.textContent = '◐';
    localStorage.setItem('theme', 'light');
  } else {
    body.className = 'dark';
    themeToggle.textContent = '◑';
    localStorage.setItem('theme', 'dark');
  }
}

// Restore theme on load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.className = savedTheme;

  const themeToggle = document.querySelector('.theme-toggle');
  themeToggle.textContent = savedTheme === 'dark' ? '◑' : '◐';

  // Attach event listeners
  document.querySelector('.menu-toggle').addEventListener('click', openNav);
  document.querySelector('.theme-toggle').addEventListener('click', toggleTheme);
  document.querySelector('.close-btn').addEventListener('click', closeNav);

  // Sidebar links
  document.querySelectorAll('.sidebar a[data-section]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute('data-section');
      showSection(sectionId);
    });
  });

  // Restore collapsible states (optional)
  // Or just leave them collapsed by default
});

function showSection(id) {
  closeNav();

  // Hide all sections
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
  });

  // Show selected section
  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
  }
}

  // Load changelogs from Changelog/Changelog.json
 async function loadChangelogPosts() {
  try {
    const response = await fetch('changelog/changelog.json');
    if (!response.ok) throw new Error('Changelog not found');

    const posts = await response.json();
    const container = document.getElementById('changelog-content');

    if (posts.length === 0) {
      container.innerHTML = '<p><strong>Unfortunately, this one is empty or the developer is modifying this section.</strong></p>';
      return;
    }

    posts.forEach(post => {
      const postEl = document.createElement('div');
      postEl.className = 'changelog-post'; // Better class name

      // Escape first, then replace \n
      const contentWithBreaks = escapeHtml(post.content).replace(/\n/g, '<br>');

      postEl.innerHTML = `
        <h3>${escapeHtml(post.title)}</h3>
        <strong>Posted: ${escapeHtml(post.date)}</strong>
        <p>${contentWithBreaks}</p>
      `;
      container.appendChild(postEl);
    });
  } catch (error) {
    console.error('Failed to load changelog:', error);
    document.getElementById('changelog-content').innerHTML = `
      <p style="color: #888;">Temporarily unavailable due to errors.</p>
    `;
  }
}

// Load only if changelog section exists
document.addEventListener('DOMContentLoaded', () => {
  const changelogSection = document.getElementById('changelog-content');
  if (changelogSection) {
    loadChangelogPosts();
  }
});

// Helper: Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
  
    // Load blog posts from blog/blog.json
  async function loadBlogPosts() {
    try {
      const response = await fetch('blog/blog.json');
      if (!response.ok) throw new Error('Blog not found');

      const posts = await response.json();
      const container = document.getElementById('blog-posts');

      if (posts.length === 0) {
        container.innerHTML = '<p>No posts yet.</p>';
        return;
      }

      posts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.className = 'blog-post';

        // Convert \n to <br> for line breaks
        const contentWithBreaks = post.content.replace(/\n/g, '<br>');

        postEl.innerHTML = `
          <h3>${escapeHtml(post.title)}</h3>
          <p class="blog-date">Posted: ${post.date}</p>
          <div class="blog-content">${contentWithBreaks}</div>
        `;
        container.appendChild(postEl);
      });
    } catch (error) {
      console.error('Failed to load blog:', error);
      document.getElementById('blog-posts').innerHTML = `
        <p style="color: #888;">Blog temporarily unavailable.</p>
      `;
    }
  }

  // Load only if blog section exists
  document.addEventListener('DOMContentLoaded', () => {
    const blogSection = document.getElementById('blog-posts');
    if (blogSection) {
      loadBlogPosts();
    }
  });

  // Helper: Escape HTML to prevent XSS
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
// Update Clock
function updateTime() {
  const now = new Date();

  // Time: HH:MM:SS (12-hour format)
  const hours = now.getHours() % 12 || 12;
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const ampm = now.getHours() >= 12 ? 'PM' : 'AM';

  const timeStr = `${hours}:${minutes}:${seconds} ${ampm}`;

  // Date: Weekday, Month Day, Year
  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Update HTML
  const clockEl = document.querySelector('.time-display');
  const dateEl = document.querySelector('.date-display');

  if (clockEl) clockEl.textContent = timeStr;
  if (dateEl) dateEl.textContent = dateStr;
}

// Run once at load
updateTime();

// Update every second
setInterval(updateTime, 1000);

// Dark Mode Toggle
function toggleTheme() {
  const body = document.body;
  const themeToggle = document.querySelector('.theme-toggle');
  if (body.classList.contains('dark')) {
    body.className = 'light';
    themeToggle.textContent = '◐';
    localStorage.setItem('theme', 'light');
  } else {
    body.className = 'dark';
    themeToggle.textContent = '◑';
    localStorage.setItem('theme', 'dark');
  }
}

// Restore theme on load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.className = savedTheme;

  const themeToggle = document.querySelector('.theme-toggle');
  themeToggle.textContent = savedTheme === 'dark' ? '◑' : '◐';

  // Attach event listeners
  document.querySelector('.menu-toggle').addEventListener('click', openNav);
  document.querySelector('.theme-toggle').addEventListener('click', toggleTheme);
  document.querySelector('.close-btn').addEventListener('click', closeNav);

  // Sidebar links
  document.querySelectorAll('.sidebar a[data-section]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute('data-section');
      showSection(sectionId);
    });
  });
});