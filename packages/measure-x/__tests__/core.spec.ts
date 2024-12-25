import { convert } from '../src';

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
});