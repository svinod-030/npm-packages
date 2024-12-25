import { convert } from '../src';

describe("convert(x)", () => {
    it('Convert meters to feet', () => {
        expect(convert(1, 'meters', 'feet')).toBeCloseTo(3.28084);
    });

    it('Convert Celsius to Fahrenheit', () => {
        expect(convert(100, 'Celsius', 'Fahrenheit')).toBe(212);
    });

    it('Incompatible units', () => {
        expect(() => convert(1, 'meters', 'kilograms')).toThrow();
    });
});