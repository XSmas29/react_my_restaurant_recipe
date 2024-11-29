import axios from "axios";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';

function useIngredient() {
  const url = 'http://127.0.0.1:3030/api/ingredients'

  const [ingredientList, setIngredientList] = useState([] as any[]);
  const [ingredientDetail, setIngredientDetail] = useState({} as any);
  const [loadingIngredientList, setLoadingIngredientList] = useState(false);
  const [loadingAddIngredient, setLoadingAddIngredient] = useState(false);
  const [loadingUpdateIngredient, setLoadingUpdateIngredient] = useState(false);
  const [loadingIngredientDetail, setLoadingIngredientDetail] = useState(false);
  const [loadingDeleteIngredient, setLoadingDeleteIngredient] = useState(false);

  const getIngredientList = async () => {
    setLoadingIngredientList(true);
    return new Promise((resolve, reject) => {
      axios.get(url)
      .then(response => {
        resolve(response.data)
        setIngredientList(response.data)
        setLoadingIngredientList(false)
      })
      .catch(error => {
        reject(error)
        toast.error('Failed to fetch ingredient list');
        setLoadingIngredientList(false);
      });
    });
  }

  const getIngredientDetail = async (id: number) => {
    setLoadingIngredientDetail(true);
    return new Promise((resolve, reject) => {
      axios.get(`${url}/${id}`)
      .then(response => {
        resolve(response.data)
        setIngredientDetail(response.data)
        setLoadingIngredientDetail(false)
      })
      .catch(error => {
        reject(error)
        toast.error('Failed to fetch ingredient list');
        setLoadingIngredientDetail(false);
      });
    });
  }

  const addIngredient = async (ingredient_data: any) => {
    setLoadingAddIngredient(true);
    return new Promise((resolve, reject) => {
      axios.post(url, ingredient_data)
      .then(response => {
        resolve(response.data)
        toast.success('Ingredient added successfully');
        getIngredientList();
        setLoadingAddIngredient(false)
      })
      .catch(error => {
        reject(error)
        toast.error('Failed to add ingredient');
        setLoadingAddIngredient(false);
      });
    });
  }

  const updateIngredient = async (id: number, ingredient_data: any) => {
    setLoadingUpdateIngredient(true);
    return new Promise((resolve, reject) => {
      axios.put(`${url}/${id}`, ingredient_data)
      .then(response => {
        resolve(response.data)
        toast.success('Ingredient updated successfully');
        getIngredientList();
        setLoadingUpdateIngredient(false)
      })
      .catch(error => {
        reject(error)
        toast.error('Failed to update ingredient');
        setLoadingUpdateIngredient(false);
      });
    });
  }

  const deleteIngredient = async (id: number) => {
    setLoadingDeleteIngredient(true);
    return new Promise((resolve, reject) => {
      axios.delete(`${url}/${id}`)
      .then(response => {
        resolve(response.data)
        toast.success('Ingredient deleted successfully');
        getIngredientList();
        setLoadingDeleteIngredient(false)
      })
      .catch(error => {
        reject(error)
        toast.error('Failed to delete ingredient');
        setLoadingDeleteIngredient(false);
      });
    });
  }

  return { 
    ingredientList, loadingIngredientList, getIngredientList,
    loadingAddIngredient, addIngredient,
    loadingUpdateIngredient, updateIngredient,
    loadingIngredientDetail, getIngredientDetail, ingredientDetail,
    loadingDeleteIngredient, deleteIngredient,
  };
}

export default useIngredient;