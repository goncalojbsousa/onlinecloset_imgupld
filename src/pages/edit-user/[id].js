import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function EditUserPage() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState({ name: "", email: "" });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    // Fetch the user data based on the ID from the query parameter
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/auth/${id}`);
        const data = await response.json();
        console.log("----User Details---", data);
        setUser(data.user);
      } catch (error) {
        console.error("Ocurreu um erro:", error);
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    // verifica se as senhas introduzidas coincidem
    if (password !== confirmPassword) {
      setPasswordMatch(false);
      setApiResponse("As senhas não coincidem");
      return;
    }
    
    // recuperar os dados atualizados do usuário nos campos do formulário
    const formData = new FormData(event.target);
    const updatedUser = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      // outros campos...
    };

    try {
      // enviar os dados atualizados do user ao servidor para processamento
      const response = await fetch(`/api/auth/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        console.log("usuario atualizado");
        alert("User updated successfully");
        router.push("/profile"); // manda para a pagina de perfil
      } else {
        console.error("Update falhou");
      }
    } catch (error) {
      console.error("Ocurreu um erro:", error);
    }
  };

  if (!user) {
    return <p>Loading user...</p>;
  }

  return (
    <div className="container">
      {apiResponse && (
          <div className="alert alert-primary" role="alert">
            {apiResponse}
          </div>
        )}
        <div className="d-flex justify-content-center">
          <div className="card w-50 bg-transparent">
            <div className="card-body">
              <h2 className="card-title">Atualizar perfil</h2><br/>
              <form onSubmit={handleFormSubmit} className="was-validated">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control bg-transparent text-white"
                    id="name"
                    name="name"
                    placeholder="Introduza o seu nome"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    required
                  />
                  <div className="invalid-feedback">{}</div>
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control bg-transparent text-white"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    disabled
                  />
                  <div className="invalid-feedback">{}</div>
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control bg-transparent text-white"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Atualizar senha"
                    required
                  />
                  <div className="invalid-feedback">{}</div>
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control bg-transparent text-white"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirmar senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <div className="invalid-feedback">{!passwordMatch && <p>Passwords do not match</p>}</div>
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-primary" type="submit">
                    Atualizar
                  </button>
                  <button className="btn btn-dark" type="button">
                    <Link href='/profile'>Cancelar</Link>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}