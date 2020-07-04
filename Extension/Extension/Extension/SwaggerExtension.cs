using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using ServiceProvider.Contracts.Common;

namespace Extension.Extension
{
    public static class SwaggerExtensions
    {

        public static IServiceCollection AddSwaggerDocumentation(this IServiceCollection services, IAppSetting appSetting)
        {
            services.AddSwaggerGen(c =>
            {

                c.SwaggerDoc(appSetting.Version, new OpenApiInfo
                {
                    Title = appSetting.AppName,
                    Version = appSetting.Version,
                    Description = appSetting.Description
                });
                c.AddSecurityDefinition("Bearer",
                   new OpenApiSecurityScheme
                   {
                       In = ParameterLocation.Header,
                       Description = "Please enter into field the word 'Bearer' following by space and JWT",
                       Name = appSetting.AppName,
                       Type = SecuritySchemeType.ApiKey,
                       Scheme = "Bearer"
                   });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header
                        },
                        new List<string>()
                    }
                });
            });

            return services;
        }

        public static IApplicationBuilder UseSwaggerDocumentation(this IApplicationBuilder app, IAppSetting appsetting)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint($"{appsetting.BASEPATH}/swagger/{appsetting.Version}/swagger.json", appsetting.AppName);
                //c.SwaggerEndpoint($"{appsetting.BASEPATH}/swagger/v1.0/swagger.json", "authv10");
            });
            return app;
        }
    }
}
