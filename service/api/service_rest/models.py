from django.db import models

# Create your models here.

class Technician(models.Model):
    first_name = models.CharField(max_length=100, unique=True)
    last_name = models.CharField(max_length=100, unique=True)
    employee_id = models.PositiveSmallIntegerField(unique=True)


class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

class Appointment(models.Model):
    date_time = models.DateTimeField(unique=True)
    reason = models.CharField(max_length=100, unique=True)
    status = models.BooleanField(default=False)
    vin = models.CharField(max_length=100, unique=True)
    customer = models.CharField(max_length=100, unique=True)

    technician = models.ForeignKey(
        Technician,
        related_name="tech",
        on_delete=models.CASCADE
    )
