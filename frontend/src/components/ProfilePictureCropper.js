import { useCallback } from 'react'
import Cropper from 'react-easy-crop'
import PrimaryButton from "./buttons/PrimaryButton.js";
import Modal from "react-bootstrap/Modal";

function ProfilePictureCropper({
  profilePictureData,
  profilePictureType,
  onCropSave,
  handleCloseCropper,
  showCropper,
  zoom,
  setZoom,
  crop,
  setCrop,
  croppedAreaPixels,
  setCroppedAreaPixels
}) {


  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels)
  }, [])

  const cropImage = async () => {
    const image = new Image()
    image.src = `data:${profilePictureType};base64,${profilePictureData}`
    image.width =

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

    onCropSave(croppedAreaPixels);
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











