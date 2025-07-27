from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Service, Lead

admin.site.register(Service)
admin.site.register(Lead)