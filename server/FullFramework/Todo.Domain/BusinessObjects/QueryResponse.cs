namespace Todo.Domain.BusinessObjects
{
    using System.Collections.Generic;

    public class QueryResponse<T>
    {
        public List<T> List { get; set; }

        public int Total { get; set; }

        /// <summary>
        ///     0 if no paging
        /// </summary>
        public int PageSize { get; set; }

        /// <summary>
        ///     Start from 1
        /// </summary>
        public int Page { get; set; }
    }
}