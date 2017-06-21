namespace Todo.Web.Models
{
    using System.Collections.Generic;

    public class ListResponse<T>
    {
        public List<T> List { get; set; }

        public int Total { get; set; }

        public int PageSize { get; set; }

        public int Page { get; set; }
    }
}