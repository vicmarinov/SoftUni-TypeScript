import { BaseMenuItem, findItemById } from './menu-item-types.js';
import { Client, MenuItemType } from './models.js';

export class MenuManager {
    private menuItems: BaseMenuItem[] = [];
    private clients: Map<number, Client[]> = new Map<number, Client[]>();

    public addMenuItem (item: BaseMenuItem): string {
        this.menuItems.push(item);
        this.clients.set(item.id, []);

        return `Menu item "${item.name}" (ID: ${item.id}) has been added.`;
    }

    public registerClient (itemId: number, client: Client): string {
        const itemClients: Client[] | undefined = this.clients.get(itemId);

        if (!itemClients) {
            return `ERROR: Menu item with ID ${itemId} not found.`;
        }

        itemClients.push(client);

        return `Client ${client.name} registered for menu item ID ${itemId} successfully.`;
    }

    public listAllItems (): string[] {
        const resultLines: string[] = ['--- List of All Menu Items ---'];

        this.menuItems.forEach(item => {
            const type = MenuItemType[item.type].toUpperCase();
            const name = item.name;
            const weight = item.weightGrams;
            const calories = item.getCalories().toFixed(2);

            resultLines.push(
                `[${type}] ${name} (${weight}g) - Calories: ${calories}`
            );
        });

        return resultLines;
    }

    public findMenuItem (itemId: number): BaseMenuItem | undefined {
        return findItemById(this.menuItems, itemId);
    }
}