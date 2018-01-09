using System;

namespace Geotab.SDK.ImportGroupsR
{
    public class RowParsedEventArgs<TItem> : EventArgs
    {
        public Exception Exception;
        public TItem ImportedItem;
        public string Line;
        public int Row;

        public RowParsedEventArgs(TItem parsedItem, int row, string line)
        {
            Row = row;
            Line = line;
            ImportedItem = parsedItem;
        }

        public RowParsedEventArgs(int row, string line, Exception exception)
        {
            Row = row;
            Line = line;
            Exception = exception;
        }
    }
}