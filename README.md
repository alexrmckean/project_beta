# CarCar
CarCar is an application for managing your automobile dealership! It manages the inventory of cars (both models and specific automobiles), service appointments, sales, and as well as all of the people involved (technicians, salespeople, and customers). This app is a one stop shop for you and your car business! With CarCar all you have to do now is SELL SELL SELL... and fix customer's cars!

Team:

* Alex McKean - Sales Microservice (Sales, Salespeople, Customers), Inventory Microservice (Vehicles)
* Lyle Toledo - Service Microservice (Technicians, Appointments), Inventory Microservice (Manufacturers, Automobiles)


## Getting Started

**Make sure you have Docker, Insomnia, Git, and Node.js Bullseye or above**

1. Fork this repository.

2. Clone the forked repository onto your local computer:
git clone <https://gitlab.com/alexrmckean/project-beta>

3. Build and run the project using Docker with these commands:
```
docker-compose build
docker-compose up
```
- After running these commands, make sure all of your Docker containers are running

- View the project in the browser: http://localhost:3000/

![Img](/images/ListOfSales.png)
![Img](/images/Vehicles.png)


## Design
CarCar is made up of 3 microservices which interact with one another.

- **Sales**
- **Service**
- **Inventory**


## Diagram
![Img](/images/image.png)


## Integration - Value Objects

Our Sales and Service domains work together with our Inventory domain to make everything here at **CarCar** possible.

Here's how this all works. We have an inventory of automobiles. Each automobile has a model type and manufacturer. Each sale has a customer, a salesperson, and an automobile (the thing being sold). Each service appointment has a customer, a service technician, and an automobile (the thing being serviced). Using a **poller**, we use an automobile value object which points towards an automobile in Inventory. This value object is kept up to date with the poller functionality. This keeps track of the automobile details and gives up to date information. When creating a new sale or service, the dropdown menu will automatically display the value object using the automobile VIN(Vehicle Identification Number) as reference.


## Sales microservice, a brief intro

The sales model microservice will show details of a sale. When we create the sales microservice, it is a microservice that pulls information the Inventory API. In the models.py file, sales will have the attributes of:
- automobile will have a foreign key to the Automobile Value Object (VO).
- salesperson will have a foreign key to the Salesperson Model.
- customer will have a foreign key to the Customer Model.
- price


## Service microservice, a brief intro

The appointments model for the service microservice will show details of a service. When we create the service microservice, it is a microservice that pulls information from the Inventory API. In the models.py file, appointments will have the attributes of:
- date_time
- reason
- status
- vin
- customer
- technician will have a foreign key to the Technician Model.

## Accessing Endpoints to Send and View Data: Access Through Insomnia & Your Browser


## Service microservice
Method | URL | What it does
| ------ | ------ | ------ |
GET	| localhost:8080/api/technicians/ | Gets a list of all of the technicians
POST | localhost:8080/api/technicians/ | Creates a new technician with the posted data
DELETE | localhost:8080/api/technicians/:id/ | Deletes a single technician
GET	| localhost:8080/api/appointmenst/ | Gets a list of all of the appointments
POST | localhost:8080/api/appointments/ | Creates a new appointment with the posted data
DELETE | localhost:8080/api/appointments/:id/ | Deletes a single appointment
PUT | localhost:8080/api/appointments/:id/cancel/ | Sets appointment status to "canceled"
PUT | localhost:8080/api/appointments/:id/finish/ | Sets appointment status to "finished"


JSON Body to input into Insomnia:
Create and Update a technician (SEND THIS JSON BODY):

```
{
	"first_name": "William",
	"last_name": "Afton",
	"employee_id": 1983
}
```
Getting a list of technicians return value:
```
{
    "technicians": [

        "first_name": "William",
        "last_name": "Afton",
        "employee_id": 1983,
        "id": 1
    ]
}
```
The return value of creating, viewing, updating a single appointment:
```
{
	"date_time": "2024-06-21T12:00:00+00:00",
	"reason": "Oil",
	"status": "pending",
	"vin": "1111",
	"customer": "Snowman",
	"technician": "William",
	"id": 1
}
```
Getting a list of appointments return value:
```
{
	"appointments": [

		"date_time": "2024-06-21T12:00:00+00:00",
        "reason": "Oil",
        "status": "pending",
        "vin": "1111",
        "customer": "Snowman",
        "technician": "William",
        "id": 1
    ]
}
```

On the backend, the service microservice has 3 models: Appointment, Technician, and AutomobileVO. AutomobileVO interacts with the Automobile model in the Inventory microservice. The Appointment model gets data from the Technician Model to populate the dropdown menu for its technician property.

The AutomobileVO is a value object that gets data about the automobile inventory using a poller. The automobile poller automotically polls the Inventory microservice for data, so the service microservice is constantly getting the updated data.

The reason for integration between these two models is that when recording a new appointment, you'll need to choose which technician is performing the service.



## Sales microservice
Method | URL | What it does
| ------ | ------ | ------ |
GET	| localhost:8090/api/salespeople/ | Gets a list of all of the salespeople
POST | localhost:8090/api/salespeople/ | Creates a new salesperson with the posted data
DELETE | localhost:8090/api/salespeople/:id/ | Deletes a single salesperson
GET	| localhost:8090/api/customers/ | Gets a list of all of the customers
POST | localhost:8090/api/customers/ | Creates a new customer with the posted data
DELETE | localhost:8090/api/customers/:id/ | Deletes a single customer
GET	| localhost:8090/api/sales/ | Gets a list of all of the sales
POST | localhost:8090/api/sales/ | Creates a new sale with the posted data
DELETE | localhost:8090/api/sales/:id/ | Deletes a single sale


JSON Body to input into Insomnia:
Create and Update a salesperson (SEND THIS JSON BODY):

```
{
	"first_name": "Spoon",
    "last_name": "Jones",
    "employee_id": "532"
}
```
Getting a list of salespeople return value:
```
{
    "salesperson": [
		{
			"id": 6,
			"first_name": "Spoon",
			"last_name": "Jones",
			"employee_id": "532"
        }
    ]
}
```
The return value of creating, viewing, updating a single customer:
```
{
	"id": 4,
	"first_name": "Sam",
	"last_name": "Reynolds",
	"address": "222 Smith Street",
	"phone_number": "999-4455"
}
```
Getting a list of customers return value:
```
{
	"customer": [
		{
			"id": 4,
			"first_name": "Sam",
			"last_name": "Reynolds",
			"address": "222 Smith Street",
			"phone_number": "999-4455"
		}
    ]
}
```

The return value of creating, viewing, updating a single sale:
```
{
	"id": 29,
	"automobile": {
		"import_href": "/api/automobiles/1C3CC5FB2AN120172/",
		"vin": "1C3CC5FB2AN120172",
		"sold": false
	},
	"salesperson": {
		"id": 4,
		"first_name": "Steve",
		"last_name": "Jones",
		"employee_id": "222"
	},
	"customer": {
		"id": 3,
		"first_name": "Harold",
		"last_name": "Lee",
		"address": "200 Cayuga Street",
		"phone_number": "713-4455"
	},
	"price": "78000"
}
```
Getting a list of sales return value:
```
{
	"sale": [
		{
			"id": 29,
			"automobile": {
				"import_href": "/api/automobiles/1C3CC5FB2AN120172/",
				"vin": "1C3CC5FB2AN120172",
				"sold": false
			},
			"salesperson": {
				"id": 4,
				"first_name": "Steve",
				"last_name": "Jones",
				"employee_id": "222"
			},
			"customer": {
				"id": 3,
				"first_name": "Harold",
				"last_name": "Lee",
				"address": "200 Cayuga Street",
				"phone_number": "713-4455"
			},
			"price": "78000"
		}
    ]
}
```

On the backend, the sales microservice has 3 models: AutomobileVO, Sale and Customer. AutomobileVO interacts with the Automobile model in the Inventory microservice. The Sale model gets data from the AutomobileVO to create the dropdown menu of possible automobiles for its automobile section of the form.

The AutomobileVO is a value object that gets data about the automobile in the inventory using a poller. The automobile poller automotically polls the Inventory microservice for data, so the sales microservice is constantly getting the updated data.

The reason for integration between these models is that when recording a new sale, you'll need to choose which automobile is being sold and that automobiles' information lives inside of the inventory microservice.
