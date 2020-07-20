using System;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using InnovaSolutionAPI.Request;
using Microsoft.AspNetCore.Mvc;
using ServiceProvider.Contracts.Common;
using ServiceProvider.Contracts.Persistance;
using ServiceProvider.Contracts.Registration;

namespace InnovaSolutionAPI.Controllers
{
    [ApiVersion("1.1")]
    [ApiVersion("1.0")]
    [Route("/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class RegisrationController: ControllerBase
    {
        private readonly IRegistration _registration;
        private readonly ILoggerManager _log;
        private readonly IEncryption _aES;
        private readonly IAppSetting appSetting;
        private readonly ISMTPConfiguration sMTP;
        public RegisrationController(
            IRegistration registration,
            ILoggerManager logger,
            IAppSetting appSetting,
            ISMTPConfiguration smtp,
            IEncryption encryption)
        {
            this._registration = registration;
            this._log = logger;
            this.appSetting = appSetting;
            this.sMTP = smtp;
            this._aES = encryption;
        }

        [HttpPost]
        public async Task<IActionResult> Register(PostRegisterUser postRegister)
        {
           var result = await _registration.RegisterAsync(new WriteModel.Registration.RegisterUser
            {
                DOB = postRegister.DOB,
                Email = postRegister.Email,
                Phone = postRegister.Phone,
                Name = postRegister.Name,
                Password = _aES.GetComputedHashKey(postRegister.Password),
                UserName = postRegister.Email
            }, cancellationToken: default);

            if(result.Status == Status.Success)
            {
                var token = await _registration.InitiateVerificationAsync(result.Data);
                SendRegistrationMail(postRegister,token.Data);
            }

           return Ok(result);
        }

        [HttpPut("{token}")]
        public async Task<IActionResult> VerifyAccount(string token)
        {
            var result = await _registration.VerifyAsync(token);
            return Ok(result);

        }


        private void SendRegistrationMail(PostRegisterUser user,string token)
        {
            using (SmtpClient client = new SmtpClient()
            {
                EnableSsl = sMTP.SSL,
                Credentials = new NetworkCredential(sMTP.UserName, sMTP.Password),
                Port = sMTP.Port
            })
            {
                MailMessage message = new MailMessage(sMTP.FromAccount, user.Email);
                StringBuilder sb = new StringBuilder();
                sb.AppendLine($"Hi {user.Name}");
                sb.AppendLine($"Please <a href='registration/verfiyaccount/{token}'>click here</a> to verify your account.!!!");
                sb.AppendLine();
                sb.AppendLine("Thanks,");
                message.Body = sb.ToString();
                message.IsBodyHtml = true;
                message.Subject = "Innova Solution Account Verification";
                client.Send(message);
            }

        }
    }
}
