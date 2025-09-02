import Button from 'react-bootstrap/Button';

function DarkButton({ onClick, children, className = "", type = "button" }) {
  return (
    <Button variant="dark" type={type} onClick={onClick}>
          {children}
    </Button>
  );
}

export default DarkButton;