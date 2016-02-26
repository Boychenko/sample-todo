namespace Todo.Services
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Linq;
    using System.Linq.Dynamic;
    using System.Threading.Tasks;
    using Domain.BusinessObjects;
    using Domain.BusinessObjects.Query;
    using Domain.Contracts;
    using Domain.Contracts.Services;
    using Domain.Models;

    public class ItemService : BaseService, IItemService
    {
        private readonly IUnitOfWork _uow;

        public ItemService(IUnitOfWork uow)
        {
            if (uow == null)
            {
                throw new ArgumentNullException(nameof(uow));
            }

            _uow = uow;
        }

        public async Task<QueryResponse<Item>> Get(string userId, BaseQuery request)
        {
            var query = ForUser(userId);
            query = ApplyOrderBy(query, request.Sortings);
            return await ToPagedQueryResponse(query, request.Paging);
        }

        public async Task<Item> Get(string userId, long id)
        {
            return await ForUser(userId).SingleAsync(i => i.Id == id);
        }

        public async Task<Item> Create(string userId, Item item)
        {
            item.UserId = userId;
            item.DueDate = item.DueDate.Date;
            _uow.ItemRepository.Add(item);
            await _uow.Commit();
            return item;
        }

        public async Task<Item> Update(string userId, Item item)
        {
            item.UserId = userId;
            item.DueDate = item.DueDate.Date;
            _uow.ItemRepository.Update(item);
            await _uow.Commit();
            return item;
        }

        public async Task Delete(string userId, long id)
        {
            var item = await ForUser(userId).SingleOrDefaultAsync(i => i.Id == id);
            if (item != null)
            {
                _uow.ItemRepository.Remove(item);
                await _uow.Commit();
            }
        }

        private IQueryable<Item> ApplyOrderBy(IQueryable<Item> query, List<Sorting> sortings)
        {
            if (sortings == null || sortings.Count == 0)
            {
                return query.OrderBy(i => i.Id);
            }

            return query.OrderBy(string.Join(",", sortings));
        }

        private IQueryable<Item> ForUser(string userId)
        {
            return _uow.ItemRepository.Where(i => i.UserId == userId);
        }
    }
}