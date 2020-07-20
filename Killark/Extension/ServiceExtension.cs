using BusinessService.Domain.Authentication;
using BusinessService.Domain.Registration;
using Extension;
using Extension.Common;
using Extension.Security;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using ServiceProvider.Contracts.Authentication;
using ServiceProvider.Contracts.Persistance;
using ServiceProvider.Contracts.Registration;

namespace InnovaSolutionAPI.Extension
{
    public static class DIServiceExtensions
    {
        public static IServiceCollection AddDependency(this IServiceCollection services)
        {
            services.AddScoped<IAuthenticate, AuthenticationService>();
            services.AddScoped<IRegistration, RegistrationService>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<ILoggerManager, LoggerManager>();
            services.AddSingleton<IEncryption, AESEncryption>();
            services.AddTransient<IToken<IUser>, JWTGenerator>();
            return services;
        }
    }
}
