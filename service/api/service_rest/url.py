from django.urls import path
from .views import api_list_technicians, api_detail_technicians, api_list_appointments, api_detail_appointments

urlpatterns = [
    path(
        "technicians/",
        api_list_technicians,
        name="api_list_technicians",
    ),
    path(
        "technicians/<int:pk>/",
        api_detail_technicians,
        name="api_detail_technicians",
    ),
    path(
        "appointments/",
        api_list_appointments,
        name="api_list_appointments"
    ),
    path(
        "appointments/<int:pk>/",
        api_detail_appointments,
        name="api_detail_appointments"
    ),
    path(
        "appointments/<int:pk>/cancel/",
        api_detail_appointments,
        name="api_detail_appointments"
    ),
    path(
        "appointments/<int:pk>/finish/",
        api_detail_appointments,
        name="api_detail_appointments"
    )
]
