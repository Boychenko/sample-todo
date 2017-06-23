namespace Todo.Persistance
{
    using System.Collections.Generic;
    using System.Linq;
    using Domain.Contracts.Items;
    using Domain.Models;
    using Microsoft.EntityFrameworkCore;

    public class ItemRepository : RepositoryBase<Item, ItemSpecifications>, IItemRepository
    {
        public ItemRepository(DbContext dbContext) : base(dbContext)
        {
        }

        protected override IQueryable<Item> BuildQuery(IQueryable<Item> query, ItemSpecifications specifications)
        {
            query = BuildIdentifiersQuery(query, specifications);
            if (specifications.UserIds.Any())
            {
                query = query.Where(q => specifications.UserIds.Contains(q.UserId));
            }

            return query;
        }
    }
}