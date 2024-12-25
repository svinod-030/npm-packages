export const conversionRates: Record<string, Record<string, number>> = {
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
        Kelvin: 1,     // Placeholder, handled separately
    },
};

export const categories = Object.keys(conversionRates);
export const units = Object.values(conversionRates).map(conversionRate => Object.keys(conversionRate));