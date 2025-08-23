import { useEffect, useState } from "react";
import { request } from "../axiosHelper";
import Create from "../components/Create";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prepTime, setPrepTime] = useState(0);
  const [cookingTime, setCookingTime] = useState(0);
  const [imageData, setImageData] = useState("");
  const [imageType, setImageType] = useState("");
  const [ingredientsList, setIngredientsList] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);
  const [units, setUnits] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [method, setMethod] = useState("");
  const [stepsList, setStepsList] = useState([]);
  const [servings, setServings] = useState(0);
  const navigate = useNavigate();

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

  const addIngredient = (ingredientId, quantity, unit) => {
    const ingredient = allIngredients.find(
      (i) => i.id === parseInt(ingredientId)
    );
    setIngredientsList((previousList) => [
      ...previousList,
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

  const handleCreate = async (e) => {
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
    for (let i = 1; i <= stepsList.length; i++) {
      stepDTOList.push({
        stepNumber: i,
        instructionText: stepsList[i - 1].instructionText,
      });
    }

    try {
      await request(
        "post",
        "/recipes",
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
          method,
          servings,
        },
        true
      );
      navigate("/home");
      alert("Recipe created successfully!");
    } catch (error) {
      if (error.response) {
        alert("Submission failed: " + error.response.data.message);
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
      handleSubmit={handleCreate}
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
      allTags={allTags}
      units={units}
      stepsList={stepsList}
      addStep={addStep}
      removeStep={removeStep}
      method={method}
      setMethod={setMethod}
      servings={servings}
      setServings={setServings}
      isUpdate={false}
    />
  );
};

export default CreatePage;
