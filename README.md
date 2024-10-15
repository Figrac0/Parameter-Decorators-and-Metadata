# Parameter-Decorators-and-Metadata
This project demonstrates the use of decorators in TypeScript.

Working with method and class parameters, and using the reflect-metadata library to store metadata.<br>
@limit: Parameter decorator that limits the number of passengers when starting a ride.<br>
@validate: Method decorator that checks if the allowed number of passengers has been exceeded.<br>
@checkNumberOfSeats: Property decorator that checks and controls the number of available seats in the car.<br>
@checkAmountOfFuel: Method decorator that prints the current amount of fuel before executing the method.<br>
@changeDoorStatus: Class decorator that changes the status of the doors (open/closed).<br>
@changeAmountOfFuel: Class decorator that sets a specific amount of fuel.<br>

reflect-metadata: библиотека для работы с метаданными в TypeScript. Установить её можно с помощью команды:<br>npm install reflect-metadata<br>
