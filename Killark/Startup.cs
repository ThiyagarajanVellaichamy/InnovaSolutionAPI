using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Extension.Common;
using Extension.Extension;
using InnovaSolutionAPI.Extension;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ServiceProvider.Contracts.Common;
using ServiceProvider.Contracts.Persistance;

namespace InnovaSolutionAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            IAppSetting app = new AppSetting();
            ISMTPConfiguration sMTP = new SMTPConfiguration();
            Configuration.Bind("Appsetting", app);
            Configuration.Bind("SMTPConfiguration", sMTP);
            services.AddControllersWithViews()
                    .SetCompatibilityVersion(CompatibilityVersion.Version_3_0)
                    .ConfigureApiBehaviorOptions(o =>
                    {
                        o.SuppressConsumesConstraintForFormFileParameters = true;
                    })
                    .AddJsonOptions(s =>
                    {
                        s.JsonSerializerOptions.PropertyNamingPolicy = null;
                        s.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
                        s.JsonSerializerOptions.WriteIndented = true;
                    });
            services.AddSingleton(sMTP);
            services.AddAllCors()
                    .AddUtility(app)
                    .AddDependency()
                    .AddApiVersioning();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IAppSetting appsetting, ILoggerManager logger)
        {
            if (!string.IsNullOrWhiteSpace(appsetting.BASEPATH))
                app.UsePathBase(appsetting.BASEPATH);
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.ConfigureExceptionHandler(logger);
            app.UseHttpsRedirection()
                .UseRouting()
                .UseStaticFiles(new StaticFileOptions()
                {
                    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot"))
                })
                .UseAllCors()
                .UseUtility(appsetting, logger)
                .UseEndpoints(endpoints =>
                {
                    endpoints.MapControllerRoute(
                        name: "default",
                        pattern: "v{version:apiVersion=1}/{controller=Account}/{action=login}/{id?}");
                });

        }
    }
}
