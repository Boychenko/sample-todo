namespace Todo.Domain.Contracts
{
    using Items;

    public interface IUnitOfWork
    {
        IItemRepository ItemRepository { get; }

        void Commit();
    }
}