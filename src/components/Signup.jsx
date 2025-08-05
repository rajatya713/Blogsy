import React, { use, useState } from "react";
import authService from "../appwrite/auth";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../store/authSlice";
import Button from "./Button";
import Input from "./Input";
import Logo from "./Logo";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit } = useForm();

  const signup = async (data) => {
    setError("");
    setLoading(true)
    try {
      const userData = await authService.signup(data);
      if (userData) {
        const currUser = await authService.getCurrentUser();
        if (currUser) {
          dispatch(login(currUser));
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message || "Something went wrong!!");
    }
    finally {
      setLoading(false)
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#F3E9DC]">
      <div className="mx-auto w-full max-w-lg bg-[#F0E4D3] rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Signup to create an account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign in
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(signup)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Full Name: "
              type="text"
              placeholder="Enter your Full Name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter your Email "
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password:"
              type="password"
              placeholder="Enter your Password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ?  "Creating..." : "Create Account"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
