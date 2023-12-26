import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const router = useRouter();
  const validateForm = () => {
    let isValid = true;

    if (!name) {
      setNameError("Por favor, insira seu nome");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!/^[a-zA-Z\s]*$/.test(name)) {
      setNameError("O seu nome apenas pode conter letras e espaços");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Por favor insira a sua senha");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!/(?=.*\d)(?=.*[A-Z]).{6,}/.test(password)) {
      setPasswordError(
        "A senha deve ter pelo menos 6 caracteres e conter pelo menos uma letra maiúscula e um número"
      );
      isValid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("As senhas não coincidem");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setEmailError("Por favor insira um e-mail válido");
      isValid = false;
    } else {
      setEmailError("");
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
/*
    console.log("----- Form Submitted ------");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
*/
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    console.log("---- Signup API Response ---");
    console.log(data);
    if (res.ok) {
      // registro feito
      const { token } = data;
      // armazenar o token
      localStorage.setItem('token', token);

      // Redirecionar para dashboard
      router.push('/dashboard');
    } else {
      // registro falhow, adicionar aviso **********************
      console.error(data.message);
      setApiResponse(data.message);
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <div className="card w-50 bg-transparent">
          <div className="card-body">
            <h1 className="card-title p-4">Sign Up</h1>
            <form onSubmit={handleSubmit} className="was-validated">
              {apiResponse && (
                <div className="alert alert-danger" role="alert">
                  {apiResponse}
                </div>
              )}
              <div className="mb-3">
                <input
                  type="text"
                  className={`form-control p-3 fs-5 bg-transparent text-white ${
                    nameError ? "is-invalid" : ""
                  }`}
                  id="name"
                  placeholder="Introduza o seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                {nameError && <div className="invalid-feedback">{nameError}</div>}
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className={`form-control p-3 fs-5 bg-transparent text-white ${
                    emailError ? "is-invalid" : ""
                  }`}
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {emailError && <div className="invalid-feedback">{emailError}</div>}
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className={`form-control p-3 fs-5 bg-transparent text-white ${
                    passwordError ? "is-invalid" : ""
                  }`}
                  id="password"
                  placeholder="Introduza a senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {passwordError && (
                  <div className="invalid-feedback">{passwordError}</div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className={`form-control p-3 fs-5 bg-transparent text-white ${
                    confirmPasswordError ? "is-invalid" : ""
                  }`}
                  id="confirmPassword"
                  placeholder="Confirme sua senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {confirmPasswordError && (
                  <div className="invalid-feedback">{confirmPasswordError}</div>
                )}
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-primary p-2 fs-5 w-50" type="submit">
                  Sign Up
                </button>
                <Link className="btn btn-danger p-2 fs-5 w-50" href="/auth/login">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
