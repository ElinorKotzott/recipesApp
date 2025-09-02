import Button from 'react-bootstrap/Button';

function SubmitButton({ onClick, children, className = "", type = "button" }) {
  return (
    <Button variant="primary" type={type} className={`button ${className}`} onClick={onClick}>
          {children}
    </Button>
  );
}

export default SubmitButton;
