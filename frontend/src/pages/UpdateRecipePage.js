import {useEffect, useState} from "react";
import {request} from "../axiosHelper";
import Create from "../components/Create";
import {useNavigate, useParams} from "react-router-dom";

const UpdateRecipePage = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [prepTime, setPrepTime] = useState(0);
    const [cookingTime, setCookingTime] = useState(0);
    const [imageData, setImageData] = useState("");
    const [imageType, setImageType] = useState("");
    const [recipeIngredientList, setRecipeIngredientList] = useState([]);
    const [allIngredients, setAllIngredients] = useState([]);
    const [tempRecipeIngredientList, setTempRecipeIngredientList] = useState([]);
    const [tempStepListUI, setTempStepListUI] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [tagList, setTagList] = useState([]);
    const [stepListUI, setStepListUI] = useState([]);
    const [units, setUnits] = useState([]);
    const [servings, setServings] = useState(0);
    const [allDifficulties, setAllDifficulties] = useState([]);
    const [difficulty, setDifficulty] = useState("");
    const [cropParams, setCropParams] = useState(null);

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


    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await request("get", `/recipes/${id}`, null, true);
                const recipe = response.data;
                const cropInfo = response.data.image?.cropParameters;

                setTitle(recipe.title);
                setDescription(recipe.description);
                setPrepTime(recipe.prepTime);
                setCookingTime(recipe.cookingTime);
                setImageData(response.data.image?.imageData);
                setImageType(response.data.image?.imageType);
                if (cropInfo) {
                    setCropParams({
                        crop: {
                            x: cropInfo.xForCropper ?? 0,
                            y: cropInfo.yForCropper ?? 0
                        },
                        croppedAreaPixels: {
                            x: cropInfo.x ?? 0,
                            y: cropInfo.y ?? 0,
                            width: cropInfo.width ?? 0,
                            height: cropInfo.height ?? 0
                        },
                        zoom: cropInfo.zoom ?? 1
                    });
                }

                setServings(recipe.servings);
                setDifficulty(recipe.difficulty);

                //is this following mapping needed or does it produce the exact same structure again

                if (recipe.recipeIngredientList) {
                    const mappedIngredients = recipe.recipeIngredientList.map(
                        (item) => ({
                            ingredient: {
                                id: item.ingredient.id,
                                name: item.ingredient.name,
                            },
                            quantity: item.quantity,
                            unit: item.unit,
                        })
                    );
                    setRecipeIngredientList(mappedIngredients);
                } else {
                    setRecipeIngredientList([]);
                }

                if (recipe.tagList) {
                    setTagList(recipe.tagList);
                } else {
                    setTagList([]);
                }

                if (recipe.stepList) {
                    setStepListUI(recipe.stepList);
                } else {
                    setStepListUI([]);
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

    const saveStepsList = () => {
        setStepListUI(tempStepListUI);
    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        let stepList = [];
        for (let i = 0; i < stepListUI.length; i++) {
            stepList.push({
                id: stepListUI[i].id,
                stepNumber: i + 1,
                instructionText: stepListUI[i].instructionText,
            });
        }

        const errors = [];

        if (!title.trim()) errors.push("Title is required!");
        if (!description.trim()) errors.push("Description is required!");
        if (prepTime <= 0) errors.push("Preparation time must be greater than 0!");
        if (cookingTime <= 0) errors.push("Cooking time must be greater than 0!");
        if (servings <= 0) errors.push("Servings must be at least 1!");
        if (recipeIngredientList.length === 0) errors.push("At least one ingredient is required!");
        if (stepList.length === 0) errors.push("At least one step is required!");
        if (!difficulty) errors.push("Please select a difficulty!");
        if (title.length > 30) errors.push("Title must be less than 30 characters long!");

        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
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
                    recipeIngredientList,
                    tagList,
                    stepList,
                    servings,
                    difficulty,
                    image: {
                        imageData: imageData,
                        imageType: imageType,
                        cropParameters: cropParams ? {
                            x: cropParams.croppedAreaPixels.x,
                            y: cropParams.croppedAreaPixels.y,
                            width: cropParams.croppedAreaPixels.width,
                            height: cropParams.croppedAreaPixels.height,
                            zoom: cropParams.zoom,
                            xForCropper: cropParams.crop?.x ?? 0,
                            yForCropper: cropParams.crop?.y ?? 0
                        } : null
                    }
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
            recipeIngredientList={recipeIngredientList}
            addIngredient={addIngredient}
            removeIngredient={removeIngredient}
            saveRecipeIngredientList={saveRecipeIngredientList}
            tempRecipeIngredientList={tempRecipeIngredientList}
            setTempRecipeIngredientList={setTempRecipeIngredientList}
            allIngredients={allIngredients}
            tagList={tagList}
            setTagList={setTagList}
            addTag={addTag}
            removeTag={removeTag}
            stepListUI={stepListUI}
            addStep={addStep}
            removeStep={removeStep}
            tempStepListUI={tempStepListUI}
            setTempStepListUI={setTempStepListUI}
            saveStepsList={saveStepsList}
            allTags={allTags}
            units={units}
            servings={servings}
            setServings={setServings}
            allDifficulties={allDifficulties}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            isUpdate={true}
            cropParams={cropParams}
            setCropParams={setCropParams}
        />
    );
};

export default UpdateRecipePage;
