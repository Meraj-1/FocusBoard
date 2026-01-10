import Signup from "../auth/Signup";
import Login from "../auth/Login";

export default function Home() {
  return (
    <div className="flex gap-10 justify-center mt-20">
      <Signup />
      <Login />
    </div>
  );
}
