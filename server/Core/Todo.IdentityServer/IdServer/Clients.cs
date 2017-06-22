namespace Todo.IdentityServer.IdServer
{
    using System.Collections.Generic;
    using IdentityServer4;
    using IdentityServer4.Models;

    public class Clients
    {
        public static List<Client> Get()
        {
            return new List<Client>
            {
                new Client
                {
                    ClientName = "Todo Sample",
                    Enabled = true,
                    ClientId = "todoSample",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    ClientUri = "https://github.com/Boychenko/sample-todo-2016",
                    LogoUri = "https://s.gravatar.com/avatar/e371b4f2e325e686190e1234333bb083?s=80",
                    RequireConsent = true,
                    AllowRememberConsent = false,
                    AllowOfflineAccess = true,
                    RedirectUris = new List<string>
                    {
                        "http://localhost:3000/callback",
                    },
                    AllowedScopes = new List<string>
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        IdentityServerConstants.StandardScopes.Email,
                    },

                    AccessTokenType = AccessTokenType.Jwt,
                    IdentityTokenLifetime = 300,
                    AccessTokenLifetime = 3600
                }
            };
        }
    }
}