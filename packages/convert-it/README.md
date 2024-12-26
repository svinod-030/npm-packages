# Unit Converter Library

A simple, chainable, and highly extensible utility for converting between various units of measurement. Supports length, weight, and temperature conversions with a clean, easy-to-use API.

---

## Features

- **Chainable API:** `convert(value).from(unit).to(unit)`
- **Supports Multiple Categories:**
    - Length (meters, inches, feet, kilometers, miles, etc.)
    - Weight (kilograms, grams, pounds, ounces, etc.)
    - Temperature (Celsius, Fahrenheit, Kelvin)
- **Highly Extensible:** Add more unit categories and conversions easily.
- **Error Handling:** Detects and throws errors for invalid or incompatible unit conversions.

---

## Installation

```bash
npm install convert-it
```

---

## Usage

### Import the Library

```typescript
import { convert } from 'convert-it';
```

### Convert Length
```typescript
const length = convert(30).from('meters').to('inches');
console.log(`30 meters is equal to ${length} inches.`); // Output: 30 meters is equal to 1181.102 inches.
```

### Convert Weight
```typescript
const weight = convert(5).from('kilograms').to('pounds');
console.log(`5 kilograms is equal to ${weight} pounds.`); // Output: 5 kilograms is equal to 11.0231 pounds.
```

### Convert Temperature
```typescript
const temp = convert(100).from('Celsius').to('Fahrenheit');
console.log(`100°C is equal to ${temp}°F.`); // Output: 100°C is equal to 212°F.
```

### Error Handling
```typescript
try {
  convert(30).from('meters').to('kilograms');
} catch (error) {
  console.error(error.message); // Output: Incompatible units: meters and kilograms
}
```

---

## Supported Units

### Angle
- Degrees (`degrees`)
- Radians (`radians`)
- Gradians (`gradians`)

### Area
- Square Millimeters (`square_millimeters`)
- Square Centimeters (`square_centimeters`)
- Square_meters (`square_meters`)
- Hectares (`hectares`)
- Square Kilometers (`square_kilometers`)
- Square Inches (`square_inches`)
- Square Feet (`square_feet`)
- Square Yards (`square_yards`)
- Square Miles (`square_miles`)
- Acres (`acres`)

### Data storage
- Bits (`bits`)
- Bytes (`bytes`)
- Kilobytes (`kilobytes`)
- Megabytes (`megabytes`)
- Gigabytes (`gigabytes`)
- Terabytes (`terabytes`)
- Petabytes (`petabytes`)

### Energy
- Joules (`joules`)
- Calories (`calories`)
- Kilocalories (`kilocalories`)
- Watt Hours (`watt_hours`)
- Kilowatt Hours (`kilowatt_hours`)
- British thermal unit (`btu`)
- Electron Volts (`electronvolts`)

### Frequency
- Hertz (`hertz`)
- Kilohertz (`kilohertz`)
- Megahertz (`megahertz`)
- Gigahertz (`gigahertz`)

### Fuel efficiency
- Liters per 100 kilometers (`liters_per_100_kilometers`)
- Miles per gallon (`miles_per_gallon`)

### Length
- Millimeters (`millimeters`)
- Centimeters (`centimeters`)
- Meters (`meters`)
- Kilometers (`kilometers`)
- Inches (`inches`)
- Feet (`feet`)
- Yards (`yards`)
- Miles (`miles`)
- Nautical miles (`nautical_miles`)
- Light years (`light_years`)
- Astronomical units (`astronomical_units`)

### Power
- Watts (`watts`)
- Kilowatts (`kilowatts`)
- Horsepower (`horsepower`)

### Pressure
- Pascals (`pascals`)
- Bar (`bar`)
- Atmospheres (`atmospheres`)
- Psi (`psi`)
- Torr (`torr`)

### Speed
- Meters per second (`meters_per_second`)
- Kilometers per hour (`kilometers_per_hour`)
- Miles per hour (`miles_per_hour`)
- Knots (`knots`)
- Mach (`mach`)

### Volume
- Milliliters (`milliliters`)
- Liters (`liters`)
- Cubic_meters (`cubic_meters`)
- Cups (`cups`)
- Pints (`pints`)
- Quarts (`quarts`)
- Gallons (`gallons`)
- Imperial gallons (`imperial_gallons`)
- Teaspoons (`teaspoons`)
- Tablespoons (`tablespoons`)
- Barrels (`barrels`)

### Water Hardness
- Parts per million (`parts_per_million`)
- German hardness (`german_hardness`)
- French hardness (`french_hardness`)
- English hardness (`english_hardness`)
- Millival (`millival`)
- Millimole (`millimole`)

### Weight
- Milligrams (`milligrams`)
- Grams (`grams`)
- Kilograms (`kilograms`)
- Metric tons (`metric_tons`)
- Pounds (`pounds`)
- Ounces (`ounces`)
- Stones (`stones`)
- Carats (`carats`)
- Atomic mass units (`atomic_mass_units`)

### Temperature
- Celsius (`Celsius`)
- Fahrenheit (`Fahrenheit`)
- Kelvin (`Kelvin`)

---

## How It Works

The library uses a chainable structure to define the source unit with `.from()` and the target unit with `.to()`. Internally, it:

1. Matches the source and target units to a category (e.g., length, weight, temperature).
2. Applies conversion rates or formulas based on the category.
3. Returns the converted value.

---

## Extending the Library

You can add more unit categories or conversions by modifying the `conversionRates` object in `data.ts`.

### Example: Adding Speed Conversion
```typescript
export const conversionRates: Record<string, Record<string, number>> = {
  speed: {
    'meters_per_second': 1,
    'kilometers_per_hour': 3.6,
    'miles_per_hour': 2.23694,
  },
  ...
};
```

---

## Development

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/svinod-030/npm-packages.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Testing

Run the test suite to ensure functionality:

```bash
npm test
```

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contributions

Contributions are welcome! Please open an issue or submit a pull request for bug fixes, new features, or enhancements.


