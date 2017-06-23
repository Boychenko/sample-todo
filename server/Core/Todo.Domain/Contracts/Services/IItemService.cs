namespace Todo.Domain.Contracts.Services
{
    using BusinessObjects;
    using Items;
    using Models;

    public interface IItemService
    {
        QueryResponse<Item> GetBySpecification(ItemSpecifications specifications);

        Item GetById(string userId, long id);

        Item Create(string userId, Item item);

        Item Update(string userId, Item item);

        void Delete(string userId, long id);
    }
}