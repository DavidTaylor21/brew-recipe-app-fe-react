import React from 'react';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 mb-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800 hover:text-blue-600 transition-all duration-300 mb-4">
        {recipe.title}
      </h2>
      <p className="text-gray-500 mt-2 text-lg">
        <strong>Brew Method:</strong> {recipe.brewMethod}
      </p>
      <p className="text-gray-600 mt-2 text-lg">
        <strong>Steps:</strong> {recipe.steps}
      </p>
      <p className="text-gray-600 mt-2 text-lg">
        <strong>Coffee:</strong> {recipe.coffee.name}
      </p>
      <p className="text-gray-600 mt-2 text-lg">
        <strong>Grinder:</strong> {recipe.grinder.name}
      </p>
      <p className="text-gray-600 mt-2 text-lg">
        <strong>Created by:</strong> {recipe.user.username}
      </p>
      <button
        className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-all duration-300 focus:outline-none"
      >
        View Details
      </button>
    </div>
  );
};

export default RecipeCard;
