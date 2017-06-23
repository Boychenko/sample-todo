namespace Todo.Web.Models
{
    using Domain.Contracts.Items;

    public class ListRequest
    {
        public ListRequest()
        {
            Page = 1;
        }

        public string OrderBy { get; set; }

        public bool Asc { get; set; }

        public int? PageSize { get; set; }

        public int Page { get; set; }

        public ItemSpecifications ToSpecifications(string getAppUserId)
        {
            throw new System.NotImplementedException();
        }
    }
}