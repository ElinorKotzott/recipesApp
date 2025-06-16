function SubmitButton({ children, onClick }) {
    return (
        <button type="submit" className="button" onClick={onClick}>
            {children}
        </button>
    );
}

export default SubmitButton;

