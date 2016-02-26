using Microsoft.Owin;
using Todo.Web;

[assembly: OwinStartup(typeof(Startup))]

namespace Todo.Web
{
    using System.Data.Entity.Migrations;
    using System.IdentityModel.Tokens;
    using System.Threading;
    using System.Web.Http;
    using IdentityServer3.AccessTokenValidation;
    using Microsoft.Owin.BuilderProperties;
    using Microsoft.Owin.Cors;
    using Owin;
    using Persistence.Migrations;

    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var configuration = new HttpConfiguration();

            JwtSecurityTokenHandler.InboundClaimTypeMap.Clear();

            app.UseIdentityServerBearerTokenAuthentication(new IdentityServerBearerTokenAuthenticationOptions
            {
                Authority = "https://localhost:44300/core"
            });

            var properties = new AppProperties(app.Properties);
            CancellationToken token = properties.OnAppDisposing;

            if (token != CancellationToken.None)
            {
                token.Register(UnityWebApiActivator.Shutdown);
            }

            app.UseCors(CorsOptions.AllowAll);

            WebApiConfig.Register(configuration);
            UnityWebApiActivator.Start(configuration);
            app.UseWebApi(configuration);

            UpdateDatabase();
        }

        private static void UpdateDatabase()
        {
            var persistenceConfig = new Configuration();
            var migrator = new DbMigrator(persistenceConfig);
            migrator.Update();
        }
    }
}