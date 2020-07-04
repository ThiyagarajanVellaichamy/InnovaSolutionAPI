using System;
using Extension.Common;
using Extension.Security;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using ServiceProvider.Contracts.Common;
using ServiceProvider.Contracts.Persistance;
using WriteModel.Authentication;

namespace Extension.Extension
{
    public static class UtilityExtension
    {
        public static IServiceCollection AddDIMsx(this IServiceCollection services, IAppSetting appSetting)
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

        public static IApplicationBuilder UseDIMsx(this IApplicationBuilder app, IAppSetting appsetting)
        {
            app.UseSwaggerDocumentation(appsetting);
            app.UseJwt();
            return app;
        }
    }
}
