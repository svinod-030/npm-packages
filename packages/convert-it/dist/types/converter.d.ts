export type ConvertTo = {
    to: (toUnit: string) => number;
};
export type Convert = {
    from: (fromUnit: string) => ConvertTo;
};
