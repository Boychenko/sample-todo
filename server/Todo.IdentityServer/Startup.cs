namespace Todo.IdentityServer
{
    using IdentityManager.Configuration;
    using IdentityServer3.Core.Configuration;
    using IdServer;
    using Manager;
    using Microsoft.Owin.Security.Google;
    using Owin;

    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.Map("/admin", adminApp =>
            {
                var factory = new IdentityManagerServiceFactory();
                factory.ConfigureSimpleIdentityManagerService("identityManager");

                adminApp.UseIdentityManager(new IdentityManagerOptions()
                {
                    Factory = factory
                });
            });

            app.Map("/core", core =>
            {
                var idSvrFactory = Factory.Configure();
                idSvrFactory.ConfigureUserService("identityManager");

                var options = new IdentityServerOptions
                {
                    SiteName = "Identity Server",
                    SigningCertificate = Certificate.LoadCertificate(),
                    Factory = idSvrFactory,
                    AuthenticationOptions = new AuthenticationOptions
                    {
                        IdentityProviders = ConfigureAdditionalIdentityProviders,
                    }
                };

                core.UseIdentityServer(options);
            });
        }

        public static void ConfigureAdditionalIdentityProviders(IAppBuilder app, string signInAsType)
        {
            var google = new GoogleOAuth2AuthenticationOptions
            {
                AuthenticationType = "Google",
                SignInAsAuthenticationType = signInAsType,
                ClientId = "934734599221-39v00gjvsue5id2v2vii8kmop7e1qfko.apps.googleusercontent.com",
                ClientSecret = "oyb4GjNQaaHiCNr_bMYNrih5"
            };
            app.UseGoogleAuthentication(google);
        }
    }
}