from django.test import TestCase
from django.http import HttpRequest
from .models import User
from .serializer import LoginUserDataSerializer
from .views import LoginView

# Create your tests here.


class TestTest(TestCase):
    def test_test(self):
        self.assertEqual(1, 1)
