"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.units = exports.categories = exports.conversionRates = void 0;
const angle_1 = require("./conversion/angle");
const weight_1 = require("./conversion/weight");
const volume_1 = require("./conversion/volume");
const area_1 = require("./conversion/area");
const speed_1 = require("./conversion/speed");
const pressure_1 = require("./conversion/pressure");
const energy_1 = require("./conversion/energy");
const power_1 = require("./conversion/power");
const data_storage_1 = require("./conversion/data_storage");
const fuel_efficiency_1 = require("./conversion/fuel_efficiency");
const frequency_1 = require("./conversion/frequency");
const length_1 = require("./conversion/length");
exports.conversionRates = {
    length: length_1.length,
    weight: weight_1.weight,
    volume: volume_1.volume,
    area: area_1.area,
    speed: speed_1.speed,
    pressure: pressure_1.pressure,
    energy: energy_1.energy,
    power: power_1.power,
    data_storage: data_storage_1.data_storage,
    fuel_efficiency: fuel_efficiency_1.fuel_efficiency,
    frequency: frequency_1.frequency,
    angle: angle_1.angle,
    temperature: {
        Celsius: 1,
        Fahrenheit: 1, // Placeholder, handled separately
        Kelvin: 1, // Placeholder, handled separately
    },
};
exports.categories = Object.keys(exports.conversionRates);
exports.units = Object.values(exports.conversionRates).map(conversionRate => Object.keys(conversionRate));
