import useForm from "../../hooks/useForm";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadCars } from "../../services/carsService";
import { connect } from "react-redux";
import { updateSearchCriteria } from "../../reducer/actions";
import { toast } from "react-toastify";
import { toastStyles } from "../toastStyle";

const SearchFormKeys = {
  Make: "make",
  Model: "model",
  MinPrice: "minPrice",
  MaxPrice: "maxPrice",
  MinYear: "minYear",
  MaxYear: "maxYear",
  TransmissionType: "transmissionType",
  Killometers: "killometers",
  Category: "category",
  EngineType: "engineType",
  Color: "color",
  Loc: "loc",
};

const AdvancedSearch = ({ dispatch }) => {
  const navigate = useNavigate();
  const submitHandler = () => {
    try {
      toast.dismiss();

      if (!isMaxPriceUnderOneMillion(values.maxPrice)) {
        return;
      }
      if (!isMaxYearCurrentYear(values.maxYear)) {
        return;
      }
      if (!isMinYear(values.minYear)) {
        return;
      }

      // Continue with the rest of the logic
      dispatch(updateSearchCriteria(values));
      navigate("/cars");
    } catch (error) {
      // Handle other errors if needed
    }
  };
  const { values, onChange, onSubmit } = useForm(submitHandler, {
    [SearchFormKeys.Make]: "",
    [SearchFormKeys.Model]: "",
    [SearchFormKeys.MinPrice]: "",
    [SearchFormKeys.MaxPrice]: "",
    [SearchFormKeys.MaxYear]: "",
    [SearchFormKeys.MinYear]: "",
    [SearchFormKeys.TransmissionType]: "",
    [SearchFormKeys.Killometers]: "",
    [SearchFormKeys.Category]: "",
    [SearchFormKeys.EngineType]: "",
    [SearchFormKeys.Color]: "",
    [SearchFormKeys.Loc]: "",
  });

  const [cars, setCars] = useState([]);

  useEffect(() => {
    loadCars().then((cars) => setCars(cars));
  }, []);

  const getModelsForCarId = (carId) => {
    const car = cars.find((car) => car.id === carId);
    return car ? car.models : null;
  };

  return (
    <form onSubmit={onSubmit} className="form">
      <div className="row">
        <div className="input-container">
          <label className="label">Make:</label>
          <select
            name={SearchFormKeys.Make}
            onChange={onChange}
            value={values[SearchFormKeys.Make]}
            className="select"
          >
            <option value="">Select make</option>
            {cars.map((car) => (
              <option key={car.id} value={car.id}>
                {car.id}
              </option>
            ))}
          </select>
        </div>
        <div className="input-container">
          <label className="label">Engine Type:</label>
          <select
            name={SearchFormKeys.EngineType}
            onChange={onChange}
            value={values[SearchFormKeys.EngineType]}
            className="select"
          >
            <option value="">Select engine</option>
            <option value="gasoline">Gasoline</option>
            <option value="diesel">Diesel</option>
            <option value="hybrid">Hybrid</option>
            <option value="electric">Electric</option>
          </select>
        </div>
        <div className="input-container">
          <label className="label">Category:</label>
          <select
            name={SearchFormKeys.Category}
            onChange={onChange}
            value={values[SearchFormKeys.Category]}
            className="select"
          >
            <option value="">Select category</option>
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
            <option value="coupe">Coupe</option>
            <option value="convertible">Convertible</option>
            <option value="hatchback">Hatchback</option>
            <option value="wagon">Wagon</option>
            <option value="pickup">Pickup Truck</option>
            <option value="minivan">Minivan</option>
            <option value="crossover">Crossover</option>
            <option value="sportsCar">Sports Car</option>
          </select>
        </div>
        <div className="input-container">
          <label className="label">Color:</label>
          <select
            name={SearchFormKeys.Color}
            onChange={onChange}
            value={values[SearchFormKeys.Color]}
            className="select"
          >
            <option value="">Select color</option>
            <option value="blue">blue</option>
            <option value="red">red</option>
          </select>
        </div>
        <div className="input-container">
          <label className="label">Price:</label>
          <input
            type="number"
            name={SearchFormKeys.MinPrice}
            onChange={onChange}
            value={values[SearchFormKeys.MinPrice]}
            placeholder="1000"
          />
          -
          <input
            type="number"
            name={SearchFormKeys.MaxPrice}
            onChange={onChange}
            value={values[SearchFormKeys.MaxPrice]}
            placeholder="50000"
          />
        </div>
      </div>

      <div className="row">
        <div className="input-container">
          <label className="label">Model:</label>
          <select
            name={SearchFormKeys.Model}
            onChange={onChange}
            className="select"
          >
            {values[SearchFormKeys.Make] === "" ? (
              <option value="">Select a model</option>
            ) : (
              <>
                <option value="">Select a model</option>
                {getModelsForCarId(values[SearchFormKeys.Make]).map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>
        <div className="input-container">
          <label className="label">Transmission:</label>
          <select
            name={SearchFormKeys.TransmissionType}
            onChange={onChange}
            value={values[SearchFormKeys.TransmissionType]}
            className="select"
          >
            <option value="">Select transmission type</option>
            <option value="automatic">Automatic</option>
            <option value="manual">Manual</option>
          </select>
        </div>
        <div className="input-container">
          <label className="label">Max Kilometers:</label>
          <select
            name={SearchFormKeys.Killometers}
            onChange={onChange}
            value={values[SearchFormKeys.Killometers]}
            className="select"
          >
            <option value="">Select max km</option>
            <option value="10000">Under 10,000 km</option>
            <option value="30000">Under 30,000 km</option>
            <option value="50000">Under 50,000 km</option>
            <option value="100000">Under 100,000 km</option>
            <option value="200000">Under 200,000 km</option>
          </select>
        </div>
        <div className="input-container">
          <label className="label">Location:</label>
          <select
            name={SearchFormKeys.Loc}
            onChange={onChange}
            value={values[SearchFormKeys.Loc]}
            className="select"
          >
            <option value="">Select location</option>
            <option value="hiroshima">Hiroshima</option>
            <option value="nagasaki">Nagasaki</option>
          </select>
        </div>
        <div className="input-container">
          <label className="label">Year:</label>
          <input
            type="number"
            name={SearchFormKeys.MinYear}
            onChange={onChange}
            value={values[SearchFormKeys.MinYear]}
            placeholder="1980"
          />
          -
          <input
            type="number"
            name={SearchFormKeys.MaxYear}
            onChange={onChange}
            value={values[SearchFormKeys.MaxYear]}
            placeholder="2023"
          />
        </div>
      </div>

      <button type="submit" className="button">
        Submit
      </button>
    </form>
  );
};
const mapStateToProps = (state) => ({
  searchCriteria: state,
});

export default connect(mapStateToProps)(AdvancedSearch);
function isMaxPriceUnderOneMillion(maxPrice) {
  if(maxPrice==""){
    return true
  }
  if (maxPrice < 1000000) {
    return true;
  } else {
    // Throw a toast error if maxPrice is not under 1000000
    toast.error("Maximum price must be under 1000000", toastStyles);
    return false;
  }
}
function isMaxYearCurrentYear(maxYear) {
  if(maxYear==""){
    return true
  }
  if (maxYear <= 2023) {
    return true;
  } else {
    // Throw a toast error if maxPrice is not under 1000000
    toast.error("Maximum year must be under 2024", toastStyles);
    return false;
  }
}
function isMinYear(minYear) {
  if(minYear==""){
    return true
  }
  if (minYear >= 1980) {
    return true;
  } else {
    // Throw a toast error if maxPrice is not under 1000000
    toast.error("Minimun year must be over 1980", toastStyles);
    return false;
  }
}