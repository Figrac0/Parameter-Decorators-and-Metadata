# Parameter-Decorators-and-Metadata
This project demonstrates the use of decorators in TypeScript.

Working with method and class parameters, and using the reflect-metadata library to store metadata.
@limit: Parameter decorator that limits the number of passengers when starting a ride.
@validate: Method decorator that checks if the allowed number of passengers has been exceeded.<br>
@checkNumberOfSeats: Property decorator that checks and controls the number of available seats in the car.
@checkAmountOfFuel: Method decorator that prints the current amount of fuel before executing the method.
@changeDoorStatus: Class decorator that changes the status of the doors (open/closed).
@changeAmountOfFuel: Class decorator that sets a specific amount of fuel.

reflect-metadata: библиотека для работы с метаданными в TypeScript. Установить её можно с помощью команды:npm install reflect-metadata
