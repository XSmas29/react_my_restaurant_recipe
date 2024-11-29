import { Typography, Box, Button, Paper, Modal, TextField, CircularProgress, FormControl, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import useCategory from '../composables/useCategory';
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
const Categories = () => {
  const { 
    getCategoryList, loadingCategoryList, categoryList,
    getCategoryDetail, categoryDetail, loadingCategoryDetail,
    addCategory, loadingAddCategory,
    updateCategory, loadingUpdateCategory,
    deleteCategory, loadingDeleteCategory,
  } = useCategory();

  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalDetailOpen, setModalDetailOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null as any);
  const [categoryFormData, setCategoryFormData] = useState({ name: '' });
  const closeModalAdd = () => { setModalAddOpen(false); setCategoryFormData({ name: '' })}
  const openModalAdd = () => setModalAddOpen(true);
  const closeModalDetail = () => { setModalDetailOpen(false); setCategoryFormData({ name: '' })}
  const openModalDetail = () => setModalDetailOpen(true);
  const closeModalDelete = () => setModalDeleteOpen(false);
  const openModalDelete = () => setModalDeleteOpen(true);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1, maxWidth: 250 },
    { field: 'name', headerName: 'Category Name', flex: 1 },
    { field: 'action', headerName: 'Action', minWidth: 160, renderCell: (params) => (
      // Render a button in each row's "Action" column
      <Box sx={{display: 'flex', margin: 1}}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            getCategoryDetail(params.row.id).then(data => {
              setCategoryFormData(data as any);
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
    getCategoryList();
  }, []);

  const saveCategory = () => {
    addCategory(categoryFormData);
    setCategoryFormData({ name: '' });
    closeModalAdd();
  }

  const editCategory = () => {
    updateCategory(selectedId, categoryFormData);
    setCategoryFormData({ name: '' });
    closeModalDetail();
  }

  const removeCategory = () => {
    deleteCategory(selectedId);
    setCategoryFormData({ name: '' });
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

          <h1 style={{margin: '0.3em'}}>Categories</h1>
          <div><Button startIcon={<Add />} variant="contained" size='large' onClick={openModalAdd}>Add New Category</Button></div>
          <Modal
            open={modalAddOpen}
            onClose={closeModalAdd}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add New Category
              </Typography>
              <FormControl>
                <TextField
                  value={categoryFormData.name}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setCategoryFormData({
                      ...categoryFormData,
                      name: event.target.value
                    });
                  }}
                  id="name"
                  label="Category Name"
                  sx={{ marginTop: 4 }}
                  required={true}
                />
                <div style={{marginTop: 20, justifySelf: 'end'}}>
                  <LoadingButton loading={loadingAddCategory} startIcon={<Save />} variant="contained" size='medium' onClick={saveCategory}>Save Category</LoadingButton>
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
                Category Detail
              </Typography>
                <TextField
                  value={categoryFormData.name}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setCategoryFormData({
                      ...categoryFormData,
                      name: event.target.value
                    });
                  }}
                  id="name"
                  label="Category Name"
                  sx={{ marginTop: 4 }}
                  required={true}
                />
                <div style={{marginTop: 20, justifySelf: 'end'}}>
                  <LoadingButton loading={loadingUpdateCategory} startIcon={<Save />} variant="contained" size='medium' onClick={editCategory}>Save Category</LoadingButton>
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
                Confirm Delete Category
              </Typography>
                <Typography variant="body1" component="p">
                  Are you sure you want to delete this category?
                </Typography>
                <div style={{marginTop: 20, justifySelf: 'end'}}>
                  <LoadingButton loading={loadingDeleteCategory} startIcon={<Save />} variant="contained" size='medium' onClick={removeCategory}>Delete Category</LoadingButton>
                </div>
            </Box>
          </Modal>
        </Box>
        {
        loadingCategoryList ?
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 30 }}>
            <CircularProgress size={80}/>
          </Box>
          :
          <Paper sx={{ marginTop: 4, }}>
            <DataGrid
              rows={categoryList}
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

export default Categories