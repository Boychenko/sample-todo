namespace Todo.Web.Models
{
    using System.Collections.Generic;
    using Domain.BusinessObjects.Query;

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

        public BaseQuery ToQuery()
        {
            var query = new BaseQuery { Paging = new Paging { Page = Page, PageSize = PageSize } };
            if (!string.IsNullOrWhiteSpace(OrderBy))
            {
                query.Sortings = new List<Sorting> { new Sorting(OrderBy, Asc) };
            }
            return query;
        }
    }
}