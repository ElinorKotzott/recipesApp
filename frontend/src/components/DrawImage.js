import {useEffect, useRef} from "react";

function DrawImage({cropParameters, imageData, imageType, imageStyle, className}) {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!imageData || !imageType) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.src = `data:${imageType};base64,${imageData}`;

        img.onload = () => {
            const zoom = cropParameters?.zoom || 1;


            const destWidth = cropParameters.width * zoom;
            const destHeight = cropParameters.height * zoom;

            canvas.width = destWidth;
            canvas.height = destHeight;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(
                img,
                cropParameters.x,
                cropParameters.y,
                cropParameters.width,
                cropParameters.height,
                0,
                0,
                destWidth,
                destHeight
            );
        };
    }, [imageData, imageType, cropParameters]);

    return (
        <canvas
            ref={canvasRef}
            style={imageStyle}
            className={className}
        />
    );
}

export default DrawImage;
