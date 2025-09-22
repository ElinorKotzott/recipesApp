import {useEffect, useState} from "react";
import {request} from "../axiosHelper";
import Create from "../components/Create";
import {useNavigate} from "react-router-dom";

const CreatePage = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [prepTime, setPrepTime] = useState(0);
    const [cookingTime, setCookingTime] = useState(0);
    const [imageData, setImageData] = useState("");
    const [imageType, setImageType] = useState("");
    const [ingredientsList, setIngredientsList] = useState([]);
    const [allIngredients, setAllIngredients] = useState([]);
    const [tempIngredientsList, setTempIngredientsList] = useState([]);
    const [tempStepsList, setTempStepsList] = useState([]);
    const [tempTagsList, setTempTagsList] = useState([]);
    const [units, setUnits] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [tagsList, setTagsList] = useState([]);
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
        setTempIngredientsList((previousList) => [
            ...previousList,
            {ingredient, quantity, unit},
        ]);

    };

    const removeIngredient = (ingredientId) => {
        setTempIngredientsList((previousList) =>
            previousList.filter((item) => item.ingredient.id !== ingredientId)
        );
    };

    const saveIngredientsList = () => {
        setIngredientsList(tempIngredientsList);
    }


    const addTag = (tag) => {
        if (!tag) return;

        setTempTagsList((previousList) => {
            if (previousList.some((t) => t.id === tag.id)) {
                alert("This tag has already been added!");
                return previousList;
            }
            return [...previousList, tag];
        });
    };

    const removeTag = (tagId) => {
        setTempTagsList((previousList) =>
            previousList.filter((item) => item.id !== tagId)
        );
    };

    const saveTagsList = () => {
        setTagsList(tempTagsList);
    }

    const addStep = (step) => {
        if (!step) return;

        setTempStepsList((previousList) => {
            return [...previousList, step];
        });
    };

    const removeStep = (step) => {
        setTempStepsList((previousList) =>
            previousList.filter((item) => item !== step)
        );
    };

    const saveStepsList = () => {
        setStepsList(tempStepsList);
    }

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

        const errors = [];

        if (!title.trim()) errors.push("Title is required!");
        if (!description.trim()) errors.push("Description is required!");
        if (prepTime <= 0) errors.push("Preparation time must be greater than 0!");
        if (cookingTime <= 0) errors.push("Cooking time must be greater than 0!");
        if (servings <= 0) errors.push("Servings must be at least 1!");
        if (recipeIngredientDTOList.length === 0) errors.push("At least one ingredient is required!");
        if (stepDTOList.length === 0) errors.push("At least one step is required!");

        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
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
            tempIngredientsList={tempIngredientsList}
            setTempIngredientsList={setTempIngredientsList}
            addIngredient={addIngredient}
            removeIngredient={removeIngredient}
            saveIngredientsList={saveIngredientsList}
            allIngredients={allIngredients}
            tagsList={tagsList}
            addTag={addTag}
            removeTag={removeTag}
            tempTagsList={tempTagsList}
            setTempTagsList={setTempTagsList}
            allTags={allTags}
            saveTagsList={saveTagsList}
            units={units}
            stepsList={stepsList}
            addStep={addStep}
            removeStep={removeStep}
            tempStepsList={tempStepsList}
            setTempStepsList={setTempStepsList}
            saveStepsList={saveStepsList}
            servings={servings}
            setServings={setServings}
            isUpdate={false}
        />
    );
};

export default CreatePage;
