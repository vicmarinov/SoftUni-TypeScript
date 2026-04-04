export function ConvertToEuro (
    target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor
): PropertyDescriptor {
    const originalGetter = descriptor.get;

    if (!originalGetter) {
        throw new Error('ConvertToEuro can only be applied to getters');
    }

    descriptor.get = function () {
        const valueInBGN = originalGetter.call(this);
        if (valueInBGN === undefined) return undefined;

        return Number((valueInBGN / 1.95583).toFixed(2));
    }

    return descriptor;
}