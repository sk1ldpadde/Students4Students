from django.shortcuts import render
from django.http import HttpResponse

from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework import status

from django.core.exceptions import ObjectDoesNotExist

import base64

import random

from students4students.message.mail import send_mail

from .models import User, Degree, Faculty, Ad, \
    Category, UserAuthenfication, Favourite

from .serializer import LoginUserDataSerializer, \
    RegisterUserSerializer, \
    DegreeSerializer, \
    UserSerializer, \
    FacultySerializer, \
    AdSerializer, \
    AddressSerializer

# Create your views here.


class LoginView(APIView):
    """
    the post method defines the login mechanism where the email and password 
    of the user whos trying to log in is processed in order to verify the users
    identity.
    """

    def post(self, request):
        login_serializer = LoginUserDataSerializer(data=request.data)

        # check the request data format
        validation = login_serializer.validate(data=request.data)

        if validation['code'] < 0:
            return Response(
                {"code": validation['code'],
                    "message": validation['message']},
                status=status.HTTP_400_BAD_REQUEST
            )

        # fetch the user with the given email from the database
        # we can be sure that there is only one user with this email
        user = User.objects.filter(email=request.data.get('email'))

        # if user with the given email is not a registered user
        if not user.exists():
            return Response(
                {"code": -4, "message": "user with given email does not exist."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # check if user is in authorization status --> only authorized users
        # are able to log in
        if UserAuthenfication.objects.filter(user__email=user[0].email).exists():
            return Response(
                {"code": -5, "message": "unauthorized users are not able to log in"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # check the user's password
        if user[0].password != request.data.get('password'):
            return Response(
                {"code": -5, "message": "given password is not correct."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # and set user_id as cookie
        return Response(
            {"code": 0, "message": "successfully logged in."}
        )


class DegreeView(APIView):
    def get(self, request):
        # enable the possibility to get information about a certain degree
        degree_filter = request.GET.get('id')

        # enable the possibility to filter certrain faculty
        faculty_filter = request.GET.get('faculty_id')

        degree_queryset = None

        if degree_filter is not None:
            degree_queryset = Degree.objects.filter(id=degree_filter)
        elif faculty_filter is not None:
            degree_queryset = Degree.objects.filter(faculty_id=faculty_filter)
        else:
            degree_queryset = Degree.objects.all()

        serializer = DegreeSerializer(degree_queryset, many=True)
        return Response(serializer.data)


class FacultyView(APIView):
    def get(self, request):
        # enable the possibility to get information about a certain degree
        faculty_filter = request.GET.get('id')

        faculty_queryset = None

        if faculty_filter is not None:
            faculty_queryset = Faculty.objects.filter(id=faculty_filter)
        else:
            faculty_queryset = Faculty.objects.all()

        serializer = FacultySerializer(faculty_queryset, many=True)
        return Response(serializer.data)


class RegisterView(APIView):
    def post(self, request):
        register_serializer = RegisterUserSerializer(data=request.data)

        validation = register_serializer.validate(data=request.data)

        if validation['code'] < 0:
            return Response(
                {"code": validation['code'],
                 "message": validation['message']}
            )

        # check if given user already exists in our database
        user = User.objects.filter(email=request.data.get('email'))

        if user.exists():
            return Response(
                {"code": -10, "message": "user already exists."}
            )

        # save new user inside the database and return the main page
        user_obj = User()
        user_obj.username = request.data['username']
        user_obj.first_name = request.data['first_name']
        user_obj.surname = request.data['surname']
        user_obj.age = request.data['age']

        degree_instance = Degree.objects.get(id=request.data.get('degree'))
        user_obj.degree = degree_instance

        user_obj.semester = request.data['semester']
        user_obj.partner_company = request.data['partner_company']
        user_obj.email = request.data['email']
        user_obj.password = request.data['password']

        # save user instance in db (for now)
        user_obj.save()

        # user authenfication preparation
        auth = UserAuthenfication()
        auth.user = user_obj
        # create random 4 digit authenfication code
        auth.auth_code = random.randint(10000, 99999)
        auth.save()

        # send email to user for with custom authenfication code
        to_email = user_obj.email
        subject = "Bestätige deine E-Mail-Adresse."
        message = "Hallo " + user_obj.first_name + " " + user_obj.surname + ",\n\n" + \
            "deine Registrierung war erfolgreich. Glückwunsch!\n\n" + \
            "um Identitätsdiebstahl verhindern zu können, muss sich jeder Nutzer auf unserer Plattform authenfizieren.\n\n" + \
            "Dein persönlicher Code lautet: " + str(auth.auth_code) + "\n\n" + \
            "Um es dir einfach zu machen, kannst du auf folgenden Link klicken und bist automatisch registriert. Kein lästiges Eingeben des Codes nötig. \n\n" + \
            "localhost:8000/students4students/auth?id=" + str(user_obj.id) + "&code=" + str(auth.auth_code) + "\n\n" + \
            "Mit freundlichen Grüßen\n\n" + "Das Students4Students Team"

        send_mail(to_email, subject, message)

        return Response(
            {"code": 1, "message": "successfully registred new user."}
        )


class UserView(APIView):
    # retrieve information about a specific user by passing the id or email
    def get(self, request):
        user = None

        # if the id is given as an url parameter
        if "id" in request.GET:
            user_id = request.GET.get("id")
            user = User.objects.filter(id=user_id)

            if not user.exists():
                return Response(
                    {"code": -21, "message": "user with id = " +
                        str(user_id) + " not found."}
                )

        # if the email is given as an url parameter
        elif "email" in request.GET:
            email = request.GET.get("email")
            user = User.objects.filter(email=email)

            if not user.exists():
                return Response(
                    {"code": -22, "message": "user with username = " +
                        str(email) + " not found."}
                )

        else:
            return Response(
                {"code": -23, "message": "can only fetch user with specified id or email."}
            )

        serializer = UserSerializer(user, many=True)
        return Response(serializer.data)


class AdView(APIView):
    # return all ads in serialized json format
    def get(self, request):
        return Response(AdSerializer(Ad.objects.all(), many=True).data)

    # create and save a new ad
    def post(self, request):

        ad_serializer = AdSerializer(data=request.data)

        if ad_serializer.is_valid():
            # create the ad object and pass the address object to it
            ad = Ad()
            ad.user = User.objects.filter(id=request.data['user']).first()
            ad.category = Category.objects.filter(
                id=request.data['category']).first()
            ad.title = request.data['title']
            ad.image = base64.b64decode(request.data['image'])
            ad.description = request.data['description']
            ad.likes = request.data['likes']

            ad.save()

            return Response(
                {"code": 40, "message": "Ad instance was created successfully."}
            )
        else:
            errors = ad_serializer.errors
            return Response({"code": -1, "message": errors})

    # delete an existing ad
    def delete(self, request):
        # get the id of the ad to delete from the request
        if request.method == "DELETE":
            ad_id = request.GET.get("id")
            ad = Ad.objects.get(id=ad_id)

            if ad is None:
                return Response({"code": -41, "message": "no ad with given id found for deletion."})
            else:
                ad.delete()
                return Response({"code": 41, "message": "successfully deleted ad."})


class MessageView(APIView):
    # send a message through email service to notify the ad "owner", the user who posted the ad,
    # that he got a new "comment" on his ad
    def post(self, request):
        message_data = request.data

        send_mail(
            message_data["to"],
            "Du hast eine neue Nachricht auf eine Anzeige erhalten!",
            "Die folgende Nachricht kommt von: " + message_data["from"] +
            "\n\n" + message_data["message"]
        )

        return Response(
            {"code": 60, "message": "Successfully sent message."}
        )


class UserAuthView(APIView):
    # define the authenfication process by checking the users given
    # pin code (sent by mail in during the registration process) and act accordingly
    def get(self, request):
        user_id = request.GET.get("id")
        user_auth_code = request.GET.get("code")

        # only accept the request if id parameter is set
        if user_id is None or user_auth_code is None:
            return Response(
                {"code": -50, "message": "User authenfication failed."}
            )

        try:
            auth_instance = UserAuthenfication.objects.get(user_id=user_id)
        except ObjectDoesNotExist:
            auth_instance = None

        # to be registered user does not even exist
        if auth_instance is None:
            return Response(
                {"code": -54, "message": "To be registered user does not exist."}
            )

        # given code was wrong more than three times
        if auth_instance.nonce == 0:
            # delete authenfication instance along with the user
            auth_instance.user.delete()
            auth_instance.delete()

            return Response(
                {"code": -55, "message": "You entered the wrong authenfication code too often. Register again."}
            )

        # check valid authenfication code for the user
        if int(user_auth_code) != auth_instance.auth_code:
            # decrement the nonce for one wrong try
            auth_instance.nonce -= 1
            auth_instance.save()

            return Response(
                {"code": -52, "message": "Authenfication code is wrong."}
            )
        else:
            # accept user: successfull registration
            auth_instance.delete()

            # send registration mail
            to_email = auth_instance.user.email
            subject = "Du hast es geschafft! Du bist jetzt ein Teil von Students4Students."
            message = "Hallo " + auth_instance.user.first_name + " " + auth_instance.user.surname + ",\n\n" + \
                "deine Registrierung war erfolgreich. Glückwunsch!\n\n" + \
                "Mit freundlichen Grüßen\n\n" + "Das Students4Students Team"

            send_mail(to_email, subject, message)

            return Response(
                {"code": 50, "message": "User authenfication was successfull."}
            )


class FavouritesView(APIView):
    # provide an ad id and user id and find out if
    # the given user liked the given ad
    def get(self, request):
        user_id = int(request.GET.get("user"))
        ad_id = int(request.GET.get("ad"))

        user = User.objects.filter(id=user_id).first()
        ad = Ad.objects.filter(id=ad_id).first()

        if user is None or ad is None:
            return Response(
                {"code": -85, "message": "User or Ad does not exist."}
            )

        fav = Favourite.objects.filter(user__id=user.id, ad__id=ad.id).first()

        if fav is None:
            return Response(
                {"code": 101, "message": "The given user didn't liked the given ad."}
            )
        else:
            return Response(
                {"code": 102, "message": "The given user liked the given ad."}
            )

    # like or unlike an ad
    def post(self, request):
        user_id = int(request.data["user"])
        ad_id = int(request.data["ad"])

        user = User.objects.filter(id=user_id).first()
        ad = Ad.objects.filter(id=ad_id).first()

        # do given ad and user exist
        if user is None or ad is None:
            return Response(
                {"code": -85, "message": "User or Ad does not exist."}
            )

        # create a new fav object and save it
        # or delete if already present
        fav = Favourite.objects.filter(user__id=user_id, ad__id=ad_id)
        if fav.exists():
            fav.delete()
            ad.likes -= 1
            ad.save()
        else:
            fav = Favourite()
            fav.user = user
            fav.ad = ad
            ad.likes += 1
            fav.save()
            ad.save()

        return Response(
            {"code": 84, "message": "successfully liked/disliked the given ad."}
        )
