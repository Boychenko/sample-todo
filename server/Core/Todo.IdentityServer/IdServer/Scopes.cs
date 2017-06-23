namespace Todo.IdentityServer.IdServer
{
    using System.Collections.Generic;
    using IdentityServer4.Models;

    public class Scopes
    {
        public static IEnumerable<IdentityResource> Get()
        {
            return new IdentityResource[]
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Email()
            };
        }
    }
}