import RecipeCloseup from "../components/RecipeCloseup";
import {useEffect, useState} from "react";
import {request} from "../axiosHelper";
import {useParams} from "react-router-dom";

function RecipeCloseupPage() {
    const {id} = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const r = await request("get", `/recipes/${id}`, null, true);
                const recipeData = r.data;
                const cropInfo = recipeData.imageDTO?.cropParametersDTO;

                const cropParams = cropInfo
                    ? {
                        crop: {
                            x: cropInfo.xForCropper ?? 0,
                            y: cropInfo.yForCropper ?? 0,
                        },
                        croppedAreaPixels: {
                            x: cropInfo.x ?? 0,
                            y: cropInfo.y ?? 0,
                            width: cropInfo.width ?? 0,
                            height: cropInfo.height ?? 0,
                        },
                        zoom: cropInfo.zoom ?? 1,
                    }
                    : null;

                const renamedRecipe = {
                    ...recipeData,
                    stepsList: recipeData.stepDTOList,
                    tagsList: recipeData.tagDTOList,
                    cropParams: cropParams,
                    imageData: recipeData.imageDTO?.imageData,
                    imageType: recipeData.imageDTO?.imageType,
                };

                console.log(renamedRecipe);

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

    return <RecipeCloseup recipe={recipe}/>;

}

export default RecipeCloseupPage;
