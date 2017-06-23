namespace Todo.Services
{
    using System.Data.Entity;
    using System.Linq;
    using System.Threading.Tasks;
    using Domain.BusinessObjects;
    using Domain.BusinessObjects.Query;

    public class BaseService
    {
        protected async Task<QueryResponse<T>> ToPagedQueryResponse<T>(IQueryable<T> query, Paging paging)
        {
            var count = await query.CountAsync();

            paging.FixPageForCount(count);

            return new QueryResponse<T>
            {
                Total = count,
                Page = paging.Page,
                PageSize = paging.PageSizeValue,
                List = await query.ApplyPaging(paging).ToListAsync()
            };
        }
    }
}