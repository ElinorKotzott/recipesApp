import { useState, useEffect } from "react";
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
                                cropShape
                            }) {
    const [showCropper, setShowCropper] = useState(false);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
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
            setCrop({ x: 0, y: 0 });
            setZoom(1);
            setShowCropper(true);
        };
        reader.readAsDataURL(file);
    };

    const handleCropSave = ({ croppedAreaPixels, crop, zoom }) => {
        setImageData(tempImageData);
        setImageType(tempImageType);
        setCropParams({ crop, croppedAreaPixels, zoom });
        setShowCropper(false);
    };

    const handleShowCropperFromExisting = () => {
        const crop = cropParams?.crop ?? { x: 0, y: 0 };
        const zoom = cropParams?.zoom ?? 1;
        setCrop(crop);
        setZoom(zoom);
        setShowCropper(true);
    };

    const handleCloseCropper = () => setShowCropper(false);

    return (
        <div>
            <label htmlFor="image">Profile Picture</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="form-control"/>

            {tempImageData && tempImageType && !showCropper && (
                <>
                    <DrawImage
                        cropParams={cropParams}
                        imageData={tempImageData}
                        imageType={tempImageType}
                    />
                    <PrimaryButton type="button" onClick={handleShowCropperFromExisting}>
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
