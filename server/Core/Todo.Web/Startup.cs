namespace Todo.Web
{
    using System.IdentityModel.Tokens.Jwt;
    using AutoMapper;
    using Boilerplate.AspNetCore;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Logging;
    using Microsoft.IdentityModel.Protocols.OpenIdConnect;
    using Newtonsoft.Json.Serialization;
    using Persistance;

    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services
                .AddMvc()
                .AddJsonOptions(
                x => x.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver());

            services.AddAutoMapper(typeof(Startup));

            services.AddDbContext<TodoDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("TodoDatabase")));
            services.AddCustomServices();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, TodoDbContext context)
        {
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

            loggerFactory.AddConsole(Configuration.GetSection("Logging"));

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseJwtBearerAuthentication(new JwtBearerOptions
            {
                // base-address of your identityserver
                Authority = "https://localhost:44300",
 
                Audience = "https://localhost:44300/resources",

                AutomaticAuthenticate = true,
                AutomaticChallenge = true,
                
            });

            app
                // Removes the Server HTTP header from the HTTP response for marginally better security and performance.
                .UseNoServerHttpHeader()
                .UseCors(
                    builder =>
                        builder.AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowAnyOrigin())
                // Add MVC to the request pipeline.
                .UseInternalServerErrorOnException()
                .UseHttpException()
                .UseMvc();

            context.Database.EnsureCreated();
        }
    }
}
