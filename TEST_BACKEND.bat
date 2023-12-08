@echo off

echo Running Backend Tests...

docker exec -it programmentwurf-gruppe-2-backend-1 python3 manage.py test

pause