import Button from "react-bootstrap/Button";

function PrimaryButton({onClick, children, className = "", type = "button"}) {
    return (
        <div className="button-container">
            <Button
                variant="primary"
                type={type}
                onClick={onClick}
                className={`primary-button ${className} w-100`}
            >
                {children}
            </Button>
        </div>
    );
}

export default PrimaryButton;
