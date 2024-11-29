
import { Routes, Route } from 'react-router-dom';
import Recipes from '@pages/recipes';
import Ingredients from '@pages/ingredients';
import Categories from '@pages/categories';

const Routing = () => {
  return (
    <Routes>
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/ingredients" element={<Ingredients />} />
      <Route path="/categories" element={<Categories />} />
    </Routes>
  );
};

export default Routing;