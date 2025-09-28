// TDV İslam Ansiklopedisi Tema Seçici Content Script

// Tema verileri
const THEMES = {
    'default': { name: 'Varsayılan', class: '', color: '#ffffff' },
    'sepia': { name: 'Sepya', class: 'theme-sepia', color: '#f4f1e8' },
    'dark': { name: 'Koyu', class: 'theme-dark', color: '#2d3748' },
    'black': { name: 'Siyah', class: 'theme-black', color: '#000000' },
    'gruvbox': { name: 'Gruvbox', class: 'theme-gruvbox', color: '#282828' }
};

// Aktif tema
let currentTheme = 'default';

// Sayfa yüklendikten sonra çalışacak fonksiyon
function initThemeSelector() {
    // Kayıtlı temayı yükle
    chrome.storage.sync.get(['selectedTheme'], function(result) {
        currentTheme = result.selectedTheme || 'default';
        applyTheme(currentTheme);
    });

    // Tema seçicisini oluştur ve ekle
    createThemeSelector();
    
    // Popup'tan gelen mesajları dinle
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.action === 'changeTheme') {
            currentTheme = request.theme;
            applyTheme(currentTheme);
            updateThemeSelector();
        }
    });
}

// Tema seçicisi HTML'ini oluştur
function createThemeSelector() {
    // Eğer zaten varsa, kaldır
    const existing = document.getElementById('tdv-theme-selector');
    if (existing) {
        existing.remove();
    }

    // Tema seçici container'ını oluştur
    const themeSelector = document.createElement('div');
    themeSelector.id = 'tdv-theme-selector';
    themeSelector.className = 'theme-selector';
    
    // İçeriği oluştur
    themeSelector.innerHTML = `
        <div class="theme-toggle-wrapper">
            <div class="theme-buttons">
                ${Object.keys(THEMES).map(themeKey => `
                    <button class="theme-btn ${themeKey === currentTheme ? 'active' : ''}" 
                            data-theme="${themeKey}" 
                            title="${THEMES[themeKey].name}">
                        <span class="theme-color" style="background-color: ${THEMES[themeKey].color}; ${themeKey === 'default' ? 'background: linear-gradient(45deg, #f0f0f0, #ffffff);' : ''}"></span>
                    </button>
                `).join('')}
            </div>
        </div>
    `;

    // Event listener'ları ekle
    const buttons = themeSelector.querySelectorAll('.theme-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const selectedTheme = this.getAttribute('data-theme');
            if (selectedTheme !== currentTheme) {
                currentTheme = selectedTheme;
                
                // Tema değişikliğini kaydet
                chrome.storage.sync.set({ selectedTheme: selectedTheme });
                
                // Temayı uygula
                applyTheme(selectedTheme);
                updateThemeSelector();
            }
        });
    });

    // Sayfaya ekle - header içindeki uygun konumu bul
    const headerContainer = document.getElementById('header_container') || document.querySelector('.header_container');
    const searchContainer = document.querySelector('.search_container') || document.querySelector('#menu');
    const body = document.body;
    
    if (headerContainer) {
        // Header container'ına ekle ve position relative yap
        headerContainer.style.position = 'relative';
        headerContainer.appendChild(themeSelector);
    } else if (searchContainer) {
        searchContainer.style.position = 'relative';
        searchContainer.appendChild(themeSelector);
    } else {
        // Fallback: body'nin başına ekle ve fixed position kullan
        themeSelector.style.position = 'fixed';
        themeSelector.style.top = '20px';
        themeSelector.style.right = '20px';
        themeSelector.style.zIndex = '10002';
        body.appendChild(themeSelector);
    }
}

// Temayı uygula
function applyTheme(theme) {
    // Mevcut tema class'larını temizle
    Object.values(THEMES).forEach(themeData => {
        if (themeData.class) {
            document.body.classList.remove(themeData.class);
            document.documentElement.classList.remove(themeData.class);
        }
    });

    // data-theme attribute'unu güncelle
    document.body.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);

    // Yeni tema class'ını ekle
    if (theme !== 'default' && THEMES[theme].class) {
        document.body.classList.add(THEMES[theme].class);
        document.documentElement.classList.add(THEMES[theme].class);
    }

    // Özel stilleri uygula
    applyCustomStyles(theme);
}

// Özel stilleri uygula
function applyCustomStyles(theme) {
    // Mevcut özel stil elementini kaldır
    const existingStyle = document.getElementById('tdv-custom-theme-styles');
    if (existingStyle) {
        existingStyle.remove();
    }

    if (theme === 'default') return;

    // Yeni stil elementi oluştur
    const style = document.createElement('style');
    style.id = 'tdv-custom-theme-styles';
    
    let customCSS = '';
    
    switch (theme) {
        case 'sepia':
            customCSS = `
                body, html { background-color: #f4f1e8 !important; color: #5d4e37 !important; }
                #header_container { background-color: #f0ede4 !important; border-bottom: 1px solid #e5e0d3 !important; }
                .body_container { background-color: #f4f1e8 !important; }
                .m-body, .m-content { color: #5d4e37 !important; }
                a { color: #8b4513 !important; }
                a:hover { color: #a0522d !important; }
                #searchBox, input[type="text"], textarea { background-color: #f0ede4 !important; color: #5d4e37 !important; border-color: #d4c4a0 !important; }
            `;
            break;
            
        case 'dark':
            customCSS = `
                body, html { background-color: #2d3748 !important; color: #e2e8f0 !important; }
                #header_container { background-color: #1a202c !important; border-bottom: 1px solid #4a5568 !important; }
                .body_container { background-color: #2d3748 !important; }
                .m-body, .m-content { color: #e2e8f0 !important; }
                a { color: #63b3ed !important; }
                a:hover { color: #90cdf4 !important; }
                #searchBox, input[type="text"], textarea { background-color: #4a5568 !important; color: #e2e8f0 !important; border-color: #718096 !important; }
                .hover-menu { background-color: #1a202c !important; border-color: #4a5568 !important; }
                .hover-menu ul li a { color: #e2e8f0 !important; }
                .hover-menu ul li:hover { background-color: #2d3748 !important; }
                #auto-suggest-box { background-color: #1a202c !important; border-color: #4a5568 !important; }
                #searc-complete-result li { border-color: #4a5568 !important; }
                .article-part { background-color: #2d3748 !important; }
            `;
            break;
            
        case 'black':
            customCSS = `
                body, html { background-color: #000000 !important; color: #ffffff !important; }
                #header_container { background-color: #111111 !important; border-bottom: 1px solid #333333 !important; }
                .body_container { background-color: #000000 !important; }
                .m-body, .m-content { color: #ffffff !important; }
                a { color: #66b3ff !important; }
                a:hover { color: #99ccff !important; }
                #searchBox, input[type="text"], textarea { background-color: #222222 !important; color: #ffffff !important; border-color: #444444 !important; }
                .hover-menu { background-color: #111111 !important; border-color: #333333 !important; }
                .hover-menu ul li a { color: #ffffff !important; }
                .hover-menu ul li:hover { background-color: #222222 !important; }
                #auto-suggest-box { background-color: #111111 !important; border-color: #333333 !important; }
                #searc-complete-result li { border-color: #333333 !important; }
                .article-part { background-color: #000000 !important; }
            `;
            break;
            
        case 'gruvbox':
            customCSS = `
                body, html { background-color: #282828 !important; color: #ebdbb2 !important; }
                #header_container { background-color: #1d2021 !important; border-bottom: 1px solid #504945 !important; }
                .body_container { background-color: #282828 !important; }
                .m-body, .m-content { color: #ebdbb2 !important; }
                h1, h2, h3, h4, h5, h6 { color: #fabd2f !important; }
                a { color: #83a598 !important; }
                a:hover { color: #b8bb26 !important; }
                #searchBox, input[type="text"], textarea { background-color: #3c3836 !important; color: #ebdbb2 !important; border-color: #665c54 !important; }
                .hover-menu { background-color: #1d2021 !important; border-color: #504945 !important; }
                .hover-menu ul li a { color: #ebdbb2 !important; }
                .hover-menu ul li:hover { background-color: #3c3836 !important; }
                #auto-suggest-box { background-color: #1d2021 !important; border-color: #504945 !important; }
                #searc-complete-result li { border-color: #504945 !important; }
                .article-part { background-color: #282828 !important; }
            `;
            break;
    }
    
    style.textContent = customCSS;
    document.head.appendChild(style);
}

// Tema seçicisini güncelle
function updateThemeSelector() {
    const buttons = document.querySelectorAll('#tdv-theme-selector .theme-btn');
    buttons.forEach(button => {
        button.classList.remove('active');
        if (button.getAttribute('data-theme') === currentTheme) {
            button.classList.add('active');
        }
    });
}

// Sayfa yüklendiğinde başlat
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeSelector);
} else {
    initThemeSelector();
}

// Dinamik içerik değişikliklerini izle
const observer = new MutationObserver(function(mutations) {
    let shouldReinit = false;
    mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            // Eğer header yeniden yüklendiyse tema seçiciyi yeniden ekle
            for (let node of mutation.addedNodes) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    if (node.id === 'header_container' || 
                        node.querySelector && node.querySelector('#header_container')) {
                        shouldReinit = true;
                        break;
                    }
                }
            }
        }
    });
    
    if (shouldReinit) {
        setTimeout(createThemeSelector, 100);
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});