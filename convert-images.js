const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

const SRC = path.join(__dirname, 'assets', 'img', 'source');
const OUT = path.join(__dirname, 'assets', 'img', 'webp');

function slug(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-_.]/g, '');
}

async function convertFile(file) {
  const ext = path.extname(file).toLowerCase();
  const base = path.basename(file, ext);
  const input = path.join(SRC, file);
  const outputName = `${slug(base)}.webp`;
  const output = path.join(OUT, outputName);
  try {
    await sharp(input)
      .webp({quality: 80})
      .toFile(output);
    return {input: file, output: outputName};
  } catch (err) {
    console.error('Error converting', file, err.message);
    return null;
  }
}

async function run() {
  try {
    const files = await fs.readdir(SRC);
    const imageFiles = files.filter(f => /\.(jpg|jpeg|png|tif|tiff|gif|webp)$/i.test(f));
    if (imageFiles.length === 0) {
      console.log('Aucune image trouvée dans', SRC);
      return;
    }
    await fs.mkdir(OUT, {recursive: true});
    const results = [];
    for (const f of imageFiles) {
      const res = await convertFile(f);
      if (res) results.push(res);
    }
    await fs.writeFile(path.join(OUT, 'conversion-manifest.json'), JSON.stringify(results, null, 2));
    console.log('Conversion terminée. Fichiers:', results.map(r => r.output));
  } catch (err) {
    console.error(err);
  }
}

run();
