import {useState, useEffect} from "react";
import DrawImage from "./DrawImage";
import ImageCropper from "./ImageCropper";
import PrimaryButton from "./buttons/PrimaryButton";

function ManageImageCropper({
                                imageData,
                                imageType,
                                setImageData,
                                setImageType,
                                cropParams,
                                setCropParams,
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
        if (imageData && imageType) {
            setTempImageData(imageData);
            setTempImageType(imageType);
        }
    }, [imageData, imageType]);

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
        setImageData(tempImageData);
        setImageType(tempImageType);
        setCropParams({crop, croppedAreaPixels, zoom});
        setShowCropper(false);
    };

    const handleShowCropper = () => {
        setShowCropper(true);
    };

    const handleShowCropperFromExistingImage = () => {
        setTempImageData(imageData);
        setTempImageType(imageType);

        const crop = cropParams?.crop ?? {x: 0, y: 0};
        const zoom = cropParams?.zoom ?? 1;
        setCrop(crop);
        setZoom(zoom);
        setShowCropper(true);
    };

    const handleCloseCropper = () => {
        setTempImageData(imageData);
        setTempImageType(imageType);
        setShowCropper(false);
    };

    return (
        <div>
            <label htmlFor="image"> {labelName} </label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="form-control"/>

            {tempImageData && tempImageType && !showCropper && (
                <>
                    <DrawImage
                        cropParams={cropParams}
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
