import RecipeCloseup from "../components/RecipeCloseup";
import { useEffect, useState } from "react";
import { request } from "../axiosHelper";
import { useParams } from "react-router-dom";

function RecipeCloseupPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const r = await request("get", `/recipes/${id}`);
        const recipeData = r.data;

        const renamedRecipe = {
          ...recipeData,
          stepsList: recipeData.stepDTOList,
          tagsList: recipeData.tagDTOList
        };

        setRecipe(renamedRecipe);
      } catch {
        setRecipe(null);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <p>Recipe not found!</p>;
  }

  return <RecipeCloseup recipe={recipe} />;

}

export default RecipeCloseupPage;
