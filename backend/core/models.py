from django.db import models

# Create your models here.
from django.db import models

class Service(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.CharField(max_length=50)
    image = models.ImageField(upload_to='services/', blank=True, null=True)
    features = models.JSONField(default=list, blank=True) 

    def __str__(self):
        return self.name

class Lead(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.email}"