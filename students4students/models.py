from django.db import models

# Create your models here.

# Model representing a Faculty


class Faculty(models.Model):
    name = models.CharField(max_length=60)

# Model representing a Degree, with a ForeignKey relationship to Faculty


class Degree(models.Model):
    name = models.CharField(max_length=120)
    """
    SET_NULL deletion occurs when the referenced faculty object gets 
    deleted. SET_NULL sets the reference to null (requires the field 
    to be nullable --> null=True)
    """
    faculty = models.ForeignKey(Faculty, on_delete=models.SET_NULL, null=True)

# Model representing a User


class User(models.Model):
    username = models.CharField(max_length=30)
    first_name = models.CharField(max_length=30)
    surname = models.CharField(max_length=40)
    age = models.IntegerField()
    degree = models.ForeignKey(Degree, on_delete=models.RESTRICT, null=True)
    semester = models.IntegerField()
    partner_company = models.CharField(max_length=100)
    email = models.CharField(max_length=50)
    password = models.CharField(max_length=256)

# Model representing a Category


class Category(models.Model):
    name = models.CharField(max_length=25)
    # background color of category badge (frontend)
    color = models.CharField(max_length=8)

# Model representing an Address


class Address(models.Model):
    street = models.CharField(max_length=50)
    house_number = models.CharField(max_length=5)
    zip_code = models.IntegerField()
    city = models.CharField(max_length=40)

# Model representing an Ad


class Ad(models.Model):
    """
    CASCADE on deletion: if a user deletes his account, his ads will 
    be removed also
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.RESTRICT)
    title = models.CharField(max_length=75)
    description = models.CharField(max_length=200)
    # BLOB (binary large object) equivalent
    image = models.BinaryField()
    likes = models.IntegerField()
    # addresses are only related to one specific ad ALWAYS
    # address = models.ForeignKey(Address, on_delete=models.CASCADE)
    """
    Automatically set the field to now when the object is first created. 
    Useful for creation of timestamps.
    """
    created_at = models.DateTimeField(auto_now_add=True)

# Model representing a Favourite, linking a user to an ad


class Favourite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ad = models.ForeignKey(Ad, on_delete=models.CASCADE)

# Model representing User Authentication information


class UserAuthenfication(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    auth_code = models.IntegerField()
    # SECURITY: if given code is wrong three times, user has to register again
    nonce = models.IntegerField(default=3)
    created_at = models.DateTimeField(auto_now_add=True)
