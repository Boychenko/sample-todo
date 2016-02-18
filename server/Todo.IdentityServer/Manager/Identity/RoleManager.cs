namespace Todo.IdentityServer.Manager.Identity
{
    using Microsoft.AspNet.Identity;

    public class RoleManager : RoleManager<Role>
    {
        public RoleManager(RoleStore store) : base(store)
        {
        }
    }
}