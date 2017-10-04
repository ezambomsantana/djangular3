import json
from django.http.response import HttpResponse
from django.core.exceptions import ObjectDoesNotExist
from django.contrib import auth
from cameras.models import Camera, House
from cameras.decorators import ajax_login_required

def login(request):
    username = request.POST['username']
    password = request.POST['password']
    user = auth.authenticate(username=username, password=password)
    user_dict = None
    if user is not None:
        if user.is_active:
            auth.login(request, user)
            user_dict = _user2dict(user)
    return HttpResponse(json.dumps(user_dict), content_type='application/json')


def logout(request):
    auth.logout(request)
    return HttpResponse('{}', content_type='application/json')


def whoami(request):
    i_am = {
        'user': _user2dict(request.user),
        'authenticated': True,
    } if request.user.is_authenticated() else {'authenticated': False}
    return HttpResponse(json.dumps(i_am), content_type='application/json')


def get_user_details(request):
    username = request.GET['username']
    user = auth.get_user_model().objects.get(username=username)
    user_dict = _user2dict(user)
    return HttpResponse(json.dumps(user_dict), content_type='application/json')


@ajax_login_required
def list_cameras(request):
    filters = json.loads(request.GET.get('filters', '{}'))
    cams = ''
    if filters == {}:
        cams = Camera.objects.all()
    else:
        try:
            cams = Camera.objects.filter(name = filters) 
        except Camera.DoesNotExist:
            cams = {}
    cams_dic = [c.to_dict_json() for c in cams]
    return HttpResponse(json.dumps(cams_dic), content_type='application/json')

@ajax_login_required
def list_cameras_filter_by_house(request):
    filters = json.loads(request.GET.get('filters', '{}'))
    cams = ''
    if filters == {}:
        cams = Camera.objects.all()
    else:
        try:
            cams = Camera.objects.filter(house__address=filters)
        except Camera.DoesNotExist:
            cams = {}
    cams_dic = [c.to_dict_json() for c in cams]
    return HttpResponse(json.dumps(cams_dic), content_type='application/json')

@ajax_login_required
def list_houses(request):
    filters = json.loads(request.GET.get('filters', '{}'))
    houses = House.objects.all()
    houses_dic = [h.to_dict_json() for h in houses]
    return HttpResponse(json.dumps(houses_dic), content_type='application/json')

def _user2dict(user):
    return {
        'username': user.username,
        'name': user.first_name,
        'permissions':{
            'ADMIN': user.is_superuser,
            'STAFF': user.is_staff,
        }
    }
