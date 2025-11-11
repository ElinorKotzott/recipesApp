import { useEffect, useRef } from "react";

function DrawImage({ cropParams, imageData, imageType, imageStyle, className }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!imageData || !imageType) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = `data:${imageType};base64,${imageData}`;

    img.onload = () => {
      const drawParams = cropParams
        ? (cropParams.croppedAreaPixels
            ? cropParams.croppedAreaPixels
            : {
                x: cropParams.x,
                y: cropParams.y,
                width: cropParams.width,
                height: cropParams.height
              })
        : { x: 0, y: 0, width: img.width, height: img.height };

      const zoom = cropParams?.zoom || 1;


      const destWidth = drawParams.width * zoom;
      const destHeight = drawParams.height * zoom;

      canvas.width = destWidth;
      canvas.height = destHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        drawParams.x,
        drawParams.y,
        drawParams.width,
        drawParams.height,
        0,
        0,
        destWidth,
        destHeight
      );
    };
  }, [imageData, imageType, cropParams]);

  return (
    <canvas
      ref={canvasRef}
      style={imageStyle}
      className={className}
    />
  );
}

export default DrawImage;
