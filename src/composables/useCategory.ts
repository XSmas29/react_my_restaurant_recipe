import axios from "axios";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';

function useCategory() {
  const url = 'http://127.0.0.1:3030/api/categories'

  const [categoryList, setCategoryList] = useState([] as any[]);
  const [categoryDetail, setCategoryDetail] = useState({} as any);
  const [loadingCategoryList, setLoadingCategoryList] = useState(false);
  const [loadingAddCategory, setLoadingAddCategory] = useState(false);
  const [loadingUpdateCategory, setLoadingUpdateCategory] = useState(false);
  const [loadingCategoryDetail, setLoadingCategoryDetail] = useState(false);
  const [loadingDeleteCategory, setLoadingDeleteCategory] = useState(false);

  const getCategoryList = async () => {
    setLoadingCategoryList(true);
    return new Promise((resolve, reject) => {
      axios.get(url)
      .then(response => {
        resolve(response.data)
        setCategoryList(response.data)
        setLoadingCategoryList(false)
      })
      .catch(error => {
        reject(error)
        toast.error('Failed to fetch category list');
        setLoadingCategoryList(false);
      });
    });
  }

  const getCategoryDetail = async (id: number) => {
    setLoadingCategoryDetail(true);
    return new Promise((resolve, reject) => {
      axios.get(`${url}/${id}`)
      .then(response => {
        resolve(response.data)
        setCategoryDetail(response.data)
        setLoadingCategoryDetail(false)
      })
      .catch(error => {
        reject(error)
        toast.error('Failed to fetch category list');
        setLoadingCategoryDetail(false);
      });
    });
  }

  const addCategory = async (category_data: any) => {
    setLoadingAddCategory(true);
    return new Promise((resolve, reject) => {
      axios.post(url, category_data)
      .then(response => {
        resolve(response.data)
        toast.success('Category added successfully');
        getCategoryList();
        setLoadingAddCategory(false)
      })
      .catch(error => {
        reject(error)
        toast.error('Failed to add category');
        setLoadingAddCategory(false);
      });
    });
  }

  const updateCategory = async (id: number, category_data: any) => {
    setLoadingUpdateCategory(true);
    return new Promise((resolve, reject) => {
      axios.put(`${url}/${id}`, category_data)
      .then(response => {
        resolve(response.data)
        toast.success('Category updated successfully');
        getCategoryList();
        setLoadingUpdateCategory(false)
      })
      .catch(error => {
        reject(error)
        toast.error('Failed to update category');
        setLoadingUpdateCategory(false);
      });
    });
  }

  const deleteCategory = async (id: number) => {
    setLoadingDeleteCategory(true);
    return new Promise((resolve, reject) => {
      axios.delete(`${url}/${id}`)
      .then(response => {
        resolve(response.data)
        toast.success('Category deleted successfully');
        getCategoryList();
        setLoadingDeleteCategory(false)
      })
      .catch(error => {
        reject(error)
        toast.error('Failed to delete category');
        setLoadingDeleteCategory(false);
      });
    });
  }

  return { 
    categoryList, loadingCategoryList, getCategoryList,
    loadingAddCategory, addCategory,
    loadingUpdateCategory, updateCategory,
    loadingCategoryDetail, getCategoryDetail, categoryDetail,
    loadingDeleteCategory, deleteCategory,
  };
}

export default useCategory;