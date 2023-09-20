import Title from "../Components/Title";
import TypingEffect from "../Components/TypingEffect";
import Validation from "../Components/LoginValidation";

const Login = () => {
    return (
        <div className="titles">
            <Title title="Login page" />

            <TypingEffect
                text="Welcome back! Please login to your account."
                delay={25}
            />
            <div id="email-container" data-step-state="active">
                <Validation />
            </div>
        </div>
    );
};

export default Login;
