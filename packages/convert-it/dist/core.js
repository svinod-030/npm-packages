"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = convert;
const data_1 = require("./data");
function getCategory(fromUnit, toUnit) {
    for (const category of Object.keys(data_1.conversionRates)) {
        const units = Object.keys(data_1.conversionRates[category]);
        if (units.includes(fromUnit) && units.includes(toUnit)) {
            return category;
        }
    }
    return null;
}
function to(value, fromUnit, toUnit) {
    const category = getCategory(fromUnit, toUnit);
    if (!category) {
        throw new Error(`Incompatible units: ${fromUnit} and ${toUnit}`);
    }
    if (category === 'temperature') {
        return convertTemperature(value, fromUnit, toUnit);
    }
    const rates = data_1.conversionRates[category];
    return (value * rates[toUnit]) / rates[fromUnit];
}
function from(value, fromUnit) {
    return {
        to: to.bind(null, value, fromUnit)
    };
}
function convert(value) {
    return {
        from: from.bind(null, value),
    };
}
function convertTemperature(value, fromUnit, toUnit) {
    if (fromUnit === toUnit)
        return value;
    switch (fromUnit) {
        case 'Celsius':
            return toUnit === 'Fahrenheit' ? value * 9 / 5 + 32 : value + 273.15;
        case 'Fahrenheit':
            return toUnit === 'Celsius' ? (value - 32) * 5 / 9 : (value - 32) * 5 / 9 + 273.15;
        case 'Kelvin':
            return toUnit === 'Celsius' ? value - 273.15 : (value - 273.15) * 9 / 5 + 32;
        default:
            throw new Error(`Unsupported temperature conversion: ${fromUnit} to ${toUnit}`);
    }
}
