import React, { useState, useEffect } from "react";
import Select from "react-select";
import { getRecipes } from "../api/api";

const FilterBar = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    coffee: null,
    grinder: null,
  });

  const [coffees, setCoffees] = useState([]);
  const [grinders, setGrinders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRecipes({});
        const recipes = response.recipes;

        const uniqueCoffees = [
          ...new Map(recipes.map((r) => [r.coffee.name, r.coffee])).values(),
        ].map((coffee) => ({
          value: coffee.name,
          label: coffee.name,
        }));

        const uniqueGrinders = [
          ...new Map(recipes.map((r) => [r.grinder.name, r.grinder])).values(),
        ].map((grinder) => ({
          value: grinder.name,
          label: grinder.name,
        }));

        setCoffees(uniqueCoffees);
        setGrinders(uniqueGrinders);
      } catch (error) {
        console.error("Error fetching filter data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (selectedOption, filterKey) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: selectedOption,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedFilters = {
      coffee: filters.coffee ? filters.coffee.value : undefined,
      grinder: filters.grinder ? filters.grinder.value : undefined,
    };
    onFilter(formattedFilters);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Filter Recipes</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="flex flex-col w-full">
          <Select
            options={coffees}
            value={filters.coffee}
            onChange={(selected) => handleFilterChange(selected, "coffee")}
            placeholder="Filter by Coffee"
            className="w-full"
            isClearable={true}
          />
        </div>

        <div className="flex flex-col w-full">
          <Select
            options={grinders}
            value={filters.grinder}
            onChange={(selected) => handleFilterChange(selected, "grinder")}
            placeholder="Filter by Grinder"
            className="w-full"
            isClearable={true}
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 w-full md:w-auto"
        >
          Apply Filters
        </button>
      </form>
    </div>
  );
};

export default FilterBar;
