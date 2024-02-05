from django.db import models

# Create your models here.


class Salesperson(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employee_id = models.CharField(max_length=50, unique=True)

    # def get_api_url(self):
    #     return reverse("api_salespeople_list", kwargs={"pk": self.pk})

    def __str__(self):
        self.name


class Customer(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    address = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=10)

    def __str__(self):
        self.name


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    manufacturer= models.CharField(max_length=200)

    def __str__(self):
        self.name


class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="automobile",
        on_delete=models.CASCADE,
    )
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="salesperson",
        on_delete=models.CASCADE,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="customer",
        on_delete=models.CASCADE,
    )
    price = models.CharField(max_length=50)

    def __str__(self):
        self.name
