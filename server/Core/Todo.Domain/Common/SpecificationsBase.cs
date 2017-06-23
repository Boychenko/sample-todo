namespace Todo.Domain.Common
{
    using System.Collections.Generic;

    public class SpecificationsBase
    {
        private int _limit;

        protected SpecificationsBase()
        {
            OrderBys = new List<OrderBy>();
        }

        public int Page { get; set; }
        public virtual int Limit
        {
            get { return _limit == int.MaxValue ? 0 : _limit; }
            set { _limit = value; }
        }

        public int SkipCount => (Page - 1) * Limit;

        public List<OrderBy> OrderBys { get; set; }
        public virtual List<OrderBy> OrderBysDefault => new List<OrderBy>();

        public void FixPagingForCount(int count)
        {
            if (Limit <= 0) //no paging
            {
                return;
            }

            if (count <= SkipCount)
            {
                Page = 1;
            }
        }
    }
}