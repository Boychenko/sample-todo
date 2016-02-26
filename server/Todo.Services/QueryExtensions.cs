namespace Todo.Services
{
    using System.Linq;
    using Domain.BusinessObjects.Query;

    public static class QueryExtensions
    {
        public static IQueryable<T> ApplyPaging<T>(this IQueryable<T> queryable, Paging paging)
        {
            if (paging.PageSizeValue > 0)
            {
                queryable = queryable.Skip(paging.SkipCount).Take(paging.PageSizeValue);
            }
            return queryable;
        }
    }
}