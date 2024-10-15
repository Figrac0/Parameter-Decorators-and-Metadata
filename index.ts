import "reflect-metadata";
const limitMetadataKey = Symbol("limit");

interface ICar {
    fuel: string;
    open: boolean;
    freeSeats: number;
}

@changeDoorStatus(false)
@changeAmountOfFuel(95)
class myCar implements ICar {
    fuel: string = "50%";
    open: boolean = true;
    errors: any;

    @checkNumberOfSeats(4)
    freeSeats: number;

    @checkAmountOfFuel
    isOpen(value: string) {
        return this.open ? "open" : `close ${value}`;
    }

    @validate
    startTravel(@limit passengers: number) {
        console.log(`Started with ${passengers} passengers`);
    }
}

function limit(
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
) {
    let limitedParametrs: number[] =
        Reflect.getOwnMetadata(limitMetadataKey, target, propertyKey) || [];
    limitedParametrs.push(parameterIndex);
    Reflect.defineMetadata(
        limitMetadataKey,
        limitedParametrs,
        target,
        propertyKey
    );
}

function validate(
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
) {
    let method = descriptor.value;

    descriptor.value = function (...args: any) {
        let limitedParametrs: number[] = Reflect.getOwnMetadata(
            limitMetadataKey,
            target,
            propertyKey
        );

        if (limitedParametrs) {
            for (let index of limitedParametrs) {
                if (args[index] > 4) {
                    throw new Error("Нельзя больше 4х пассажиров");
                }
            }
        }
        return method?.apply(this, args);
    };
}

function checkNumberOfSeats(limit: number) {
    return function (target: Object, propertyKey: string | symbol) {
        let symbol = Symbol();

        const getter = function (this: any) {
            return this[symbol];
        };

        const setter = function (this: any, newAmount: number) {
            if (newAmount >= 1 && newAmount < limit) {
                this[symbol] = newAmount + 1;
            } else {
                // console.log(`Больше ${limit} сидений быть не может`);
                Object.defineProperty(target, "errors", {
                    value: `Больше ${limit} сидений быть не может`,
                });
            }
        };

        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter,
        });
    };
}

function checkAmountOfFuel(
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
): PropertyDescriptor | void {
    const oldValue = descriptor.value;
    descriptor.value = function (this: any, ...args: any[]) {
        console.log(this.fuel);
        return oldValue.apply(this, args);
    };
}

function changeDoorStatus(status: boolean) {
    return <T extends { new (...args: any[]): {} }>(constructor: T) => {
        return class extends constructor {
            open = status;
        };
    };
}

function changeAmountOfFuel(amount: number) {
    return <T extends { new (...args: any[]): {} }>(constructor: T) => {
        return class extends constructor {
            fuel = `${amount}%`;
        };
    };
}

const car = new myCar();
car.startTravel(3);
