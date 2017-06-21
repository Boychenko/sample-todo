namespace Todo.Persistance
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Domain.Common;
    using Domain.Contracts;
    using Microsoft.EntityFrameworkCore;

    public abstract class RepositoryBase<TEntity, TSpecifications> : IRepository<TEntity, TSpecifications>
        where TEntity : class
        where TSpecifications : SpecificationsBase
    {
        protected readonly DbContext Context;
        protected readonly DbSet<TEntity> DbSet;

        protected RepositoryBase(DbContext context)
        {
            Context = context;
            DbSet = Context.Set<TEntity>();
        }

        public List<TEntity> GetBySpecification(TSpecifications specifications = default(TSpecifications))
        {
            if (specifications == default(TSpecifications))
            {
                return DbSet.ToList();
            }

            var query = BuildQuery(DbSet, specifications);
            query = ApplySortAndPaging(query, specifications);
            return FillExtraData(query.ToList());
        }

        public int CountBySpecification(TSpecifications specifications = default(TSpecifications))
        {
            if (specifications == default(TSpecifications))
            {
                return DbSet.Count();
            }

            return BuildQuery(DbSet, specifications).Count();
        }

        public virtual void Add(TEntity entity)
        {
            var entityEntry = Context.Entry(entity);
            if (entityEntry.State != EntityState.Detached)
            {
                entityEntry.State = EntityState.Added;
            }
            else
            {
                DbSet.Add(entity);
            }
        }

        public virtual void Update(TEntity entity)
        {
            var entityEntry = Context.Entry(entity);
            if (entityEntry.State == EntityState.Detached)
            {
                DbSet.Attach(entity);
            }
            entityEntry.State = EntityState.Modified;
        }

        public virtual void Remove(TEntity entity)
        {
            var entityEntry = Context.Entry(entity);
            if (entityEntry.State != EntityState.Deleted)
            {
                entityEntry.State = EntityState.Deleted;
            }
            else
            {
                DbSet.Attach(entity);
                DbSet.Remove(entity);
            }
        }

        public virtual void Remove(object id)
        {
            var entity = DbSet.Find(id);
            if (entity == null)
            {
                return; // not found; assume already deleted.
            }
            Remove(entity);
        }

        protected IQueryable<T> BuildIdentifiersQuery<T>(IQueryable<T> query, SpecificationsIdentifiersBase<long> specifications) 
            where T : Entity<long, T>, new()
        {
            if (specifications.Identifiers.Any())
            {
                return query.Where(e => specifications.Identifiers.Contains(e.Id));
            }

            return query;
        }

        protected abstract IQueryable<TEntity> BuildQuery(IQueryable<TEntity> queryable, TSpecifications specifications);

        protected virtual List<TEntity> FillExtraData(List<TEntity> results)
        {
            return results;
        }

        /// <summary>
        /// Apply sorting and paging for query
        /// </summary>
        /// <param name="query">IQuerable value</param>
        /// <param name="specification">Specification</param>
        /// <returns></returns>
        private IQueryable<TEntity> ApplySortAndPaging(
            IQueryable<TEntity> query,
            SpecificationsBase specification)
        {
            var pagingIsDefined = specification.Limit > 0;
            if (pagingIsDefined || specification.OrderBys.Any())
            {
                // Sorting isn't required, if we have no paging and select identifiers only from query
                query = ApplySort(query, specification);
            }

            return ApplyPaging(query, specification);
        }

        private IQueryable<TEntity> ApplySort(IQueryable<TEntity> query, SpecificationsBase specification)
        {
            var orderBys = specification.OrderBys.Any()
                ? specification.OrderBys
                : specification.OrderBysDefault;

            foreach (var orderBy in orderBys)
            {
                query = query.OrderBy(orderBy.PropertyName, orderBy.OrderDirection == OrderDirection.Asc);
            }

            return query;
        }

        private IQueryable<TEntity> ApplyPaging(IQueryable<TEntity> query, SpecificationsBase specification)
        {
            return specification.Limit > 0
                ? query.ToPagedQuery(specification.Limit, specification.Page)
                : query;
        }
    }
}