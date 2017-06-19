namespace Tests
{
    using NUnit.Framework;
    using Todo.Domain.BusinessObjects.Query;

    [TestFixture]
    public class SortingTests
    {
        [Test]
        [TestCase("name", true, ExpectedResult = "name ASC")]
        [TestCase("name", false, ExpectedResult = "name DESC")]
        public string CheckToStringConversion(string field, bool asc)
        {
            return new Sorting(field, asc).ToString();
        }
    }
}