namespace Todo.IdentityServer.Manager
{
    using Identity;
    using IdentityManager.AspNetIdentity;

    public class SimpleIdentityManagerService : AspNetIdentityManagerService<User, string, Role, string>
    {
        public SimpleIdentityManagerService(UserManager userMgr, RoleManager roleMgr) : base(userMgr, roleMgr)
        {
        }
    }
}