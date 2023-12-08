# # Verwende ein offizielles MySQL-Image als Basis
# FROM mysql:latest

# # Kopiere die SQL-Skripts in das Image
# COPY ./DB_SETUP.sql /docker-entrypoint-initdb.d/

# # Umgebungseinstellungen, falls erforderlich
# ENV MYSQL_ROOT_PASSWORD=root
# # Der Container wird die SQL-Skripts beim Starten ausführen
# # -d datenbank name 
# #RUN mysql -d  -u root -p  < /docker-entrypoint-initdb.d/DB_SETUP.sql

# Verwende ein offizielles MySQL-Image als Basis
FROM mysql:8.1.0

# Kopiere die SQL-Skripts in das Image
COPY ./DB_SETUP.sql /docker-entrypoint-initdb.d/

# Umgebungseinstellungen, falls erforderlich
ENV MYSQL_ROOT_PASSWORD=root

# Führe das Import-Skript aus
