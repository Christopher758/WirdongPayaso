    // Apply theme from index.html
    const savedTheme = localStorage.getItem('site-theme') || 'light';
    if (savedTheme === 'dark') {
      document.body.classList.add('dark');
    }

    // Load tutorial from JSON
    async function loadTutorial() {
      try {
        const response = await fetch('JSON/Tutorial.json');
        if (!response.ok) throw new Error('Tutorial not found');

        const data = await response.json();
        const contentEl = document.getElementById('tutorial-content');
        const titleEl = document.getElementById('tutorial-title');
        const authorEl = document.getElementById('tutorial-author');
        const dateEl = document.getElementById('tutorial-date');

        // Set header
        titleEl.textContent = data.title;
        authorEl.textContent = data.author;
        dateEl.textContent = data.updated;

        // Render content
        data.content.forEach(block => {
          if (block.type === 'heading') {
            const h2 = document.createElement('h2');
            h2.textContent = block.text;
            contentEl.appendChild(h2);
          } else if (block.type === 'paragraph') {
            const p = document.createElement('p');
            p.textContent = block.text;
            contentEl.appendChild(p);
          } else if (block.type === 'list') {
            const ul = document.createElement('ul');
            block.items.forEach(item => {
              const li = document.createElement('li');
              li.textContent = item;
              ul.appendChild(li);
            });
            contentEl.appendChild(ul);
          }
        });
      } catch (error) {
        console.error('Failed to load tutorial:', error);
        document.getElementById('tutorial-content').innerHTML = `
          <p style="color: #888;">Tutorial temporarily unavailable. Try again later.</p>
        `;
      }
    }

    // Load on page load
    document.addEventListener('DOMContentLoaded', loadTutorial);