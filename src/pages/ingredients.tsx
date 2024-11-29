import { Typography, Box, Button, Paper, Modal, TextField, CircularProgress, FormControl, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import useIngredient from '../composables/useIngredient';
import {Add, Delete, Save} from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import LoadingButton from '@mui/lab/LoadingButton';
import { Toaster } from 'react-hot-toast';

const paginationModel = { page: 0, pageSize: 10 };
const style = {
  maxWidth: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 6,
};
const Ingredients = () => {
  const { 
    getIngredientList, loadingIngredientList, ingredientList,
    getIngredientDetail, ingredientDetail, loadingIngredientDetail,
    addIngredient, loadingAddIngredient,
    updateIngredient, loadingUpdateIngredient,
    deleteIngredient, loadingDeleteIngredient,
  } = useIngredient();

  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalDetailOpen, setModalDetailOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null as any);
  const [ingredientFormData, setIngredientFormData] = useState({ name: '' });
  const closeModalAdd = () => { setModalAddOpen(false); setIngredientFormData({ name: '' })}
  const openModalAdd = () => setModalAddOpen(true);
  const closeModalDetail = () => { setModalDetailOpen(false); setIngredientFormData({ name: '' })}
  const openModalDetail = () => setModalDetailOpen(true);
  const closeModalDelete = () => setModalDeleteOpen(false);
  const openModalDelete = () => setModalDeleteOpen(true);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1, maxWidth: 250 },
    { field: 'name', headerName: 'Ingredient Name', flex: 1 },
    { field: 'action', headerName: 'Action', minWidth: 160, renderCell: (params) => (
      // Render a button in each row's "Action" column
      <Box sx={{display: 'flex', margin: 1}}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            getIngredientDetail(params.row.id).then(data => {
              setIngredientFormData(data as any);
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
    getIngredientList();
  }, []);

  const saveIngredient = () => {
    addIngredient(ingredientFormData);
    setIngredientFormData({ name: '' });
    closeModalAdd();
  }

  const editIngredient = () => {
    updateIngredient(selectedId, ingredientFormData);
    setIngredientFormData({ name: '' });
    closeModalDetail();
  }

  const removeIngredient = () => {
    deleteIngredient(selectedId);
    setIngredientFormData({ name: '' });
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

          <h1 style={{margin: '0.3em'}}>Ingredients</h1>
          <div><Button startIcon={<Add />} variant="contained" size='large' onClick={openModalAdd}>Add New Ingredient</Button></div>
          <Modal
            open={modalAddOpen}
            onClose={closeModalAdd}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add New Ingredient
              </Typography>
              <FormControl>
                <TextField
                  value={ingredientFormData.name}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setIngredientFormData({
                      ...ingredientFormData,
                      name: event.target.value
                    });
                  }}
                  id="name"
                  label="Ingredient Name"
                  sx={{ marginTop: 4 }}
                  required={true}
                />
                <div style={{marginTop: 20, justifySelf: 'end'}}>
                  <LoadingButton loading={loadingAddIngredient} startIcon={<Save />} variant="contained" size='medium' onClick={saveIngredient}>Save Ingredient</LoadingButton>
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
                Ingredient Detail
              </Typography>
                <TextField
                  value={ingredientFormData.name}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setIngredientFormData({
                      ...ingredientFormData,
                      name: event.target.value
                    });
                  }}
                  id="name"
                  label="Ingredient Name"
                  sx={{ marginTop: 4 }}
                  required={true}
                />
                <div style={{marginTop: 20, justifySelf: 'end'}}>
                  <LoadingButton loading={loadingUpdateIngredient} startIcon={<Save />} variant="contained" size='medium' onClick={editIngredient}>Save Ingredient</LoadingButton>
                </div>
            </Box>
          </Modal>
          <Modal
            open={modalDeleteOpen}
            onClose={closeModalDelete}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Confirm Delete Ingredient
              </Typography>
                <Typography variant="body1" component="p">
                  Are you sure you want to delete this ingredient?
                </Typography>
                <div style={{marginTop: 20, justifySelf: 'end'}}>
                  <LoadingButton loading={loadingDeleteIngredient} startIcon={<Save />} variant="contained" size='medium' onClick={removeIngredient}>Delete Ingredient</LoadingButton>
                </div>
            </Box>
          </Modal>
        </Box>
        {
        loadingIngredientList ?
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 30 }}>
            <CircularProgress size={80}/>
          </Box>
          :
          <Paper sx={{ marginTop: 4, }}>
            <DataGrid
              rows={ingredientList}
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

export default Ingredients