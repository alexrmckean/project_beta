from django.db import models

# Create your models here.

class Technician(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.PositiveSmallIntegerField(unique=True)


class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=100)
    status = models.CharField(max_length=100, default="pending")
    vin = models.CharField(max_length=100)
    customer = models.CharField(max_length=100)

    technician = models.ForeignKey(
        Technician,
        related_name="tech",
        on_delete=models.CASCADE
    )
