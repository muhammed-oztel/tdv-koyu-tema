# SVG'leri PNG'ye Çevirme Betiği

## Online Araçlar
1. https://svg2png.com/ - Ücretsiz online dönüştürücü
2. https://www.svgconverter.com/ - Toplu dönüştürme
3. https://convertio.co/svg-png/ - Kaliteli dönüştürme

## Manuel Dönüştürme (Inkscape)
```bash
# Inkscape kurulu ise
inkscape --export-png=icon16.png --export-width=16 --export-height=16 icons/icon16.svg
inkscape --export-png=icon48.png --export-width=48 --export-height=48 icons/icon48.svg  
inkscape --export-png=icon128.png --export-width=128 --export-height=128 icons/icon128.svg
```

## Node.js ile Otomatik Dönüştürme
```bash
npm install sharp
node convert-icons.js
```

convert-icons.js:
```javascript
const sharp = require('sharp');
const fs = require('fs');

const sizes = [16, 48, 128];

sizes.forEach(size => {
  sharp(`icons/icon${size}.svg`)
    .png()
    .resize(size, size)
    .toFile(`icons/icon${size}.png`, (err) => {
      if (err) {
        console.error(`Error converting icon${size}.svg:`, err);
      } else {
        console.log(`icon${size}.png created successfully`);
      }
    });
});
```

## Manifest'i PNG için güncelleme
manifest.json dosyasında .svg uzantılarını .png ile değiştirin.