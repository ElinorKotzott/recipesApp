import Button from 'react-bootstrap/Button';

function PrimaryButton({ onClick, children, className = "", type = "button" }) {
  return (
    <Button variant="primary" type={type} onClick={onClick}>
          {children}
    </Button>
  );
}

export default PrimaryButton;