function SubmitButton({ onClick, children, className = '' }) {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default SubmitButton;