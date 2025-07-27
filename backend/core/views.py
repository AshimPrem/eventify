from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required
from .models import Service, Lead
import json

# List all services (GET) or add new service (POST, admin only)
from django.conf import settings

@csrf_exempt
def services_api(request):
    if request.method == 'GET':
        services = list(Service.objects.values('id', 'name', 'description', 'price', 'image'))
        # Add full image URL
        for s in services:
            if s['image']:
                s['image'] = request.build_absolute_uri(settings.MEDIA_URL + s['image'])
        return JsonResponse(services, safe=False)
    elif request.method == 'POST':
        if not request.user.is_authenticated or not request.user.is_superuser:
            return JsonResponse({'error': 'Unauthorized'}, status=401)
        name = request.POST.get('name')
        description = request.POST.get('description')
        price = request.POST.get('price')
        image = request.FILES.get('image')
        service = Service.objects.create(
            name=name,
            description=description,
            price=price,
            image=image
        )
        return JsonResponse({
            'id': service.id,
            'name': service.name,
            'description': service.description,
            'price': service.price,
            'image': request.build_absolute_uri(service.image.url) if service.image else None
        })
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])
    
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponseNotAllowed
from django.conf import settings
import json
from .models import Service

@csrf_exempt
def services_api(request):
    if request.method == 'GET':
        services = list(Service.objects.values('id', 'name', 'description', 'price', 'image', 'features'))
        for s in services:
            if s['image']:
                s['image'] = request.build_absolute_uri(settings.MEDIA_URL + s['image'])
            if not s.get('features'):
                s['features'] = []
        return JsonResponse(services, safe=False)

    elif request.method == 'POST':
        if not request.user.is_authenticated or not request.user.is_superuser:
            return JsonResponse({'error': 'Unauthorized'}, status=401)
        name = request.POST.get('name')
        description = request.POST.get('description')
        price = request.POST.get('price')
        image = request.FILES.get('image')
        features = request.POST.get('features')
        features_list = []
        if features:
            try:
                features_list = json.loads(features)
            except Exception as e:
                print("JSON decode error (add):", e)
                features_list = []
        service = Service.objects.create(
            name=name,
            description=description,
            price=price,
            image=image,
            features=features_list
        )
        return JsonResponse({
            'id': service.id,
            'name': service.name,
            'description': service.description,
            'price': service.price,
            'image': request.build_absolute_uri(service.image.url) if service.image else None,
            'features': service.features
        })
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])

@csrf_exempt
def service_detail_api(request, pk):
    try:
        service = Service.objects.get(pk=pk)
    except Service.DoesNotExist:
        return JsonResponse({'error': 'Not found'}, status=404)

    # --- UPDATE (with image) ---
    if request.method == 'POST' and request.headers.get('X-HTTP-Method-Override', '').upper() == 'PUT':
        if not request.user.is_authenticated or not request.user.is_superuser:
            return JsonResponse({'error': 'Unauthorized'}, status=401)
        name = request.POST.get('name', service.name)
        description = request.POST.get('description', service.description)
        price = request.POST.get('price', service.price)
        image = request.FILES.get('image')
        features = request.POST.get('features')
        features_list = service.features
        if features:
            try:
                features_list = json.loads(features)
            except Exception as e:
                print("JSON decode error (edit):", e)
                features_list = service.features
        service.name = name
        service.description = description
        service.price = price
        if image:
            service.image = image
        service.features = features_list
        service.save()
        return JsonResponse({
            'id': service.id,
            'name': service.name,
            'description': service.description,
            'price': service.price,
            'image': request.build_absolute_uri(service.image.url) if service.image else None,
            'features': service.features
        })

    # --- GET (single service) ---
    if request.method == 'GET':
        return JsonResponse({
            'id': service.id,
            'name': service.name,
            'description': service.description,
            'price': service.price,
            'image': request.build_absolute_uri(service.image.url) if service.image else None,
            'features': service.features
        })

    # --- UPDATE (no image, JSON) ---
    elif request.method == 'PUT':
        if not request.user.is_authenticated or not request.user.is_superuser:
            return JsonResponse({'error': 'Unauthorized'}, status=401)
        data = json.loads(request.body)
        service.name = data.get('name', service.name)
        service.description = data.get('description', service.description)
        service.price = data.get('price', service.price)
        if 'features' in data:
            service.features = data['features']
        service.save()
        return JsonResponse({
            'id': service.id,
            'name': service.name,
            'description': service.description,
            'price': service.price,
            'image': request.build_absolute_uri(service.image.url) if service.image else None,
            'features': service.features
        })

    elif request.method == 'DELETE':
        if not request.user.is_authenticated or not request.user.is_superuser:
            return JsonResponse({'error': 'Unauthorized'}, status=401)
        service.delete()
        return JsonResponse({'success': True})

    else:
        return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])
# Add a lead (contact form)
@csrf_exempt
def leads_api(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        lead = Lead.objects.create(
            name=data.get('name'),
            email=data.get('email'),
            message=data.get('message'),
        )
        return JsonResponse({'success': True, 'id': lead.id})
    elif request.method == 'GET':
        if not request.user.is_authenticated or not request.user.is_superuser:
            return JsonResponse({'error': 'Unauthorized'}, status=401)
        leads = list(Lead.objects.values())
        return JsonResponse(leads, safe=False)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])

# Simple login API (returns success if admin, else error)
@csrf_exempt
def login_api(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user_type = data.get('user_type')  # 'admin' or 'user'
        user = authenticate(username=username, password=password)
        if user:
            # Optionally, check user_type matches
            if user_type == 'admin' and not user.is_superuser:
                return JsonResponse({'error': 'Not an admin account'}, status=401)
            if user_type == 'user' and user.is_superuser:
                return JsonResponse({'error': 'Not a normal user account'}, status=401)
            return JsonResponse({
                'success': True,
                'username': user.username,
                'user_type': 'admin' if user.is_superuser else 'user'
            })
        return JsonResponse({'error': 'Invalid credentials'}, status=401)
    return HttpResponseNotAllowed(['POST'])

from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json

@csrf_exempt
def register_api(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')

        if not username or not password:
            return JsonResponse({'error': 'Username and password required'}, status=400)
        if len(password) < 8:
            return JsonResponse({'error': 'Password must be at least 8 characters long'}, status=400)
        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already exists'}, status=400)
        user = User.objects.create_user(username=username, password=password, email=email)
        return JsonResponse({'success': True, 'username': user.username})
    return JsonResponse({'error': 'POST required'}, status=405)

# @csrf_exempt
# def login_api(request):
#     if request.method == 'POST':
#         data = json.loads(request.body)
#         username = data.get('username')
#         password = data.get('password')
#         user = authenticate(username=username, password=password)
#         if user:
#             return JsonResponse({'success': True, 'username': user.username})
#         return JsonResponse({'error': 'Invalid credentials'}, status=401)
#     return JsonResponse({'error': 'POST required'}, status=405)