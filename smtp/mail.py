import argparse
import toml
import smtplib
from email.mime.text import MIMEText

def send_mail(message):
    from_address = "foo@example.com"
    to_address = "bar@example.com"

    msg = MIMEText(message)
    msg['Subject'] = "debug: MailCatcher Test"
    msg['From'] = from_address
    msg['To'] = to_address

    s = smtplib.SMTP("127.0.0.1:1025")
    s.sendmail(from_address, [to_address], msg.as_string())
    s.close()

def main():
    message = 'Hello World.'
    send_mail(message)

if __name__ == '__main__':
    main()
