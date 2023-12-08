import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def send_mail(to_email, subject, message):
    # SMTP-Einstellungen für Gmail
    smtp_server = "smtp.web.de"
    smtp_port = 587  # Verwenden Sie 465 für SSL
    smtp_username = "students4students-dhbw"
    smtp_password = "dmda!dhbw?2022"

    server = smtplib.SMTP(smtp_server, smtp_port)
    server.starttls()  # activate the TLS encryption

    # log into the mail account to send mails from
    server.login(smtp_username, smtp_password)


    # create and send an email
    from_email = "students4students-dhbw@web.de"

    msg = MIMEMultipart()
    msg['From'] = from_email
    msg['To'] = to_email
    msg['Subject'] = subject
    msg.attach(MIMEText(message, 'plain'))

    server.sendmail(from_email, to_email, msg.as_string())

    server.close()