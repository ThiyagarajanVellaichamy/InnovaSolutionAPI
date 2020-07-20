using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace InnovaSolutionAPI.Extension
{
    public static class CORSServiceExtentions
    {
        private const string Policy = "ALL";

        public static IServiceCollection AddAllCors(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(Policy,
                builder =>
                {
                    builder
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                });
            });
            return services;
        }

        public static IApplicationBuilder UseAllCors(this IApplicationBuilder app)
        {
            app.UseCors(Policy);
            return app;
        }
    }
}
