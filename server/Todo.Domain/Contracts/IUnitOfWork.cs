namespace Todo.Domain.Contracts
{
    using System.Threading.Tasks;
    using Models;

    public interface IUnitOfWork
    {
        IRepository<Item> ItemRepository { get; }

        Task Commit();
    }
}