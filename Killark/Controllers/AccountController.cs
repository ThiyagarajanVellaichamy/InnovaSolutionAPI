using System;
using System.Threading.Tasks;
using Killark.Data;
using Killark.Request;
using Microsoft.AspNetCore.Mvc;
using ServiceProvider.Authentication;
using ServiceProvider.Contracts.Authentication;
using ServiceProvider.Contracts.Common;
using ServiceProvider.Contracts.Persistance;

namespace Killark.Controllers
{
    [ApiVersion("1")]
    [ApiController]
    [Route("/v{version:apiVersion}/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAuthenticate _authenticate;
        private readonly IEncryption _encryption;
        private readonly ILoggerManager _logger;
        private readonly IToken<IUser> _token;

        public AccountController(IAppSetting setting,
            IAuthenticate authenticate,
            IEncryption encryption,
            ILoggerManager logger,
            IToken<IUser> token)
        {
            this._authenticate = authenticate;
            this._encryption = encryption;
            this._logger = logger;
            this._token = token;
        }


        /// <summary>
        /// TO Authenticate User
        /// </summary>
        /// <param name="login"></param>
        /// <returns></returns>
        [HttpPost(template: "login")]
        [ProducesResponseType(200, Type = typeof(Result<LoginResponse>))]
        public async Task<IActionResult> Login([FromBody] PostAuth param)
        {
            try
            {
                 param = new PostAuth();
                

                var result = await this._authenticate.LoginAsync(param.UserName, this._encryption.GetComputedHashKey(param.Password));
                if (result.Status == Status.Success)
                {
                    result.Data.Token = this._token.Generate(result.Data);
                    result.Data.RefreshToken = this._token.Generate(result.Data, DateTime.Now.AddDays(1));
                }
                return Ok(result);
            }
            catch(Exception ex)
            {
                _logger.LogError($"Account/Login: {ex.ToString()}");
                return Ok(new Result<LoginResponse>(null, Status.Failed, "Internal error"));
            }
        }

        
    }
}