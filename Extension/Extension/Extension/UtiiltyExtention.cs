using System.Net;
using Extension.Common;
using Extension.Security;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using ServiceProvider.Contracts.Authentication;
using ServiceProvider.Contracts.Common;
using ServiceProvider.Contracts.Persistance;

namespace Extension.Extension
{


    public static class UtilityExtension
    {
        public static void ConfigureExceptionHandler(this IApplicationBuilder app, ILoggerManager logger)
        {
            app.UseExceptionHandler(appError =>
            {
                appError.Run(async context =>
                {
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    context.Response.ContentType = "application/json";

                    var contextFeature = context.Features.Get<IExceptionHandlerFeature>();
                    if (contextFeature != null)
                    {
                        await context.Response.WriteAsync(new ErrorDetails()
                        {
                            StatusCode = context.Response.StatusCode,
                            Message = contextFeature.Error.Message
                        }.ToString());
                        logger.LogError($"Status Code:{context.Response.StatusCode}, Message:{contextFeature.Error.StackTrace}");
                    }
                });
            });
        }
        public static IServiceCollection AddUtility(this IServiceCollection services, IAppSetting appSetting)
        {
            services.AddSingleton(appSetting);
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<ILoggerManager, LoggerManager>();
            services.AddSingleton<IEncryption, AESEncryption>();
            services.AddTransient<IToken<IUser>, JWTGenerator>();
            //services.AddSingleton(appSetting);
            services.AddJwt(appSetting);
            services.AddSwaggerDocumentation(appSetting);
            return services;
        }

        public static IApplicationBuilder UseUtility(this IApplicationBuilder app, IAppSetting appsetting, ILoggerManager logger)
        {
            app.UseSwaggerDocumentation(appsetting);
            app.UseJwt();
            return app;
        }
    }
}
