import { MenuItem, MenuItemType, WithId } from './models.js';
import { ConvertToEuro } from './decorators.js';

export abstract class BaseMenuItem implements MenuItem {
    public id: number;
    public name: string;
    public weightGrams: number;
    public type: MenuItemType;
    protected _basePrice?: number;

    constructor (
        id: number,
        name: string,
        weightGrams: number,
        type: MenuItemType,
        basePrice?: number
    ) {
        this.id = id;
        this.name = name;
        this.weightGrams = weightGrams;
        this.type = type;
        this._basePrice = basePrice;
    }

    public abstract getCalories (): number;

    public get basePrice (): number | undefined {
        return this._basePrice;
    }
    
    @ConvertToEuro
    public get finalPrice (): number | undefined {
        return this._basePrice;
    }
}

export class WelcomeSnack extends BaseMenuItem {
    private hasCream: boolean;

    constructor (
        id: number,
        name: string,
        weightGrams: number,
        hasCream: boolean
    ) {
        super(id, name, weightGrams, MenuItemType.WelcomeSnack);
        this.hasCream = hasCream;
    }

    public override getCalories (): number {
        return this.weightGrams * 1.2 + (this.hasCream ? 20 : 0);
    }
}

export class MainCourse extends BaseMenuItem {
    private fatGrams: number;

    constructor (
        id: number,
        name: string,
        weightGrams: number,
        fatGrams: number,
        basePrice?: number
    ) {
        super(id, name, weightGrams, MenuItemType.MainCourse, basePrice);
        this.fatGrams = fatGrams;
    }

    public override getCalories (): number {
        return this.weightGrams * 2.0 + this.fatGrams * 3;
    }
}

export class Dessert extends BaseMenuItem {
    private hasSugar: boolean;

    constructor (
        id: number,
        name: string,
        weightGrams: number,
        hasSugar: boolean,
        basePrice?: number
    ) {
        super(id, name, weightGrams, MenuItemType.Dessert, basePrice);
        this.hasSugar = hasSugar;
    }

    public override getCalories (): number {
        return this.weightGrams * 2.5 + (this.hasSugar ? 100 : 0);
    }
}

export function findItemById<T extends WithId> (
    items: T[],
    id: number
): T | undefined {
    return items.find(item => item.id === id);
}