namespace Todo.Persistence
{
    using System;
    using Domain.Contracts;
    using Domain.Contracts.Items;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Logging;
    using Persistance;

    public class UnitOfWork : IUnitOfWork
    {
        private readonly DbContext _context;
        private readonly ILogger<UnitOfWork> _logger;

        private IItemRepository _itemRepository;

        public UnitOfWork(TodoDbContext dbContext, ILogger<UnitOfWork> logger)
        {
            _context = dbContext;
            _logger = logger;
        }

        public IItemRepository ItemRepository
        {
            get { return _itemRepository ?? (_itemRepository = new ItemRepository(_context)); }
        }

        public void Commit()
        {
            try
            {
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                _logger.LogError("Commit issue", ex);
                throw;
            }
        }
    }
}