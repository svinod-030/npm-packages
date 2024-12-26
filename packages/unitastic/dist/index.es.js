const o = {
  degrees: 1,
  radians: 0.0174533,
  gradians: 1.11111
}, i = {
  milligrams: 1,
  grams: 1e-3,
  kilograms: 1e-6,
  metric_tons: 1e-9,
  pounds: 220462e-11,
  ounces: 35274e-9,
  stones: 157473e-12,
  carats: 5e-3,
  atomic_mass_units: 6022e20
}, c = {
  milliliters: 1,
  liters: 1e-3,
  cubic_meters: 1e-6,
  cups: 422675e-8,
  pints: 211338e-8,
  quarts: 105669e-8,
  gallons: 264172e-9,
  // US gallon
  imperial_gallons: 219969e-9,
  teaspoons: 0.202884,
  tablespoons: 0.067628,
  barrels: 628981e-11
  // Oil barrel
}, l = {
  square_millimeters: 1,
  square_centimeters: 0.01,
  square_meters: 1e-6,
  hectares: 1e-8,
  square_kilometers: 1e-12,
  square_inches: 0.0015500031,
  square_feet: 107639e-10,
  square_yards: 119599e-11,
  square_miles: 3861e-16,
  acres: 2471e-13
}, u = {
  meters_per_second: 1,
  kilometers_per_hour: 3.6,
  miles_per_hour: 2.23694,
  knots: 1.94384,
  mach: 293858e-8
}, m = {
  pascals: 1,
  bar: 1e-5,
  atmospheres: 986923e-11,
  psi: 145038e-9,
  torr: 750062e-8
}, _ = {
  joules: 1,
  calories: 0.239006,
  kilocalories: 239006e-9,
  watt_hours: 277778e-9,
  kilowatt_hours: 277778e-12,
  btu: 947817e-9,
  electronvolts: 6242e15
}, h = {
  watts: 1,
  kilowatts: 1e-3,
  horsepower: 134102e-8
}, p = {
  bits: 1,
  bytes: 0.125,
  kilobytes: 125e-6,
  megabytes: 125e-9,
  gigabytes: 125e-12,
  terabytes: 125e-15,
  petabytes: 125e-18
}, g = {
  liters_per_100_kilometers: 1,
  miles_per_gallon: 235.215
  // Inverse relation
}, b = {
  hertz: 1,
  kilohertz: 1e-3,
  megahertz: 1e-6,
  gigahertz: 1e-9
}, d = {
  millimeters: 1,
  centimeters: 0.1,
  meters: 1e-3,
  kilometers: 1e-6,
  inches: 0.0393701,
  feet: 328084e-8,
  yards: 109361e-8,
  miles: 621371e-12,
  nautical_miles: 539957e-12,
  light_years: 1057e-19,
  astronomical_units: 66846e-16
}, y = {
  parts_per_million: 1,
  german_hardness: 0.0562,
  french_hardness: 0.1,
  english_hardness: 0.0699,
  millival: 0.02,
  millimole: 0.01
}, n = {
  length: d,
  weight: i,
  volume: c,
  area: l,
  speed: u,
  pressure: m,
  energy: _,
  power: h,
  data_storage: p,
  fuel_efficiency: g,
  frequency: b,
  angle: o,
  water_hardness: y,
  temperature: {
    Celsius: 1,
    Fahrenheit: 1,
    // Placeholder, handled separately
    Kelvin: 1
    // Placeholder, handled separately
  }
}, j = Object.keys(n), C = Object.values(n).map((e) => Object.keys(e));
function f(e, r) {
  for (const s of Object.keys(n)) {
    const t = Object.keys(n[s]);
    if (t.includes(e) && t.includes(r))
      return s;
  }
  return null;
}
function k(e, r, s) {
  const t = f(r, s);
  if (!t)
    throw new Error(`Incompatible units: ${r} and ${s}`);
  if (t === "temperature")
    return q(e, r, s);
  const a = n[t];
  return e * a[s] / a[r];
}
function w(e, r) {
  return {
    to: k.bind(null, e, r)
  };
}
function O(e) {
  return {
    from: w.bind(null, e)
  };
}
function q(e, r, s) {
  if (r === s) return e;
  switch (r) {
    case "Celsius":
      return s === "Fahrenheit" ? e * 9 / 5 + 32 : e + 273.15;
    case "Fahrenheit":
      return s === "Celsius" ? (e - 32) * 5 / 9 : (e - 32) * 5 / 9 + 273.15;
    case "Kelvin":
      return s === "Celsius" ? e - 273.15 : (e - 273.15) * 9 / 5 + 32;
    default:
      throw new Error(`Unsupported temperature conversion: ${r} to ${s}`);
  }
}
export {
  j as categories,
  O as convert,
  C as units
};
