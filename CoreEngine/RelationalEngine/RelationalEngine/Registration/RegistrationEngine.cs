using System;
using System.Threading.Tasks;
using ServiceProvider.Contracts.Common;
using ServiceProvider.Contracts.Registration;
using WriteModel.Registration;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Text;
using RelationalEngine.Extension;
using ServiceProvider.Contracts.Persistance;

namespace RelationalEngine.Registration
{
    public class RegistrationEngine : BaseEngine, IRegistration
    {
        StringBuilder message = new StringBuilder();
        private readonly IEncryption encryption = null;
        public RegistrationEngine(IAppSetting configuration,IEncryption encryption) : base(configuration)
        {
            this.encryption = encryption;
        }
        /// <summary>
        /// To Register User
        /// </summary>
        /// <param name="registerUser"></param>
        /// <returns></returns>
        public async Task<Result<Guid>> RegisterAsync(RegisterUser registerUser,CancellationToken cancellationToken = default)
        {
            var usr = await context.Users.FirstOrDefaultAsync(s => s.Email == registerUser.Email);
            if (usr == null)
            {
                usr = new DataModel.Audit.User();
                usr.Id = Guid.NewGuid();
                usr.Email = registerUser.Email;
                usr.IsAccountVerified = false;
                usr.IsActive = true;
                usr.Name = registerUser.Name;
                usr.Password = registerUser.Password;
                usr.Phone = registerUser.Phone;
                usr.CreatedBy = Guid.NewGuid();
                usr.CreatedOn = DateTime.UtcNow;
                usr.DOB = registerUser.DOB;
                context.Users.Add(usr);

                var i = await context.SaveChangesAsync(cancellationToken);
                if (i > 0)
                {
                    return new Result<Guid>(
                    message: "Registeration Success",
                    data: usr.Id,
                    status: Status.Success);
                }
                else
                {
                    return new Result<Guid>(
                    message: "Try after sometime, something went wrong!!!",
                    data: usr.Id,
                    status: Status.Failed);
                }
            }
            else
            {
                return new Result<Guid>(
                    message: "Already exists with same emailid",
                    data: Guid.Empty,
                    status: Status.Failed);
            }
        }
        /// <summary>
        /// To Initiate verification
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        public async Task<Result<string>> InitiateVerificationAsync(Guid userid)
        {
            var _uvall = await context.UserVerifications
                 .Where(s => s.UserId == userid && s.IsActive == true)
                 .SetValue(y => y.IsActive = false)
                 .ToListAsync();
            context.UserVerifications.UpdateRange(_uvall);

            var token = encryption.Encrypt($"{userid}{DateTime.UtcNow.ToString()}");

            await context.UserVerifications.AddAsync(new DataModel.Audit.UserVerification
            {
                Id = Guid.NewGuid(),
                UserId = userid,
                ExpiredOn = DateTime.UtcNow.AddHours(setting.ExpiryBuffer),
                GeneratedOn = DateTime.UtcNow,
                IsActive = true,
                Token = token
            });

           var i =  await context.SaveChangesAsync();
            if (i > 0)
            {
                return new Result<string>(data: token,
                    status: Status.Success,
                    message: "Initated for verification");
            }
            else
            {
                return new Result<string>(data: token,
                    status: Status.Failed,
                    message: "Faild to send verification");
            }
        }

        /// <summary>
        /// To Verify Async
        /// </summary>
        /// <param name="Token"></param>
        /// <returns></returns>
        public async Task<Result<Guid>> VerifyAsync(string Token)
        {
            var usr = await context.UserVerifications.FirstOrDefaultAsync(s => s.Token == Token);
            bool IsValid = true;
            if (usr != null)
            {
                if (!usr.IsActive)
                {
                    IsValid = false;
                    message.AppendLine("Token is not valid");
                }
                if (usr.ExpiredOn > DateTime.UtcNow)
                {
                    message.AppendLine("Token has been expired, please try again");
                    IsValid = false;
                }

                if (IsValid)
                {
                    usr.IsActive = false;
                    var usrr = await context.Users.FirstOrDefaultAsync(s => s.Id == usr.UserId);
                    if (usrr != null)
                    {
                        usrr.IsAccountVerified = true;
                        if(await context.SaveChangesAsync() > 0)
                        {
                            message.AppendLine("Account verified");
                        }
                        else
                        {
                            IsValid = false;
                        }
                    }
                }

               
            }
            else
            {
                IsValid = false;
                message.AppendLine("Invalid Token");

            }
            return new Result<Guid>(data: Guid.Empty, status: IsValid ? Status.Success : Status.Failed,
                   message: message.ToString());
        }
    }
}
