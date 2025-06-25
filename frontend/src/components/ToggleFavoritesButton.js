import SubmitButton from './SubmitButton.js';

function AddToFavoritesButton() {
    const toggleFavs = () => {

    };

    return (
        <SubmitButton onClick={toggleFavs}>
            Add or remove from favs
        </SubmitButton>
    );
}

export default ToggleFavoritesButton;