import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'

function ProfilePictureCropper({
  profilePictureData,
  profilePictureType,
  setIsCropping,
  setProfilePictureData,
  setProfilePictureType,
  onCropSave
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels)
  }, [])

  const cropImage = async () => {
    const image = new Image()
    image.src = `data:${profilePictureType};base64,${profilePictureData}`

    await new Promise((resolve) => (image.onload = resolve))

    const canvas = document.createElement('canvas')
    canvas.width = croppedAreaPixels.width
    canvas.height = croppedAreaPixels.height

    const ctx = canvas.getContext('2d')
    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    )
    console.log(croppedAreaPixels)

    const outputType = profilePictureType === 'image/png' ? 'image/png' : 'image/jpeg'
    const croppedBase64 = canvas.toDataURL(outputType)
    const base64Data = croppedBase64.split(',')[1]

    onCropSave(base64Data, outputType);

  }

  return (
    <div style={{ position: 'relative', height: '50vh' }}>
      <Cropper
        image={`data:${profilePictureType};base64,${profilePictureData}`}
        crop={crop}
        zoom={zoom}
        aspect={1}
        cropShape="round"
        showGrid={false}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
      />

      <div
        style={{
          position: 'absolute',
          bottom: 10,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
        }}
      >
        <input
          type="range"
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
        />
        <button type="button" onClick={cropImage}>Save</button>
        <button type="button" onClick={() => setIsCropping(false)}>Cancel</button>

      </div>
    </div>
  )
}

export default ProfilePictureCropper
