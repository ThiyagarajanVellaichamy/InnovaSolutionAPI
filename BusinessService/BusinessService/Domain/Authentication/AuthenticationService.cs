using System;
using System.Threading;
using System.Threading.Tasks;
using ReadModel.Authentication;
using RelationalEngine.Authentication;
using ServiceProvider.Contracts.Authentication;
using ServiceProvider.Contracts.Common;
using ServiceProvider.Contracts.Persistance;

namespace BusinessService.Domain.Authentication
{
    public sealed class AuthenticationService : BaseService, IAuthenticate
    {
        public AuthenticationService(IAppSetting configuration,
                                     ILoggerManager logger,
                                     IEncryption encryption) :
            base(configuration, logger, encryption)
        {

        }
        /// <summary>
        /// To Validate user identity
        /// </summary>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <param name="cancel"></param>
        /// <returns></returns>
        public async Task<LoginResponse> LoginAsync(string username, byte[] password, CancellationToken cancel = default)
        {
            return await this.Instance.GetInstance<IAuthenticate, AuthenticateEngine>().LoginAsync(username, password, cancel);
        }

        /// <summary>
        /// To Dispose Current Instance.
        /// </summary>
        public override void Dispose()
        {
            this.Instance?.Dispose();
        }
    }
}
