using System;
using System.Threading;
using System.Threading.Tasks;
using RelationalEngine.Registration;
using ServiceProvider.Contracts.Common;
using ServiceProvider.Contracts.Persistance;
using ServiceProvider.Contracts.Registration;
using WriteModel.Registration;

namespace BusinessService.Domain.Registration
{
    public class RegistrationService : BaseService, IRegistration
    {
        public RegistrationService(IAppSetting configuration,
                                   ILoggerManager logger,
                                   IEncryption encryption) :
            base(configuration, logger, encryption)
        {

        }
        /// <summary>
        /// To Register
        /// </summary>
        /// <param name="registerUser"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task<Result<Guid>> RegisterAsync(
            RegisterUser registerUser,
            CancellationToken cancellationToken)
        {
            return await
                this.Instance
                    .GetInstance<IRegistration, RegistrationEngine>()
                    .RegisterAsync(registerUser, cancellationToken);
        }
        /// <summary>
        /// To Verify account by using token
        /// </summary>
        /// <param name="Token"></param>
        /// <returns></returns>
        public async Task<Result<Guid>> VerifyAsync(string Token)
        {
            return await
                this.Instance
                .GetInstance<IRegistration, RegistrationEngine>()
                .VerifyAsync(Token);
        }
        /// <summary>
        /// Initiate verification process to get token
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        public async Task<Result<string>> InitiateVerificationAsync(Guid userid)
        {
            return await
                this.Instance
                .GetInstance<IRegistration, RegistrationEngine>()
                .InitiateVerificationAsync(userid);
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
