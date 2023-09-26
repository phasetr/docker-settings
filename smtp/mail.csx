using System;
using System.Net;
using System.Net.Mail;

string fromEmail = "foo@gmail.com";
string toEmail = "bar@gmail.com";
string subject = "Test Email From C#";
string body = "This is a test email.";
SmtpClient smtpClient = new SmtpClient("127.0.0.1", 1025);
smtpClient.UseDefaultCredentials = false;
MailMessage mailMessage = new MailMessage(fromEmail, toEmail, subject, body);
try
{
    // メールの送信
    smtpClient.Send(mailMessage);
    Console.WriteLine("Email sent successfully.");
}
catch (Exception ex)
{
    Console.WriteLine("Error sending email: " + ex.Message);
}
