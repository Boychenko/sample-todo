namespace Todo.IdentityServer.Manager.Identity
{
    using Microsoft.AspNet.Identity.EntityFramework;

    public class User : IdentityUser
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }
    }
}