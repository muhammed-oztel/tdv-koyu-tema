// Popup JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const themeOptions = document.querySelectorAll('.theme-option');
    const currentThemeName = document.getElementById('current-theme-name');
    
    const themeNames = {
        'default': 'Varsayılan',
        'sepia': 'Sepya',
        'dark': 'Koyu',
        'black': 'Siyah',
        'gruvbox': 'Gruvbox Koyu'
    };
    
    // Aktif temayı yükle
    chrome.storage.sync.get(['selectedTheme'], function(result) {
        const currentTheme = result.selectedTheme || 'default';
        updateUI(currentTheme);
    });
    
    // Tema seçeneklerine click event listener ekle
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedTheme = this.getAttribute('data-theme');
            
            // Tema değişikliğini storage'a kaydet
            chrome.storage.sync.set({ selectedTheme: selectedTheme }, function() {
                updateUI(selectedTheme);
                
                // Content script'e mesaj gönder
                chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                    if (tabs[0] && tabs[0].url && tabs[0].url.includes('islamansiklopedisi.org.tr')) {
                        chrome.tabs.sendMessage(tabs[0].id, {
                            action: 'changeTheme',
                            theme: selectedTheme
                        });
                    }
                });
            });
        });
    });
    
    function updateUI(theme) {
        // Tüm seçeneklerden active class'ını kaldır
        themeOptions.forEach(option => {
            option.classList.remove('active');
        });
        
        // Seçili temaya active class ekle
        const selectedOption = document.querySelector(`[data-theme="${theme}"]`);
        if (selectedOption) {
            selectedOption.classList.add('active');
        }
        
        // Aktif tema adını güncelle
        currentThemeName.textContent = themeNames[theme] || 'Varsayılan';
    }
});