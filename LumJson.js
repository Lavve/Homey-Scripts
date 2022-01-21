/**
 * Calculate dim level depending on luminance
 *
 * {
 *   name: (str) Name of light
 *   current: (int) Current value from luminance sensor
 *   maxLum: (int) Max luminance to get max dimmable level
 *   maxDim: (dec) Max dimmable level for light
 * }
 **/

if (typeof args[0] !== 'string') {
  throw new Error('This script must be run from a flow.');
}

function getName(obj) {
  name = obj.name
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+/g, '-');
  return name;
}

function cleanObj(o) {
  const obj = {};
  obj.name = o.hasOwnProperty('name') ? getName(o) : 'unknown';
  obj.maxLum = o.hasOwnProperty('maxLum') ? parseInt(o.maxLum, 10) : 1000;
  obj.maxDim = o.hasOwnProperty('maxDim') ? parseFloat(o.maxDim) : 1;
  obj.current = o.hasOwnProperty('current') ? parseFloat(o.current) : 0;
  return obj;
}

const obj = cleanObj(JSON.parse(args[0]));
const percent = obj.current > obj.maxLum ? 1 : obj.current / obj.maxLum;
const percentRev = 1 - percent;
const lightValue = Math.round(percent * obj.maxDim * 10) / 10;
let lightValueRev = percentRev * obj.maxDim;
lightValueRev = lightValueRev < 0 ? 0 : Math.round(lightValueRev * 10) / 10;

await tag('lumvalue', lightValue);
await tag('lumvaluereverse', lightValueRev);

return true;
