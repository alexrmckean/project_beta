from django.shortcuts import render
from .models import Salesperson, AutomobileVO, Customer, Sale
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from django.http import JsonResponse

# Create your views here.
class AutomobileVOListEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "import_href",
        "vin",
        "sold",
    ]


class SalespeopleListEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id",
    ]


class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "first_name",
        "last_name",
        "address",
        "phone_number",
    ]


class SaleListEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
        "automobile",
        "salesperson",
        "customer",
        "price",
    ]
    encoders = {
        "automobile": AutomobileVOListEncoder(),
        "salesperson": SalespeopleListEncoder(),
        "customer": CustomerListEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_salespeople_list(request):
    if request.method == "GET":
        salesperson = Salesperson.objects.all()
        return JsonResponse(
            {"salesperson": salesperson},
            encoder=SalespeopleListEncoder,
        )
    else:
        content = json.loads(request.body)
        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(
            salesperson,
            encoder=SalespeopleListEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "GET", "PUT"])
def api_salesperson(request, pk):
    if request.method == "GET":
        try:
            salesperson = Salesperson.objects.get(id=pk)
            return JsonResponse(
                salesperson,
                encoder=SalespeopleListEncoder,
                safe=False
            )
        except Salesperson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            salesperson = Salesperson.objects.get(id=pk)
            salesperson.delete()
            return JsonResponse(
                salesperson,
                encoder=SalespeopleListEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            salesperson = Salesperson.objects.get(id=pk)

            props = ["first_name", "last_name", "employee_id"]
            for prop in props:
                if prop in content:
                    setattr(salesperson, prop, content[prop])
            salesperson.save()
            return JsonResponse(
                salesperson,
                encoder=SalespeopleListEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_customers_list(request):
    if request.method == "GET":
        customer = Customer.objects.all()
        return JsonResponse(
            {"customer": customer},
            encoder=CustomerListEncoder,
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerListEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "GET", "PUT"])
def api_customer(request, pk):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=pk)
            return JsonResponse(
                customer,
                encoder=CustomerListEncoder,
                safe=False
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            customer = Customer.objects.get(id=pk)
            customer.delete()
            return JsonResponse(
                customer,
                encoder=CustomerListEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            customer = Customer.objects.get(id=pk)

            props = ["first_name", "last_name", "address", "phone_number"]
            for prop in props:
                if prop in content:
                    setattr(customer, prop, content[prop])
            customer.save()
            return JsonResponse(
                customer,
                encoder=CustomerListEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_sale_list(request):
    if request.method == "GET":
        sale = Sale.objects.all()
        return JsonResponse(
            {"sale": sale}, encoder=SaleListEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            import_href = f"/api/automobiles/{content['automobile']}/"
            vo = AutomobileVO.objects.all()
            # return(JsonResponse(
            #     vo,
            #     encoder=AutomobileVOListEncoder,
            #     safe=False,
            #     ))

            print("VO", AutomobileVO.objects.all())
            automobile = AutomobileVO.objects.get(import_href=import_href)
            print("automobile", automobile)
            salesperson = Salesperson.objects.get(id=content["salesperson"])
            customer = Customer.objects.get(id=content["customer"])
            content["automobile"] = automobile
            content["salesperson"] = salesperson
            content["customer"] = customer
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid automobile id"},
                status=400,
            )

        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SaleListEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "GET", "PUT"])
def api_sale(request, pk):
    if request.method == "GET":
        try:
            sale = Sale.objects.get(id=pk)
            return JsonResponse(
                sale,
                encoder=SaleListEncoder,
                safe=False
            )
        except Sale.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            sale = Sale.objects.get(id=pk)
            sale.delete()
            return JsonResponse(
                sale,
                encoder=SaleListEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            sale = Sale.objects.get(id=pk)

            props = ["salesperson", "customer", "automobile", "price"]
            for prop in props:
                if prop in content:
                    setattr(sale, prop, content[prop])
            sale.save()
            return JsonResponse(
                sale,
                encoder=SaleListEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
