namespace Todo.IdentityServer.Manager.Identity
{
    using Microsoft.AspNet.Identity.EntityFramework;

    public class RoleStore : RoleStore<Role>
    {
        public RoleStore(Context context) : base(context)
        {
        }
    }
}