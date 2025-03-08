const fs = require('node:fs');
const path = require('node:path');

const LOCALES_DIR = path.join(__dirname, 'langs');
const ENGLISH_LOCALE_PATH = path.join(LOCALES_DIR, 'en.ts');

// Extracts all content before the export statement for the locale
function extractHeader(content, localeCode) {
    const regex = new RegExp(`export\\s+const\\s+LOCALES_${localeCode}\\s*=`);
    const match = content.match(regex);
    if (match && match.index !== undefined) {
        return content.substring(0, match.index);
    }
    return '';
}

// Parses the locale object by extracting and evaluating the object literal.
// We use new Function to evaluate the code so that numeric keys (0:) are preserved.
function parseLocale(content, localeCode) {
    const regex = new RegExp(`export\\s+const\\s+LOCALES_${localeCode}\\s*=\\s*({[\\s\\S]*?});`);
    const match = content.match(regex);
    if (!match) return {};
    const code = match[1];
    try {
        // Wrap in parentheses and evaluate to get the object literal.
        return new Function('return (' + code + ')')();
    } catch (e) {
        console.error(`Error evaluating locale for ${localeCode}:`, e);
        return {};
    }
}

function updateLocales() {
    const englishContent = fs.readFileSync(ENGLISH_LOCALE_PATH, 'utf8');
    const englishLocale = parseLocale(englishContent, 'EN');

    fs.readdirSync(LOCALES_DIR).forEach(file => {
        if (file === 'en.ts') return;

        const localePath = path.join(LOCALES_DIR, file);
        const localeCode = path.basename(file, '.ts').toUpperCase();
        let localeContent = fs.readFileSync(localePath, 'utf8');
        const header = extractHeader(localeContent, localeCode);
        let localeData = parseLocale(localeContent, localeCode);

        let updated = false;

        // Iterate over keys in the English locale and add missing keys to the current locale.
        for (const key in englishLocale) {
            if (!localeData[key]) {
                localeData[key] = { ...englishLocale[key] };
                updated = true;
            }
        }

        if (updated) {
            // Write out the file: header preserved + updated locale export.
            const newContent = `${header}export const LOCALES_${localeCode} = ${JSON.stringify(localeData, null, 4)};\n`;
            fs.writeFileSync(localePath, newContent);
            console.log(`Updated: ${file}`);
        }
    });

    console.log('Localization update complete.');
}

updateLocales();
