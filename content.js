// TDV Tema Seçici Extension
class TDVThemeManager {
    constructor() {
        this.themes = {
            'default': 'Varsayılan',
            'sepia': 'Sepya',
            'dark': 'Koyu',
            'black': 'Siyah',
            'gruvbox': 'Gruvbox Koyu'
        };
        this.init();
    }

    init() {
        this.createThemeToggle();
        this.loadSavedTheme();
    }

    createThemeToggle() {
        // Mevcut tema seçici kontrolü
        if (document.querySelector('.theme-selector')) {
            return;
        }

        // Tema seçici container'ını oluştur
        const themeContainer = document.createElement('div');
        themeContainer.className = 'theme-selector';
        themeContainer.innerHTML = `
            <div class="theme-toggle-wrapper">
                <div class="theme-buttons">
                    <button class="theme-btn" data-theme="default" title="Varsayılan Tema">
                        <span class="theme-color" style="background: #fff; border: 1px solid #ccc;"></span>
                    </button>
                    <button class="theme-btn" data-theme="sepia" title="Sepya Tema">
                        <span class="theme-color" style="background: #f4f1e8;"></span>
                    </button>
                    <button class="theme-btn" data-theme="dark" title="Koyu Tema">
                        <span class="theme-color" style="background: #2d3748;"></span>
                    </button>
                    <button class="theme-btn" data-theme="black" title="Siyah Tema">
                        <span class="theme-color" style="background: #000;"></span>
                    </button>
                    <button class="theme-btn" data-theme="gruvbox" title="Gruvbox Koyu Tema">
                        <span class="theme-color" style="background: #282828;"></span>
                    </button>
                </div>
            </div>
        `;

        // Tema seçiciyi sayfaya ekle (sağ üst köşeye)
        document.body.appendChild(themeContainer);

        // Event listener'ları ekle
        this.attachEventListeners();
    }

    attachEventListeners() {
        const themeButtons = document.querySelectorAll('.theme-btn');
        themeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const theme = e.currentTarget.getAttribute('data-theme');
                this.applyTheme(theme);
                this.saveTheme(theme);
                this.updateActiveButton(e.currentTarget);
            });
        });
    }

    applyTheme(theme) {
        // Mevcut tema class'larını temizle
        document.body.classList.remove('theme-default', 'theme-sepia', 'theme-dark', 'theme-black', 'theme-gruvbox');
        
        // Yeni temayı uygula
        document.body.classList.add(`theme-${theme}`);
        
        // Dinamik stil değişiklikleri için data attribute ekle
        document.documentElement.setAttribute('data-theme', theme);
    }

    updateActiveButton(activeButton) {
        document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
        activeButton.classList.add('active');
    }

    saveTheme(theme) {
        chrome.storage.sync.set({ selectedTheme: theme });
    }

    loadSavedTheme() {
        chrome.storage.sync.get(['selectedTheme'], (result) => {
            const savedTheme = result.selectedTheme || 'default';
            this.applyTheme(savedTheme);
            
            // Aktif butonu işaretle
            const activeButton = document.querySelector(`[data-theme="${savedTheme}"]`);
            if (activeButton) {
                this.updateActiveButton(activeButton);
            }
        });
    }
}

// Popup'tan gelen mesajları dinle
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'changeTheme') {
        const themeManager = new TDVThemeManager();
        themeManager.applyTheme(request.theme);
        
        // Aktif butonu güncelle
        const activeButton = document.querySelector(`[data-theme="${request.theme}"]`);
        if (activeButton) {
            themeManager.updateActiveButton(activeButton);
        }
    }
});

// DOM yüklendiğinde tema yöneticisini başlat
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new TDVThemeManager());
} else {
    new TDVThemeManager();
}