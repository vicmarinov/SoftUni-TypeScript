function cacheWeatherData (
    target: object,
    key: string,
    descriptor: PropertyDescriptor
): PropertyDescriptor {
    const originalMethod = descriptor.value;
    
    let cachedData: string[] = [];
    let cacheLastUpdate: Date | null = null;

    descriptor.value = function (): string[] {
        if (
            cacheLastUpdate !== null &&
            new Date().getTime() - cacheLastUpdate.getTime() < 5 * 1000
        ) {
            console.log('Returned from cache');
            return cachedData;
        }

        const weatherData: string[] = originalMethod.call(this);

        cachedData = weatherData.slice();
        cacheLastUpdate = new Date();

        return weatherData;
    }
    
    return descriptor;
}

class MockWeatherDataService {
    private weatherData: string[] = [
        'Sunny 8° to 20°',
        'Partially Cloudy 7° to 19°',
        'Sunny 5° to 18°'
    ];

    public addWeatherData (data: string) {
        this.weatherData.push(data);
    }

    @cacheWeatherData
    getWeatherData (): string[] {
        return this.weatherData;
    }
}

const wetherService = new MockWeatherDataService();

console.log(wetherService.getWeatherData());
console.log(wetherService.getWeatherData());

wetherService.addWeatherData('Partially Cloudy 5° to 11°');

console.log(wetherService.getWeatherData());

// 7 seconds later:

setTimeout(() => console.log(wetherService.getWeatherData()), 7000);