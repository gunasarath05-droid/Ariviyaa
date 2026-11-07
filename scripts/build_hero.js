const sharp = require('sharp');
const path = require('path');

async function createMasterHeroBg() {
  const targetWidth = 2200;
  const targetHeight = 440;
  
  // Left half: x: 0 to 500, y: 0 to 400
  const leftHalfRaw = await sharp('public/assets/Veterinary-care.png')
    .extract({ left: 0, top: 0, width: 500, height: 400 })
    .toBuffer();

  // Right half: x: 500 to 1200 (width 700), y: 0 to 400
  const rightHalfRaw = await sharp('public/assets/Veterinary-care.png')
    .extract({ left: 500, top: 0, width: 700, height: 400 })
    .toBuffer();

  // Feather both left and right edges of leftHalfRaw:
  // Fade in from x=0 to 70 (smooths out the jagged artifact on the far left)
  // Fade out from x=380 to 500 (smooths into the central field)
  const leftMaskSvg = Buffer.from(`
    <svg width="500" height="400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="leftFade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="black" stop-opacity="0" />
          <stop offset="14%" stop-color="black" stop-opacity="1" />
          <stop offset="76%" stop-color="black" stop-opacity="1" />
          <stop offset="100%" stop-color="black" stop-opacity="0" />
        </linearGradient>
      </defs>
      <rect width="500" height="400" fill="url(#leftFade)" />
    </svg>
  `);
  const leftFeathered = await sharp(leftHalfRaw)
    .ensureAlpha()
    .composite([{ input: leftMaskSvg, blend: 'dest-in' }])
    .toBuffer();

  // Feather the left edge of rightHalf (fade from x=0 to 140)
  const rightMaskSvg = Buffer.from(`
    <svg width="700" height="400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rightFade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="black" stop-opacity="0" />
          <stop offset="22%" stop-color="black" stop-opacity="1" />
          <stop offset="100%" stop-color="black" stop-opacity="1" />
        </linearGradient>
      </defs>
      <rect width="700" height="400" fill="url(#rightFade)" />
    </svg>
  `);
  const rightFeathered = await sharp(rightHalfRaw)
    .ensureAlpha()
    .composite([{ input: rightMaskSvg, blend: 'dest-in' }])
    .toBuffer();

  // Create clean SVG medical background
  const svgBg = Buffer.from(`
    <svg width="${targetWidth}" height="${targetHeight}" viewBox="0 0 ${targetWidth} ${targetHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mainBg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#C5E5FD" />
          <stop offset="12%" stop-color="#DEF0FD" />
          <stop offset="35%" stop-color="#EFF6FD" />
          <stop offset="65%" stop-color="#EDF5FD" />
          <stop offset="85%" stop-color="#DCEBFB" />
          <stop offset="100%" stop-color="#9AD3FE" />
        </linearGradient>

        <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#80C7FE" stop-opacity="0.25" />
          <stop offset="40%" stop-color="#99D5FE" stop-opacity="0.18" />
          <stop offset="80%" stop-color="#70BAFC" stop-opacity="0.35" />
          <stop offset="100%" stop-color="#4CA4F9" stop-opacity="0.45" />
        </linearGradient>
      </defs>
      
      <rect width="${targetWidth}" height="${targetHeight}" fill="url(#mainBg)" />
      <path d="M0,400 C300,395 600,410 1100,415 C1600,420 1900,410 2200,395 L2200,440 L0,440 Z" fill="url(#waveGrad)" />
    </svg>
  `);

  const baseBuffer = await sharp(svgBg).png().toBuffer();

  const finalImage = await sharp(baseBuffer)
    .composite([
      { input: leftFeathered, left: 20, top: 20, blend: 'over' },
      { input: rightFeathered, left: 1500, top: 20, blend: 'over' }
    ])
    .png({ quality: 95 })
    .toBuffer();

  const outBrain = 'C:/Users/Sarath/.gemini/antigravity/brain/873f2e82-9ee2-491a-8a6a-615421388ea8/veterinary_hero_widescreen.png';
  const outPublic = path.join(__dirname, '../public/assets/veterinary-hero-widescreen.png');

  await sharp(finalImage).toFile(outBrain);
  await sharp(finalImage).toFile(outPublic);

  console.log('Successfully refined widescreen hero background at:', outPublic);
}

createMasterHeroBg().catch(console.error);
