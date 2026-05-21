import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.resolve(__dirname, '../public/og');
const OUT_DIR = path.resolve(__dirname, '../public/og');
const WIDTH = 1200;
const HEIGHT = 630;
const JPEG_QUALITY = 80;

function fmtKB(bytes) {
    return `${(bytes / 1024).toFixed(0)} KB`;
}

async function optimizeOne(srcPath, outPath) {
    const srcStat = await fs.stat(srcPath);
    await sharp(srcPath)
        .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'center' })
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true })
        .withMetadata({ exif: {} })
        .toFile(outPath + '.tmp');

    await fs.rename(outPath + '.tmp', outPath);
    const outStat = await fs.stat(outPath);

    return { srcSize: srcStat.size, outSize: outStat.size };
}

async function main() {
    const entries = await fs.readdir(SRC_DIR);
    const pngs = entries.filter(f => f.toLowerCase().endsWith('.png'));

    if (pngs.length === 0) {
        console.log(`No .png files found in ${SRC_DIR}`);
        return;
    }

    console.log(`Optimizing ${pngs.length} images: ${WIDTH}x${HEIGHT}, JPEG q${JPEG_QUALITY}`);
    console.log(`Source: ${SRC_DIR}`);
    console.log(`Output: ${OUT_DIR}\n`);

    await fs.mkdir(OUT_DIR, { recursive: true });

    let totalSrc = 0;
    let totalOut = 0;
    let failures = 0;

    for (const png of pngs) {
        const srcPath = path.join(SRC_DIR, png);
        const outName = png.replace(/\.png$/i, '.jpg');
        const outPath = path.join(OUT_DIR, outName);

        try {
            const { srcSize, outSize } = await optimizeOne(srcPath, outPath);
            totalSrc += srcSize;
            totalOut += outSize;
            const pct = ((1 - outSize / srcSize) * 100).toFixed(0);
            console.log(`  ${outName.padEnd(45)} ${fmtKB(srcSize).padStart(8)} -> ${fmtKB(outSize).padStart(8)}  (-${pct}%)`);
        } catch (err) {
            failures++;
            console.error(`  FAILED ${png}: ${err.message}`);
        }
    }

    // Delete the source .png after successful conversion so the folder stays slim.
    for (const png of pngs) {
        const outName = png.replace(/\.png$/i, '.jpg');
        const outPath = path.join(OUT_DIR, outName);
        try {
            await fs.access(outPath);
            await fs.unlink(path.join(SRC_DIR, png));
        } catch {
            // skip — jpg doesn't exist, leave the png alone
        }
    }

    const savings = ((1 - totalOut / totalSrc) * 100).toFixed(1);
    console.log(`\nDone. ${pngs.length - failures}/${pngs.length} succeeded.`);
    console.log(`Total: ${fmtKB(totalSrc)} -> ${fmtKB(totalOut)}  (-${savings}%)`);
    if (failures > 0) process.exitCode = 1;
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
