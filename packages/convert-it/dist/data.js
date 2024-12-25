"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.units = exports.categories = exports.conversionRates = void 0;
exports.conversionRates = {
    length: {
        meters: 1,
        feet: 3.28084,
        inches: 39.3701,
        kilometers: 0.001,
        miles: 0.000621371,
    },
    weight: {
        kilograms: 1,
        pounds: 2.20462,
        ounces: 35.274,
        grams: 1000,
    },
    temperature: {
        Celsius: 1,
        Fahrenheit: 1, // Placeholder, handled separately
        Kelvin: 1, // Placeholder, handled separately
    },
};
exports.categories = Object.keys(exports.conversionRates);
exports.units = Object.values(exports.conversionRates).map(conversionRate => Object.keys(conversionRate));
