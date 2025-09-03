import { useEffect, useState } from "react";
import { request } from "../axiosHelper";
import Create from "../components/Create";
import { useNavigate, useParams } from "react-router-dom";

const UpdateRecipePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prepTime, setPrepTime] = useState(0);
  const [cookingTime, setCookingTime] = useState(0);
  const [imageData, setImageData] = useState("");
  const [imageType, setImageType] = useState("");
  const [ingredientsList, setIngredientsList] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [stepsList, setStepsList] = useState([]);
  const [units, setUnits] = useState([]);
  const [servings, setServings] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ingredientsResponse, unitsResponse, tagsResponse] =
          await Promise.all([
            request("get", "/ingredients", null, true),
            request("get", "/units", null, true),
            request("get", "/tags", null, true),
          ]);
        setAllIngredients(ingredientsResponse.data);
        setUnits(unitsResponse.data);
        setAllTags(tagsResponse.data);
      } catch (error) {
        console.error("Failed to load ingredients, units or tags:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await request("get", `/recipes/${id}`, null, true);
        const recipe = response.data;

        setTitle(recipe.title);
        setDescription(recipe.description);
        setPrepTime(recipe.prepTime);
        setCookingTime(recipe.cookingTime);
        setImageData(recipe.imageData);
        setImageType(recipe.imageType);
        setServings(recipe.servings);

        if (recipe.recipeIngredientDTOList) {
          const mappedIngredients = recipe.recipeIngredientDTOList.map(
            (item) => ({
              ingredient: {
                id: item.ingredientDTO.id,
                name: item.ingredientDTO.name,
              },
              quantity: item.quantity,
              unit: item.unit,
            })
          );
          setIngredientsList(mappedIngredients);
        } else {
          setIngredientsList([]);
        }

        if (recipe.tagDTOList) {
          setTagsList(recipe.tagDTOList);
        } else {
          setTagsList([]);
        }

        if (recipe.stepDTOList) {
          setStepsList(recipe.stepDTOList);
        } else {
          setStepsList([]);
        }

      } catch (error) {
        alert("Failed to load recipe");
        navigate(-1);
      }
    };

    fetchRecipe();
  }, [id, navigate]);

  const addIngredient = (ingredientId, quantity, unit) => {
    const ingredient = allIngredients.find(
      (i) => i.id === parseInt(ingredientId)
    );
    setIngredientsList((myPreviousList) => [
      ...myPreviousList,
      { ingredient, quantity, unit },
    ]);
  };

  const removeIngredient = (ingredientId) => {
    setIngredientsList((previousList) =>
      previousList.filter((item) => item.ingredient.id !== ingredientId)
    );
  };

  const addTag = (tag) => {
    if (!tag) return;

    setTagsList((previousList) => {
      if (previousList.some((t) => t.id === tag.id)) {
        alert("This tag has already been added!");
        return previousList;
      }
      return [...previousList, tag];
    });
  };

  const removeTag = (tagId) => {
    setTagsList((previousList) =>
      previousList.filter((item) => item.id !== tagId)
    );
  };

  const addStep = (step) => {
      if (!step) return;

      setStepsList((previousList) => {
        return [...previousList, step];
      });
    };

  const removeStep = (step) => {
    setStepsList((previousList) =>
      previousList.filter((item) => item !== step)
    );
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const recipeIngredientDTOList = ingredientsList.map((item) => ({
      ingredientDTO: {
        id: item.ingredient.id,
        name: item.ingredient.name,
      },
      quantity: item.quantity,
      unit: item.unit,
    }));

    let stepDTOList = [];
        for (let i = 0; i < stepsList.length; i++) {
          stepDTOList.push({
            id: stepsList[i].id,
            stepNumber: i + 1,
            instructionText: stepsList[i].instructionText,
          });
        }

    try {
      await request(
        "put",
        `/recipes/${id}`,
        {
          title,
          description,
          prepTime,
          cookingTime,
          imageData,
          imageType,
          recipeIngredientDTOList,
          tagDTOList: tagsList,
          stepDTOList,
          servings,
        },
        true
      );
      alert("Recipe updated successfully!");
      navigate(`/recipes/${id}`);
    } catch (error) {
      if (error.response) {
        alert("Update failed: " + error);
      } else {
        alert("Error: " + error.message);
      }
    }
  };

  return (
    <Create
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      prepTime={prepTime}
      setPrepTime={setPrepTime}
      cookingTime={cookingTime}
      setCookingTime={setCookingTime}
      handleSubmit={handleUpdate}
      imageData={imageData}
      setImageData={setImageData}
      imageType={imageType}
      setImageType={setImageType}
      ingredientsList={ingredientsList}
      addIngredient={addIngredient}
      removeIngredient={removeIngredient}
      allIngredients={allIngredients}
      tagsList={tagsList}
      addTag={addTag}
      removeTag={removeTag}
      stepsList={stepsList}
      addStep={addStep}
      removeStep={removeStep}
      allTags={allTags}
      units={units}
      servings={servings}
      setServings={setServings}
      isUpdate={true}
    />
  );
};

export default UpdateRecipePage;
