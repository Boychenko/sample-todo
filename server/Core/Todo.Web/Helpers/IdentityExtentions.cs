namespace Todo.Web.Helpers
{
    using System.Security.Claims;
    using System.Security.Principal;

    public static class IdentityExtentions
    {
        public static string GetAppUserId(this IIdentity identity)
        {
            var claimsIdentity = identity as ClaimsIdentity;

            if (claimsIdentity == null)
            {
                return null;
            }

            var issuerFromIdentity = claimsIdentity.FindFirst("iss"); 
            var subFromIdentity = claimsIdentity.FindFirst("sub");

            if (issuerFromIdentity == null || subFromIdentity == null)
            {
                return null;
            }

            return issuerFromIdentity.Value + subFromIdentity.Value;
        }
    }
}