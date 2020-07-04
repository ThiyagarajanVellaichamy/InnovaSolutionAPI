using System;
using System.Collections.Generic;
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
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ServiceProvider.Contracts.Common;

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
            services.AddMvc()
                    .SetCompatibilityVersion(CompatibilityVersion.Version_3_0)
                    .AddJsonOptions(s =>
                    {
                        s.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
                        s.JsonSerializerOptions.WriteIndented = true;
                    });
            services.AddControllers();
            services.AddSingleton(sMTP);
            services.AddAllCors()
                    .AddDIMsx(app)
                    .AddDependency()
                    .AddApiVersioning();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IAppSetting appsetting)
        {
            if (!string.IsNullOrWhiteSpace(appsetting.BASEPATH))
                app.UsePathBase(appsetting.BASEPATH);
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseHttpsRedirection()
                .UseRouting()
                .UseAllCors()
                .UseDIMsx(appsetting)
                .UseEndpoints(endpoints =>
                {
                    endpoints.MapControllers();
                });
        }
    }
}
