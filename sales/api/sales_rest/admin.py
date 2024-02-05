from django.contrib import admin
from .models import Salesperson


# Register your models here.


@admin.register(Salesperson)
class SalespersonAdmin(admin.ModelAdmin):
    pass
