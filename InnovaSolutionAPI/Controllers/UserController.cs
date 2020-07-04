using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InnovaSolutionAPI.Request;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ReadModel.Authentication;
using ServiceProvider.Contracts.Authentication;
using ServiceProvider.Contracts.Common;
using ServiceProvider.Contracts.Persistance;
using WriteModel.Authentication;

namespace InnovaSolutionAPI.Controllers
{
    [ApiVersion("1.1")]
    [ApiVersion("1.0")]
    [Route("/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IAuthenticate _authenticate;
        private readonly ILoggerManager _log;
        private readonly IEncryption _aES;
        private readonly IToken<IUser> _token;

        public UserController(
            IAuthenticate authenticate,
            ILoggerManager log,
            IToken<IUser> token,
            IEncryption aESSecurity)
        {
            this._authenticate = authenticate;
            this._aES = aESSecurity;
            this._log = log;
            this._token = token;
        }

        [HttpPost]
        [ProducesResponseType(typeof(Result<LoginResponse>), StatusCodes.Status200OK)]
        public async Task<IActionResult> login(PostAuth auth)
        {
            int i = 0;
            string a = i.ToString();

            var user = await this._authenticate.LoginAsync(auth.UserName, _aES.GetComputedHashKey(auth.Password));
            Result<LoginResponse> result = new Result<LoginResponse>(data: user, status: user != null ? Status.Success : Status.Failed, message: user != null ? "Success" : "Failed");
            return Ok(result);
        }

    }
}
