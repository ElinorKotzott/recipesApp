import {useEffect, useState} from "react";
import DrawImage from "./DrawImage";
import ImageCropper from "./ImageCropper";
import PrimaryButton from "./buttons/PrimaryButton";

function ManageImageCropper({
                                imageOwner,
                                onSaveImage,
                                aspect,
                                cropShape,
                                imageStyle,
                                labelName
                            }) {
    const [showCropper, setShowCropper] = useState(false);
    const [crop, setCrop] = useState({x: 0, y: 0});
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [tempImageData, setTempImageData] = useState("");
    const [tempImageType, setTempImageType] = useState("");

    useEffect(() => {
        if (imageOwner?.image?.imageData && imageOwner?.image?.imageType) {
            setTempImageData(imageOwner.image.imageData);
            setTempImageType(imageOwner.image.imageType);
        }
    }, [imageOwner?.image?.imageData, imageOwner?.image?.imageType]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result.split(",")[1];
            setTempImageData(base64);
            setTempImageType(file.type);
            setCrop({x: 0, y: 0});
            setZoom(1);
            handleShowCropper();
        };
        reader.readAsDataURL(file);
    };

    const handleCropSave = ({croppedAreaPixels, crop, zoom}) => {
        const imageObj = {
            imageData: tempImageData,
            imageType: tempImageType,
            cropParameters: {
                x: croppedAreaPixels.x,
                y: croppedAreaPixels.y,
                width: croppedAreaPixels.width,
                height: croppedAreaPixels.height,
                xForCropper: crop.x,
                yForCropper: crop.y,
                zoom
            }
        };

        onSaveImage(imageObj);

        setShowCropper(false);
    };


    const handleShowCropper = () => {
        setShowCropper(true);
    };

    const handleShowCropperFromExistingImage = () => {
        setTempImageData(imageOwner.image.imageData);
        setTempImageType(imageOwner.image.imageType);

        const cp = imageOwner?.image?.cropParameters;

        const initialCrop = cp
            ? {x: cp.xForCropper, y: cp.yForCropper}
            : {x: 0, y: 0};

        const initialZoom = imageOwner?.image?.cropParameters?.zoom ?? 1;
        setCrop(initialCrop);
        setZoom(initialZoom);
        setShowCropper(true);
    };

    const handleCloseCropper = () => {
        setTempImageData(imageOwner.image.imageData);
        setTempImageType(imageOwner.image.imageType);
        setShowCropper(false);
    };

    return (
        <div>
            <label htmlFor="image"> {labelName} </label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="form-control w-25"/>

            {tempImageData && tempImageType && !showCropper && (
                <>
                    <DrawImage
                        cropParameters={imageOwner.image.cropParameters}
                        imageData={tempImageData}
                        imageType={tempImageType}
                        imageStyle={imageStyle}
                    />
                    <PrimaryButton type="button" onClick={handleShowCropperFromExistingImage}>
                        Edit Crop
                    </PrimaryButton>
                </>
            )}

            {tempImageData && tempImageType && showCropper && (
                <ImageCropper
                    tempImageData={tempImageData}
                    tempImageType={tempImageType}
                    crop={crop}
                    setCrop={setCrop}
                    zoom={zoom}
                    setZoom={setZoom}
                    croppedAreaPixels={croppedAreaPixels}
                    setCroppedAreaPixels={setCroppedAreaPixels}
                    showCropper={showCropper}
                    handleShowCropper={handleShowCropper}
                    handleCloseCropper={handleCloseCropper}
                    onCropSave={handleCropSave}
                    aspect={aspect}
                    cropShape={cropShape}
                />
            )}
        </div>
    );
}

export default ManageImageCropper;
