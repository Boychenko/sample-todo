namespace Todo.Services
{
    using System.Linq;
    using Domain.BusinessObjects;
    using Domain.Contracts;
    using Domain.Contracts.Items;
    using Domain.Contracts.Services;
    using Domain.Models;

    public class ItemService : ServiceBase<IItemRepository, Item, ItemSpecifications>, IItemService
    {
        private readonly IUnitOfWork _uow;

        public ItemService(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public QueryResponse<Item> GetBySpecification(ItemSpecifications specifications)
        {
            return GetQueryResponse(_uow.ItemRepository, specifications);
        }

        public Item GetById(string userId, long id)
        {
            return _uow.ItemRepository.GetBySpecification(
                new ItemSpecifications()
                {
                    UserIds = { userId },
                    Identifiers = { id }
                }).SingleOrDefault();
        }

        public Item Create(string userId, Item item)
        {
            item.UserId = userId;
            _uow.ItemRepository.Add(item);
            _uow.Commit();
            return item;
        }

        public Item Update(string userId, Item item)
        {
            item.UserId = userId;
            _uow.ItemRepository.Update(item);
             _uow.Commit();
            return item;
        }

        public void Delete(string userId, long id)
        {
            var item = GetById(userId, id);
            if (item != null)
            {
                _uow.ItemRepository.Remove(item);
                _uow.Commit();
            }
        }
    }
}