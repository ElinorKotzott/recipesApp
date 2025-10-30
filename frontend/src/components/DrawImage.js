import { useEffect, useRef } from "react";

function DrawImage({ imageSource, cropParams, imageData, imageType }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!imageData || !imageType || !cropParams) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.src = `data:${imageType};base64,${imageData}`;

    img.onload = () => {
      const destWidth = cropParams.width * cropParams.zoom;
      const destHeight = cropParams.height * cropParams.zoom;

      canvas.width = destWidth;
      canvas.height = destHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(
        img,
        cropParams.x, cropParams.y, cropParams.width, cropParams.height,
        0, 0, destWidth, destHeight
      );
    };
  }, [imageData, imageType, cropParams]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        width: "100px",
        borderRadius: "50%",
        objectFit: "cover",
        margin: "1rem 0",
      }}
    />
  );
}

export default DrawImage;
