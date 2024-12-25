import {angle} from "./conversion/angle";
import {weight} from "./conversion/weight";
import {volume} from "./conversion/volume";
import {area} from "./conversion/area";
import {speed} from "./conversion/speed";
import {pressure} from "./conversion/pressure";
import {energy} from "./conversion/energy";
import {power} from "./conversion/power";
import {data_storage} from "./conversion/data_storage";
import {fuel_efficiency} from "./conversion/fuel_efficiency";
import {frequency} from "./conversion/frequency";
import {length} from "./conversion/length";

export const conversionRates: Record<string, Record<string, number>> = {
    length,
    weight,
    volume,
    area,
    speed,
    pressure,
    energy,
    power,
    data_storage,
    fuel_efficiency,
    frequency,
    angle,
    temperature: {
        Celsius: 1,
        Fahrenheit: 1, // Placeholder, handled separately
        Kelvin: 1,     // Placeholder, handled separately
    },
};

export const categories = Object.keys(conversionRates);
export const units = Object.values(conversionRates).map(conversionRate => Object.keys(conversionRate));