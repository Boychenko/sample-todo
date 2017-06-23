namespace Todo.Domain.Contracts.Services
{
    using System.Threading.Tasks;
    using BusinessObjects;
    using BusinessObjects.Query;
    using Models;

    public interface IItemService
    {
        Task<QueryResponse<Item>> Get(string userId, BaseQuery request);

        Task<Item> Get(string userId, long id);

        Task<Item> Create(string userId, Item item);

        Task<Item> Update(string userId, Item item);

        Task Delete(string userId, long id);
    }
}