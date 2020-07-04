using System;
using Microsoft.Extensions.DependencyInjection;
using ServiceProvider.Contracts.Authentication;
using BusinessService.Domain.Authentication;
using ServiceProvider.Contracts.Registration;
using BusinessService.Domain.Registration;

namespace InnovaSolutionAPI.Extension
{
    public static class DIServiceExtensions
    {
        public static IServiceCollection AddDependency(this IServiceCollection services)
        {
            services.AddScoped<IAuthenticate, AuthenticationService>();
            services.AddScoped<IRegistration, RegistrationService>();
            return services;
        }
    }
}
