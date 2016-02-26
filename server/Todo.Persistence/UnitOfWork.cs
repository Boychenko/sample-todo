using System;
using System.Data.Entity;
using System.Threading.Tasks;

using Todo.Domain.Contracts;
using Todo.Domain.Models;

namespace Todo.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DbContext _context;

        private IRepository<Item> _itemRepository;

        public UnitOfWork(DbContext dbContext)
        {
            _context = dbContext;
        }

        public IRepository<Item> ItemRepository
        {
            get { return _itemRepository ?? (_itemRepository = new EntityRepository<Item>(_context)); }
        }

        public async Task Commit()
        {
            try
            {
                await _context.SaveChangesAsync();       
            }
            catch (Exception ex)
            {
                //TODO: add log here
                throw;
            }
        }
    }
}