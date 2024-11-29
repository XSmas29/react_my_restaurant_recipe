import axios from "axios";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';

function useRecipe() {
  const url = 'http://127.0.0.1:3030/api/recipes'

  const [recipeList, setRecipeList] = useState([] as any[]);
  const [recipeDetail, setRecipeDetail] = useState({} as any);
  const [loadingRecipeList, setLoadingRecipeList] = useState(false);
  const [loadingAddRecipe, setLoadingAddRecipe] = useState(false);
  const [loadingUpdateRecipe, setLoadingUpdateRecipe] = useState(false);
  const [loadingRecipeDetail, setLoadingRecipeDetail] = useState(false);
  const [loadingDeleteRecipe, setLoadingDeleteRecipe] = useState(false);

  const getRecipeList = async () => {
    setLoadingRecipeList(true);
    return new Promise((resolve, reject) => {
      axios.get(url)
      .then(response => {
        resolve(response.data)
        setRecipeList(response.data)
        setLoadingRecipeList(false)
      })
      .catch(error => {
        reject(error)
        toast.error('Failed to fetch recipe list');
        setLoadingRecipeList(false);
      });
    });
  }

  const getRecipeDetail = async (id: number) => {
    setLoadingRecipeDetail(true);
    return new Promise((resolve, reject) => {
      axios.get(`${url}/${id}`)
      .then(response => {
        resolve(response.data)
        setRecipeDetail(response.data)
        setLoadingRecipeDetail(false)
      })
      .catch(error => {
        reject(error)
        toast.error('Failed to fetch recipe list');
        setLoadingRecipeDetail(false);
      });
    });
  }

  const addRecipe = async (recipe_data: any) => {
    setLoadingAddRecipe(true);
    return new Promise((resolve, reject) => {
      axios.post(url, recipe_data)
      .then(response => {
        resolve(response.data)
        toast.success('Recipe added successfully');
        getRecipeList();
        setLoadingAddRecipe(false)
      })
      .catch(error => {
        reject(error)
        toast.error('Failed to add recipe');
        setLoadingAddRecipe(false);
      });
    });
  }

  const updateRecipe = async (id: number, recipe_data: any) => {
    setLoadingUpdateRecipe(true);
    return new Promise((resolve, reject) => {
      axios.put(`${url}/${id}`, recipe_data)
      .then(response => {
        resolve(response.data)
        toast.success('Recipe updated successfully');
        getRecipeList();
        setLoadingUpdateRecipe(false)
      })
      .catch(error => {
        reject(error)
        toast.error('Failed to update recipe');
        setLoadingUpdateRecipe(false);
      });
    });
  }

  const deleteRecipe = async (id: number) => {
    setLoadingDeleteRecipe(true);
    return new Promise((resolve, reject) => {
      axios.delete(`${url}/${id}`)
      .then(response => {
        resolve(response.data)
        toast.success('Recipe deleted successfully');
        getRecipeList();
        setLoadingDeleteRecipe(false)
      })
      .catch(error => {
        reject(error)
        toast.error('Failed to delete recipe');
        setLoadingDeleteRecipe(false);
      });
    });
  }

  return { 
    recipeList, loadingRecipeList, getRecipeList,
    loadingAddRecipe, addRecipe,
    loadingUpdateRecipe, updateRecipe,
    loadingRecipeDetail, getRecipeDetail, recipeDetail,
    loadingDeleteRecipe, deleteRecipe,
  };
}

export default useRecipe;