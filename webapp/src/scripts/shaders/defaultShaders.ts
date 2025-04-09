export const ShaderPresets = {
    uvGradient: 'uvGradient',
    rainbow: 'rainbow',
    glitch: 'glitch',
    rgbGlitch: 'rgbGlitch',
    rgbShift: 'rgbShift',
    shine: 'shine',
    blink: 'blink',
    spring: 'spring',
    duotone: 'duotone',
    tritone: 'tritone',
    hueShift: 'hueShift',
    sinewave: 'sinewave',
    pixelate: 'pixelate',
    halftone: 'halftone',
    slitScanTransition: 'slitScanTransition',
    warpTransition: 'warpTransition',
    pixelateTransition: 'pixelateTransition',
    focusTransition: 'focusTransition',
} as const;

export type ShaderPreset = keyof typeof ShaderPresets;
