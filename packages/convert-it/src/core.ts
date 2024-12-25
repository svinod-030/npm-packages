import { conversionRates } from './data';

function getCategory(fromUnit: string, toUnit: string): string | null {
    for (const category of Object.keys(conversionRates)) {
        const units = Object.keys(conversionRates[category]);
        if (units.includes(fromUnit) && units.includes(toUnit)) {
            return category;
        }
    }
    return null;
}

export function convert(value: number, fromUnit: string, toUnit: string): number {
    const category = getCategory(fromUnit, toUnit);
    if (!category) {
        throw new Error(`Incompatible units: ${fromUnit} and ${toUnit}`);
    }

    if (category === 'temperature') {
        return convertTemperature(value, fromUnit, toUnit);
    }

    const rates = conversionRates[category];
    return (value * rates[toUnit]) / rates[fromUnit];
}

function convertTemperature(value: number, fromUnit: string, toUnit: string): number {
    if (fromUnit === toUnit) return value;

    switch (fromUnit) {
        case 'Celsius':
            return toUnit === 'Fahrenheit' ? value * 9/5 + 32 : value + 273.15;
        case 'Fahrenheit':
            return toUnit === 'Celsius' ? (value - 32) * 5/9 : (value - 32) * 5/9 + 273.15;
        case 'Kelvin':
            return toUnit === 'Celsius' ? value - 273.15 : (value - 273.15) * 9/5 + 32;
        default:
            throw new Error(`Unsupported temperature conversion: ${fromUnit} to ${toUnit}`);
    }
}