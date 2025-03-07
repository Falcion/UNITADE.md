const fs = require('node:fs');
const path = require('node:path');
// Path to locales folder
const LOCALES_DIR = path.join(__dirname, 'langs');

// Load English locale as reference
const englishLocalePath = path.join(LOCALES_DIR, 'en.ts');
const { LOCALES_EN } = require(englishLocalePath);

// Function to update locales
function updateLocales() {
    fs.readdirSync(LOCALES_DIR).forEach(file => {
        if (file === 'en.ts') return; // Skip English file

        const localePath = path.join(LOCALES_DIR, file);
        const localeCode = path.basename(file, '.ts').toUpperCase();
        const { [`LOCALES_${localeCode}`]: localeData } = require(localePath);

        let updated = false;

        // Ensure all keys exist
        for (const key in LOCALES_EN) {
            if (!localeData[key]) {
                localeData[key] = { ...LOCALES_EN[key] }; // Copy structure
                updated = true;
            }
        }

        // Save file if updated
        if (updated) {
            fs.writeFileSync(localePath, `export const LOCALES_${localeCode} = ${JSON.stringify(localeData, null, 4)};\n`);
            console.log(`Updated: ${file}`);
        }
    });

    console.log('Localization update complete.');
}

// Run update process
updateLocales();
