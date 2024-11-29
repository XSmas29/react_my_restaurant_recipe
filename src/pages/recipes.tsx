import { Typography, Box, Button, Paper, Modal, TextField, CircularProgress, FormControl, IconButton, Autocomplete } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import useRecipe from '../composables/useRecipe';
import {Add, Delete, Save} from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import LoadingButton from '@mui/lab/LoadingButton';
import { Toaster } from 'react-hot-toast';
import useIngredient from '@composables/useIngredient';
import useCategory from '@composables/useCategory';

const paginationModel = { page: 0, pageSize: 10 };
const style = {
  maxWidth: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 6,
};
const Recipes = () => {
  const { 
    getRecipeList, loadingRecipeList, recipeList,
    getRecipeDetail, recipeDetail, loadingRecipeDetail,
    addRecipe, loadingAddRecipe,
    updateRecipe, loadingUpdateRecipe,
    deleteRecipe, loadingDeleteRecipe,
  } = useRecipe();

  const {
    getIngredientList, loadingIngredientList, ingredientList,
  } = useIngredient();

  const {
    getCategoryList, loadingCategoryList, categoryList,
  } = useCategory();

  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalDetailOpen, setModalDetailOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null as any);
  const [recipeFormData, setRecipeFormData] = useState({ name: '', category: null as any, ingredients: [] as any[] });
  const closeModalAdd = () => { setModalAddOpen(false); setRecipeFormData({ name: '', category: null as any, ingredients: [] })}
  const openModalAdd = () => setModalAddOpen(true);
  const closeModalDetail = () => { setModalDetailOpen(false); setRecipeFormData({ name: '', category: null as any, ingredients: [] })}
  const openModalDetail = () => setModalDetailOpen(true);
  const closeModalDelete = () => setModalDeleteOpen(false);
  const openModalDelete = () => setModalDeleteOpen(true);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1, maxWidth: 250 },
    { field: 'name', headerName: 'Recipe Name', flex: 1 },
    { field: 'action', headerName: 'Action', minWidth: 160, renderCell: (params) => (
      // Render a button in each row's "Action" column
      <Box sx={{display: 'flex', margin: 1}}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            getRecipeDetail(params.row.id).then(data => {
              setRecipeFormData(data as any);
              setSelectedId(params.row.id);
              openModalDetail();
            });
          }}
        >
          Detail
        </Button>
        <IconButton aria-label="delete" color="error" sx={{marginLeft: 1}}
          onClick={() => {
            setSelectedId(params.row.id);
            openModalDelete();
          }}>
          <Delete />
        </IconButton>
      </Box>
    ), },
  ];

  useEffect(() => {
    getRecipeList();
    getCategoryList();
    getIngredientList();
  }, []);

  const saveRecipe = () => {
    addRecipe(recipeFormData);
    setRecipeFormData({ name: '', category: null as any, ingredients: [] });
    closeModalAdd();
  }

  const editRecipe = () => {
    updateRecipe(selectedId, recipeFormData);
    setRecipeFormData({ name: '', category: null as any, ingredients: [] });
    closeModalDetail();
  }

  const removeRecipe = () => {
    deleteRecipe(selectedId);
    setRecipeFormData({ name: '', category: null as any, ingredients: [] });
    closeModalDelete();
  }

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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

          <h1 style={{margin: '0.3em'}}>Recipes</h1>
          <div><Button startIcon={<Add />} variant="contained" size='large' onClick={openModalAdd}>Add New Recipe</Button></div>
          <Modal
            open={modalAddOpen}
            onClose={closeModalAdd}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add New Recipe
              </Typography>
              <FormControl>
                <TextField
                  value={recipeFormData.name}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setRecipeFormData({
                      ...recipeFormData,
                      name: event.target.value
                    });
                  }}
                  id="name"
                  label="Recipe Name"
                  sx={{ marginTop: 4 }}
                  required={true}
                />
                <Autocomplete
                  disablePortal
                  options={categoryList}
                  getOptionLabel={(option) => option.name}
                  loading={loadingCategoryList}
                  sx={{ width: 400, marginTop: 3 }}
                  renderInput={(params) => <TextField {...params} label="Category" />}
                  onChange={(event, value) => {
                    if (value === null) {
                      setRecipeFormData({
                        ...recipeFormData,
                        category: null
                      });
                      return;
                    } else {
                      setRecipeFormData({
                        ...recipeFormData,
                        category: value.id
                      });
                    }
                  }}
                />
                <Autocomplete
                  disablePortal
                  options={ingredientList}
                  multiple
                  getOptionLabel={(option) => option.name}
                  loading={loadingIngredientList}
                  sx={{ width: 400, marginTop: 3 }}
                  renderInput={(params) => <TextField {...params} label="Ingredient List" />}
                  onChange={(event, value) => {
                    setRecipeFormData({
                      ...recipeFormData,
                      ingredients: value.map((item: any) => item.id)
                    });
                  }}
                />
                <div style={{marginTop: 20, justifySelf: 'end'}}>
                  <LoadingButton loading={loadingAddRecipe} startIcon={<Save />} variant="contained" size='medium' onClick={saveRecipe}>Save Recipe</LoadingButton>
                </div>
              </FormControl>
            </Box>
          </Modal>
          <Modal
            open={modalDetailOpen}
            onClose={closeModalDetail}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Recipe Detail
              </Typography>
              <FormControl>
                <TextField
                  value={recipeFormData.name}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setRecipeFormData({
                      ...recipeFormData,
                      name: event.target.value
                    });
                  }}
                  id="name"
                  label="Recipe Name"
                  sx={{ marginTop: 4 }}
                  required={true}
                />
                <Autocomplete
                  disablePortal
                  value={categoryList.find((item: any) => item.id === recipeFormData.category)}
                  options={categoryList}
                  getOptionLabel={(option) => option.name}
                  loading={loadingCategoryList}
                  sx={{ width: 400, marginTop: 3 }}
                  renderInput={(params) => <TextField {...params} label="Category" />}
                  onChange={(event, value) => {
                    if (value === null) {
                      setRecipeFormData({
                        ...recipeFormData,
                        category: null
                      });
                      return;
                    } else {
                      setRecipeFormData({
                        ...recipeFormData,
                        category: value.id
                      });
                    }
                  }}
                />
                <Autocomplete
                  disablePortal
                  options={ingredientList}
                  multiple
                  value={recipeFormData.ingredients.map((id: any) => ingredientList.find((item: any) => item.id === id))}
                  getOptionLabel={(option) => option.name}
                  loading={loadingIngredientList}
                  sx={{ width: 400, marginTop: 3 }}
                  renderInput={(params) => <TextField {...params} label="Ingredient List" />}
                  onChange={(event, value) => {
                    setRecipeFormData({
                      ...recipeFormData,
                      ingredients: value.map((item: any) => item.id)
                    });
                  }}
                />
                <div style={{marginTop: 20, justifySelf: 'end'}}>
                  <LoadingButton loading={loadingUpdateRecipe} startIcon={<Save />} variant="contained" size='medium' onClick={editRecipe}>Save Recipe</LoadingButton>
                </div>
              </FormControl>
            </Box>
          </Modal>
          <Modal
            open={modalDeleteOpen}
            onClose={closeModalDelete}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Confirm Delete Recipe
              </Typography>
                <Typography variant="body1" component="p">
                  Are you sure you want to delete this recipe?
                </Typography>
                <div style={{marginTop: 20, justifySelf: 'end'}}>
                  <LoadingButton loading={loadingDeleteRecipe} startIcon={<Save />} variant="contained" size='medium' onClick={removeRecipe}>Delete Recipe</LoadingButton>
                </div>
            </Box>
          </Modal>
        </Box>
        {
        loadingRecipeList ?
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 30 }}>
            <CircularProgress size={80}/>
          </Box>
          :
          <Paper sx={{ marginTop: 4, }}>
            <DataGrid
              rows={recipeList}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[10, 25, 50]}
              sx={{ border: 1, color: 'text.primary',  backgroundColor: 'background.paper', borderRadius: 0 }}
            />
          </Paper>
        }
        <Toaster />
    </motion.div>
  );
};

export default Recipes