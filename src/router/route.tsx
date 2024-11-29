
import { Routes, Route, Navigate } from 'react-router-dom';
import Recipes from '@pages/recipes';
import Ingredients from '@pages/ingredients';
import Categories from '@pages/categories';

const Routing = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="/recipes" />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/ingredients" element={<Ingredients />} />
      <Route path="/categories" element={<Categories />} />
    </Routes>
  );
};

export default Routing;