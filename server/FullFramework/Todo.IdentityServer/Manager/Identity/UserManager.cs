namespace Todo.IdentityServer.Manager.Identity
{
    using Microsoft.AspNet.Identity;

    public class UserManager : UserManager<User, string>
    {
        public UserManager(UserStore store) : base(store)
        {
            ClaimsIdentityFactory = new ClaimsFactory();
        }
    }
}