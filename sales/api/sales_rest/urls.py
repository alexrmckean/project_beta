from django.urls import path
from .views import api_salespeople_list, api_salesperson, api_customers_list, api_customer

urlpatterns = [
    path("api/salespeople/", api_salespeople_list, name= "api_salespeople_list"),
    path("api/salespeople/<int:pk>/", api_salesperson, name="api_salesperson"),
    path("api/customers/", api_customers_list, name= "api_customers_list"),
    path("api/customers/<int:pk>/", api_customer, name="api_customer"),
]
