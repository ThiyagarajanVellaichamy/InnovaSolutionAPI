using System;
using System.Threading;
using System.Threading.Tasks;
using ReadModel.Notification;
using ServiceProvider.Contracts.Common;
using WriteModel.Registration;

namespace ServiceProvider.Contracts.Registration
{
    public interface IRegistration
    {
        Task<Result<Guid>> RegisterAsync(RegisterUser registerUser,CancellationToken cancellationToken);
        Task<Result<Guid>> VerifyAsync(string Token);
        Task<Result<string>> InitiateVerificationAsync(Guid userid);
    }
}
