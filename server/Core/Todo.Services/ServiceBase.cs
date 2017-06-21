namespace Todo.Services
{
    using Domain.BusinessObjects;
    using Domain.Common;
    using Domain.Contracts;

    public abstract class ServiceBase<TRepository, TEnity, TSpecifications>
        where TRepository : IRepository<TEnity, TSpecifications> 
        where TSpecifications : SpecificationsBase
        where TEnity : class
    {
        protected QueryResponse<TEnity> GetQueryResponse(TRepository repository, TSpecifications specifications)
        {
            var total = repository.CountBySpecification(specifications);
            specifications.FixPagingForCount(total);
            var items = repository.GetBySpecification(specifications);
            return new QueryResponse<TEnity>
            {
                List = items,
                Page = specifications.Page,
                PageSize = specifications.Limit,
                Total = total
            };
        }
    }
}