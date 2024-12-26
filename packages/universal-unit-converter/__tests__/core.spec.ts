import { convert } from '../src/core';

describe("convert(x)", () => {
    it('Convert meters to feet', () => {
        expect(convert(1).from('meters').to('feet')).toBeCloseTo(3.28084);
    });

    it('Convert Celsius to Fahrenheit', () => {
        expect(convert(100).from('Celsius').to('Fahrenheit')).toBe(212);
    });

    it('Incompatible units', () => {
        expect(() => convert(1).from('meters').to('kilograms')).toThrow();
    });

    it('Convert water hardness', () => {
        expect(convert(1).from('parts_per_million').to('german_hardness')).toBe(0.0562);
        expect(convert(1).from('parts_per_million').to('french_hardness')).toBe(0.100);
        expect(convert(1).from('parts_per_million').to('english_hardness')).toBe(0.0699);
        expect(convert(1).from('parts_per_million').to('millival')).toBe(0.0200);
        expect(convert(1).from('parts_per_million').to('millimole')).toBe(0.0100);

        expect(convert(1).from('german_hardness').to('parts_per_million')).toBeCloseTo(17.793);
    });
});