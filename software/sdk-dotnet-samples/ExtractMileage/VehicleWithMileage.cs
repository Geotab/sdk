using Geotab.Checkmate.ObjectModel;

namespace Geotab.SDK.ExtractMileage
{
    /// <summary>
    /// Models a <see cref="Device"/> with mileage data.
    /// </summary>
    class VehicleWithMileage
    {
        /// <summary>
        /// The mileage
        /// </summary>
        public readonly double Mileage;

        /// <summary>
        /// The vehicle
        /// </summary>
        public readonly Device Vehicle;

        /// <summary>
        /// Initializes a new instance of the <see cref="VehicleWithMileage"/> class.
        /// </summary>
        /// <param name="goVehicle">The <see cref="Device"/></param>
        /// <param name="mileage">The mileage</param>
        public VehicleWithMileage(Device goVehicle, double mileage)
        {
            Vehicle = goVehicle;
            Mileage = mileage;
        }
    }
}
