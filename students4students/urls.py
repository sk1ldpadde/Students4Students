from django.urls import path
from .views import RegisterView, \
    LoginView, \
    DegreeView, \
    UserView, \
    FacultyView, \
    AdView, \
    MessageView, \
    UserAuthView, \
    FavouritesView

# define the API Endpoints

urlpatterns = [
    path('register', RegisterView.as_view(), name='register'),
    path('login', LoginView.as_view(), name='login'),
    path('degrees', DegreeView.as_view(), name="degree-info"),
    path('user', UserView.as_view(), name='user-info'),
    path('faculty', FacultyView.as_view(), name='faculty-info'),
    path('ads', AdView.as_view(), name='ad-list'),
    path('message', MessageView.as_view(), name='send-message'),
    path('auth', UserAuthView.as_view(), name='user-auth'),
    path('fav', FavouritesView.as_view(), name="favourites")
]
