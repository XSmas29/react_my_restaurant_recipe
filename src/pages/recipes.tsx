import { Typography } from '@mui/material';
import { motion } from 'framer-motion';

const Recipes = () => {
  return (
    <motion.div
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.25,
          }
        }
      }}  
      initial="hidden"
      animate="visible"
      >
       <h1 style={{margin: '0.3em'}}>Recipes</h1>
    </motion.div>
  );
};

export default Recipes;