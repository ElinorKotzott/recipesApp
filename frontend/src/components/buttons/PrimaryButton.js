import Button from 'react-bootstrap/Button';

function PrimaryButton({ onClick, children, className = "", type = "button"}) {
  return (
    <Button style={{ margin: "10px 0" }} variant="primary" type={type} onClick={onClick} className={className}>
          {children}
    </Button>
  );
}

export default PrimaryButton;