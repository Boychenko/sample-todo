namespace Todo.Domain.Contracts.Items
{
    using Models;

    public interface IItemRepository : IRepository<Item, ItemSpecifications>
    {
        
    }
}