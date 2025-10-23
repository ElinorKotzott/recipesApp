import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import PrimaryButton from "./buttons/PrimaryButton.js";
import Modal from "react-bootstrap/Modal";

function ProfilePictureCropper({
  tempProfilePictureData,
  tempProfilePictureType,
  onCropSave,
  handleCloseCropper,
  showCropper
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels)
  }, [])

  const cropImage = async () => {
    const image = new Image()
    image.src = `data:${tempProfilePictureType};base64,${tempProfilePictureData}`

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

    const outputType = tempProfilePictureType === 'image/png' ? 'image/png' : 'image/jpeg'
    const croppedBase64 = canvas.toDataURL(outputType)
    const base64Data = croppedBase64.split(',')[1]

    onCropSave(base64Data, outputType);
  }


  return (
  <div>

      <Modal show={showCropper} onHide={handleCloseCropper}>
        <Modal.Header closeButton>
        <Modal.Title>Crop Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <div style={{ position: 'relative', height: '50vh' }}>
          <Cropper
            image={`data:${tempProfilePictureType};base64,${tempProfilePictureData}`}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />

          <div style={{
            position: 'absolute',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            zIndex: 10,
          }}>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
        </div>

        </Modal.Body>
        <Modal.Footer>
          <PrimaryButton type="button" onClick={handleCloseCropper}>
          Cancel
          </PrimaryButton>
          <PrimaryButton onClick={cropImage}>Save</PrimaryButton>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default ProfilePictureCropper











