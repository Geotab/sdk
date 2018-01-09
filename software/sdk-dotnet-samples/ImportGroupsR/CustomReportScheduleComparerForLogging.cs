using System;
using System.Collections.Generic;
using Geotab.Checkmate.ObjectModel;

namespace Geotab.SDK.ImportGroupsR
{
    public class CustomReportScheduleComparerForLogging : Comparer<CustomReportSchedule>
    {
        readonly ReportDestinationComparer reportDestinationComparer = new ReportDestinationComparer();

        readonly IComparer<string> stringComparer = StringComparer.CurrentCulture;

        public override int Compare(CustomReportSchedule x, CustomReportSchedule y)
        {
            if (x == null)
            {
                return y == null ? 0 : -1;
            }
            if (y == null)
            {
                return 1;
            }
            int comparisonResult = stringComparer.Compare(x.Template.Name, y.Template.Name);
            if (comparisonResult != 0)
            {
                return comparisonResult;
            }
            if ((comparisonResult = x.Template.Id.CompareTo(y.Template.Id)) != 0)
            {
                return comparisonResult;
            }
            if (x.Destination == null)
            {
                return y.Destination == null ? 0 : -1;
            }
            if (y.Destination == null)
            {
                return 1;
            }
            if ((comparisonResult = reportDestinationComparer.Compare(x.Destination.Value, y.Destination.Value)) != 0)
            {
                return comparisonResult;
            }
            return 0;
        }

        class ReportDestinationComparer : Comparer<ReportDestination>
        {
            public override int Compare(ReportDestination x, ReportDestination y)
            {
                if (x < y)
                {
                    return -1;
                }
                if (x > y)
                {
                    return 1;
                }
                return 0;
            }
        }
    }
}