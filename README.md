# TDV İslam Ansiklopedisi Tema Seçici

Bu browser extension, TDV İslam Ansiklopedisi (islamansiklopedisi.org.tr) için gelişmiş tema seçenekleri sunar.

## Özellikler

🎨 **5 Farklı Tema:**
- **Varsayılan**: Orijinal beyaz tema
- **Sepya**: Göz dostu kahverengi tonlar
- **Koyu**: Standart koyu tema (gri tonlar)
- **Siyah**: Tam siyah OLED dostu tema
- **Gruvbox Koyu**: Programcı dostu retro renkler

## Kurulum

### Chrome/Edge için:
1. Chrome'da `chrome://extensions/` adresine gidin
2. "Geliştirici modu"nu etkinleştirin
3. "Paketlenmemiş uzantı yükle" butonuna tıklayın  
4. Bu klasörü seçin
5. Extension yüklendikten sonra TDV İslam Ansiklopedisi'ni ziyaret edin

### Firefox için:
1. Firefox'ta `about:debugging` adresine gidin
2. "Bu Firefox" sekmesine tıklayın
3. "Geçici eklenti yükle" butonuna tıklayın
4. `manifest.json` dosyasını seçin

## Kullanım

### Yöntem 1: Sayfada Tema Seçici
- TDV İslam Ansiklopedisi sayfasında sağ üst köşede bulunan yuvarlak tema butonlarına tıklayın

### Yöntem 2: Extension Popup'ı
- Tarayıcı toolbar'ında extension ikonuna tıklayın
- Açılan popup'tan istediğiniz temayı seçin

## Tema Detayları

### Sepya Tema
- **Arka plan**: Warm cream (#f4f1e8)
- **Metin**: Kahverengi tonlar (#5d4e37)
- **Linkler**: Saddle brown (#8b4513)

### Koyu Tema  
- **Arka plan**: Gray blue (#2d3748)
- **Metin**: Light gray (#e2e8f0)
- **Linkler**: Light blue (#63b3ed)

### Siyah Tema
- **Arka plan**: Tam siyah (#000000)
- **Metin**: Beyaz (#ffffff)  
- **Linkler**: Light blue (#66b3ff)

### Gruvbox Koyu Tema
- **Arka plan**: Dark gray (#282828)
- **Metin**: Warm white (#ebdbb2)
- **Linkler**: Blue gray (#83a598)
- **Başlıklar**: Yellow (#fabd2f)

## Teknik Detaylar

- **Manifest V3** uyumlu
- **Chrome Storage API** ile tema tercihleri kaydetme
- **Responsive tasarım** - mobil uyumlu
- **Smooth geçişler** ve animasyonlar
- **Accessibility** dostu renkler

## Dosya Yapısı

```
tdv-koyu-tema/
├── manifest.json          # Extension manifest
├── content.js            # Ana tema logic
├── themes.css            # Tema stilleri
├── popup.html            # Extension popup
├── popup.css             # Popup stilleri  
├── popup.js              # Popup logic
├── icons/                # Extension ikonları
│   ├── icon16.svg
│   ├── icon48.svg
│   └── icon128.svg
└── README.md             # Bu dosya
```

## Geliştirici Notları

### Yeni Tema Ekleme:
1. `themes.css` dosyasına yeni tema class'ı ekleyin
2. `content.js` dosyasında `themes` object'ine yeni tema ekleyin
3. `popup.html` dosyasına yeni tema seçeneği ekleyin
4. `popup.js` dosyasında `themeNames` object'ine isim ekleyin

### CSS Selector'ları:
- `.body_container`: Ana içerik alanı
- `#header_container`: Sayfa başlığı
- `.search_container`: Arama kutusu
- `.hover-menu`: Dropdown menüler

## Sürüm Geçmişi

### v2.0.0
- ✅ Siyah tema eklendi
- ✅ Gruvbox koyu tema eklendi  
- ✅ Extension popup arayüzü
- ✅ Geliştirilmiş tema geçişleri
- ✅ Responsive tasarım

### v1.0.0  
- ✅ Temel tema değiştirme
- ✅ Sepya ve koyu tema
- ✅ Storage API entegrasyonu

## Lisans

MIT License - İstediğiniz gibi kullanabilir ve değiştirebilirsiniz.

## Katkıda Bulunma

1. Bu repo'yu fork edin
2. Yeni bir branch oluşturun (`git checkout -b yeni-tema`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni tema eklendi'`)
4. Branch'i push edin (`git push origin yeni-tema`)  
5. Pull Request oluşturun

## Sorun Bildirme

Herhangi bir sorun veya öneri için GitHub Issues kullanabilirsiniz.

---

**Not**: İkonlar SVG formatındadır. Chrome Web Store'a yüklemek için PNG formatına çevirmeniz gerekebilir.