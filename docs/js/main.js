// Navigation
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav ul');

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuBtn.setAttribute('aria-expanded', 
                nav.classList.contains('active').toString()
            );
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (nav?.classList.contains('active') && 
            !e.target.closest('nav')) {
            nav.classList.remove('active');
            menuBtn?.setAttribute('aria-expanded', 'false');
        }
    });

    // Highlight current page in navigation
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath.split('/').pop()) {
            link.classList.add('active');
        }
    });
});

// Code highlighting
document.addEventListener('DOMContentLoaded', () => {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
        // Add line numbers
        const lines = block.textContent.split('\n');
        const numberedLines = lines.map((line, index) => 
            `<span class="line-number">${index + 1}</span>${line}`
        ).join('\n');
        
        block.innerHTML = numberedLines;

        // Add copy button
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        copyBtn.title = 'Copy to clipboard';
        
        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(block.textContent);
                copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
                copyBtn.innerHTML = '<i class="fas fa-times"></i>';
            }
        });

        block.parentElement.appendChild(copyBtn);
    });
});

// Search functionality
class Search {
    constructor() {
        this.searchInput = document.querySelector('.search-input');
        this.searchResults = document.querySelector('.search-results');
        this.searchIndex = null;
        this.debounceTimer = null;
    }

    async initialize() {
        try {
            const response = await fetch('/search-index.json');
            this.searchIndex = await response.json();
            
            if (this.searchInput) {
                this.searchInput.addEventListener('input', 
                    this.debounce(this.handleSearch.bind(this), 300)
                );
            }
        } catch (error) {
            console.error('Failed to initialize search:', error);
        }
    }

    debounce(func, delay) {
        return (...args) => {
            clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(() => func(...args), delay);
        };
    }

    async handleSearch(event) {
        const query = event.target.value.toLowerCase();
        if (!query || query.length < 2) {
            this.clearResults();
            return;
        }

        const results = this.searchIndex.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.content.toLowerCase().includes(query)
        ).slice(0, 5);

        this.displayResults(results);
    }

    displayResults(results) {
        if (!this.searchResults) return;

        if (results.length === 0) {
            this.searchResults.innerHTML = '<p>No results found</p>';
            return;
        }

        const html = results.map(result => `
            <div class="search-result">
                <a href="${result.url}">
                    <h3>${result.title}</h3>
                    <p>${this.highlightMatch(result.excerpt)}</p>
                </a>
            </div>
        `).join('');

        this.searchResults.innerHTML = html;
    }

    highlightMatch(text) {
        const query = this.searchInput.value.toLowerCase();
        return text.replace(
            new RegExp(query, 'gi'),
            match => `<mark>${match}</mark>`
        );
    }

    clearResults() {
        if (this.searchResults) {
            this.searchResults.innerHTML = '';
        }
    }
}

// Initialize search
document.addEventListener('DOMContentLoaded', () => {
    const search = new Search();
    search.initialize();
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Dark mode toggle
class ThemeManager {
    constructor() {
        this.themeToggle = document.querySelector('.theme-toggle');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        this.initialize();
    }

    initialize() {
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', 
                () => this.toggleTheme()
            );
        }

        // Set initial theme
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.updateToggleButton();
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        this.updateToggleButton();
    }

    updateToggleButton() {
        if (!this.themeToggle) return;

        const icon = this.themeToggle.querySelector('i');
        if (icon) {
            icon.className = this.currentTheme === 'light' 
                ? 'fas fa-moon' 
                : 'fas fa-sun';
        }

        this.themeToggle.setAttribute('aria-label',
            `Switch to ${this.currentTheme === 'light' ? 'dark' : 'light'} mode`
        );
    }
}

// Initialize theme manager
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
}); 