using System;
using System.Collections.Generic;
using System.Linq;

namespace RelationalEngine.Extension
{
    public static class QueryExtension
    {
        public static IQueryable<T> SetValue<T>(this IQueryable<T> items, Action<T>
         updateMethod)
        {
            foreach (T item in items)
            {
                updateMethod(item);
            }
            return items;
        }
    }
}
