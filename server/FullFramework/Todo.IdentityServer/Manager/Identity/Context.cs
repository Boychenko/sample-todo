namespace Todo.IdentityServer.Manager.Identity
{
    using Microsoft.AspNet.Identity.EntityFramework;

    public class Context : IdentityDbContext<User, Role, string, IdentityUserLogin, IdentityUserRole, IdentityUserClaim>
    {
        public Context(string connString)
            : base(connString)
        {
        }
    }
}