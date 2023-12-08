from rest_framework import serializers

from .models import User, Degree, Faculty, Ad, Address

import re
from .regex import email_pattern, password_pattern


"""
the LoginUserDataSerializer is used to serialize the login data coming from
then frontend when a user is trying to log in. 
It doenst rely on a specific model because we only care about email and password
of the specific user, so the general Serializer is used as the base class
"""


class LoginUserDataSerializer(serializers.Serializer):
    email_field = serializers.CharField(
        max_length=User._meta.get_field('email').max_length)
    password_field = serializers.CharField(
        max_length=User._meta.get_field('password').max_length
    )

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        # check for empty data
        if not email or not password:
            return {'code': -1,
                    'message': 'both data fields are required.'}

        # check email format
        if re.fullmatch(email_pattern, email) is None:
            return {'code': -2,
                    'message': 'email format not correct.'}

        # check password format
        if re.fullmatch(password_pattern, password) is None:
            return {'code': -3,
                    'message': 'password format not correct.'}

        return {'code': 0, 'message': 'data format correct.'}

"""
the following serializer classes are used to convert incoming json data into the
corresponding model instances
"""

class DegreeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Degree
        fields = '__all__'  # Serialize all fields in the Degree model


class AdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ad
        fields = '__all__'

    def validate(self, data):
        return {'code': 0, 'message': 'todo'}


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'

    def validate(self, data):
        return {'code': 0, 'message': 'todo'}


class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty
        fields = '__all__'


class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'surname', 'age',
                  'degree', 'semester', 'partner_company', 'email', 'password')

    def validate(self, data):
        return {'code': 0, 'message': 'todo'}


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
