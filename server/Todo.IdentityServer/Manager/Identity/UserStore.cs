namespace Todo.IdentityServer.Manager.Identity
{
    using Microsoft.AspNet.Identity.EntityFramework;

    public class UserStore : UserStore<User, Role, string, IdentityUserLogin, IdentityUserRole, IdentityUserClaim>
    {
        public UserStore(Context context) : base(context)
        {
        }
    }
}