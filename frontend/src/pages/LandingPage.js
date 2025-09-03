import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/buttons/PrimaryButton.js";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <>
      <h1>Welcome :)</h1>
      <PrimaryButton onClick={() => navigate("/login")}>Login</PrimaryButton>
      <PrimaryButton onClick={() => navigate("/register")}>
        Register
      </PrimaryButton>
    </>
  );
}

export default LandingPage;
