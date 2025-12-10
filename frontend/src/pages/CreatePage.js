import {useEffect, useState} from "react";
import {request} from "../axiosHelper";
import Create from "../components/Create";
import {useNavigate} from "react-router-dom";

const CreatePage = () => {
    const [recipe, setRecipe] = useState({
        title: "",
        description: "",
        prepTime: 0,
        cookingTime: 0,
        servings: 0,
        difficulty: "",
        image: {
            imageData: "",
            imageType: "",
            cropParameters: null
        }
    });

    const [allDifficulties, setAllDifficulties] = useState([]);
    const [allIngredients, setAllIngredients] = useState([]);
    const [tempRecipeIngredientList, setTempRecipeIngredientList] = useState([]);
    const [tempStepListUI, setTempStepListUI] = useState([]);
    const [units, setUnits] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [stepListUI, setStepListUI] = useState([]);
    const [recipeIngredientList, setRecipeIngredientList] = useState([]);
    const [tagList, setTagList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const [ingredientsResponse, unitsResponse, tagsResponse, difficultyResponse] = await Promise.all([
                    request("get", "/ingredients", null, true),
                    request("get", "/units", null, true),
                    request("get", "/tags", null, true),
                    request("get", "/difficulty", null, true)
                ]);
                setAllIngredients(ingredientsResponse.data);
                setUnits(unitsResponse.data);
                setAllTags(tagsResponse.data);
                setAllDifficulties(difficultyResponse.data);
            } catch (error) {
                console.error("Failed to load ingredients, units, difficulty or tags:", error);
            }
        })();
    }, []);


    const addIngredient = (ingredientId, quantity, unit) => {
        const ingredient = allIngredients.find(
            (i) => i.id === parseInt(ingredientId)
        );
        setTempRecipeIngredientList((previousList) => [
            ...previousList,
            {ingredient, quantity, unit},
        ]);
    };

    const removeIngredient = (ingredientId) => {
        setTempRecipeIngredientList((previousList) =>
            previousList.filter((item) => item.ingredient.id !== ingredientId)
        );
    };

    const saveRecipeIngredientList = () => {
        setRecipeIngredientList(tempRecipeIngredientList);
    }


    const addTag = (tag) => {
        if (!tag) return;

        setTagList((previousList) => {
            if (previousList.some((t) => t.id === tag.id)) {
                alert("This tag has already been added!");
                return previousList;
            }
            return [...previousList, tag];
        });
    };

    const removeTag = (tagId) => {
        setTagList((previousList) =>
            previousList.filter((item) => item.id !== tagId)
        );
    };

    const addStep = (step) => {
        if (!step) {
            alert("Please add text to your step!");
            return;
        }

        setTempStepListUI((previousList) => {
            return [...previousList, step];
        });
    };

    const removeStep = (step) => {
        setTempStepListUI((previousList) =>
            previousList.filter((item) => item !== step)
        );
    };

    const saveStepListUI = () => {
        setStepListUI(tempStepListUI);
    }

    const handleCreate = async (e) => {
            e.preventDefault();

            let stepList = [];
            for (let i = 1; i <= stepListUI.length; i++) {
                stepList.push({
                    stepNumber: i,
                    instructionText: stepListUI[i - 1].instructionText,
                });
            }

            const errors = [];

            if (!recipe.title.trim()) errors.push("Title is required!");
            if (!recipe.description.trim()) errors.push("Description is required!");
            if (recipe.prepTime <= 0) errors.push("Preparation time must be greater than 0!");
            if (recipe.cookingTime <= 0) errors.push("Cooking time must be greater than 0!");
            if (recipe.servings <= 0) errors.push("Servings must be at least 1!");
            if (recipeIngredientList.length === 0) errors.push("At least one ingredient is required!");
            if (stepList.length === 0) errors.push("At least one step is required!");
            if (!recipe.difficulty) errors.push("Please select a difficulty!");
            if (recipe.title.length > 30) errors.push("Title must be less than 30 characters long!");

            if (errors.length > 0) {
                alert(errors.join("\n"));
                return;
            }

            try {
                console.log(recipe);
                await request(
                    "post",
                    "/recipes",
                    {
                        ...recipe,
                        recipeIngredientList,
                        tagList,
                        stepList
                    },
                    true
                );
                navigate("/home");
                alert("Recipe created successfully!");
            } catch
                (error) {
                if (error.response) {
                    alert("Submission failed: " + error.response.data.message);
                } else {
                    alert("Error: " + error.message);
                }
            }
        }
    ;

    return (
        <Create
            recipe={recipe}
            setRecipe={setRecipe}
            handleSubmit={handleCreate}
            recipeIngredientList={recipeIngredientList}
            tempRecipeIngredientList={tempRecipeIngredientList}
            setTempRecipeIngredientList={setTempRecipeIngredientList}
            addIngredient={addIngredient}
            removeIngredient={removeIngredient}
            saveRecipeIngredientList={saveRecipeIngredientList}
            allIngredients={allIngredients}
            tagList={tagList}
            setTagList={setTagList}
            addTag={addTag}
            removeTag={removeTag}
            allTags={allTags}
            units={units}
            stepListUI={stepListUI}
            addStep={addStep}
            removeStep={removeStep}
            tempStepListUI={tempStepListUI}
            setTempStepListUI={setTempStepListUI}
            saveStepListUI={saveStepListUI}
            allDifficulties={allDifficulties}
            isUpdate={false}
        />
    );
};

export default CreatePage;
