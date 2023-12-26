import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.css";

export default function ProfilePage() {
  const router = useRouter();
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState({ name: "", email: "" });
  const [cust, setCust] = useState({ name: "", email: "" }); //used for preventing null values on name and email

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap');
  }, []);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          // Redirect to the login page if token is not found
          router.push("/login");
        } else {
          const response = await fetch("/api/auth/check-auth", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();

          if (!response.ok) {
            // Redirect to the login page if the token is invalid
            router.push("/login");
          } else {
            // Set the user data
            setUser(data.user);
          }
        }
      } catch (error) {
        console.error("Ocorreu um erro:", error);
      }
    };

    checkAuthentication();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/users");
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error("Ocorreu um erro:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        // Clear token and redirect to the login page
        localStorage.removeItem("token");
        router.push("/login");
      } else {
        console.error("Logout falhou");
      }
    } catch (error) {
      console.error("Ocorreu um erro:", error);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const response = await fetch("/api/auth/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json",},body: JSON.stringify({
          name: "John Doe",
          email: "tugrp@example.com",
          password: "password",
        })
      });
    }
    catch (error) {
      console.error("Ocorreu um erro:", error);
    }
  }

  const handleEdit = (userId) => {
    const { id } = userId;
    router.push(`/edit-user/${id}`);
  };


  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`/api/auth/${userId}`, {
        method: 'DELETE',
      });
      const delUser = await response.json();
      if (response.ok) {
        console.log("Utilizador eliminado")
        router.reload();
        // refetch user list
      } else {
        console.error('Delete falhou');
      }
    } catch (error) {
      console.error('Ocorreu um erro:', error);
    }
  };


  return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
          <div className="container">
            <Link href="/dashboard">
              <div className="navbar-brand">Home</div>
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
                className="collapse navbar-collapse justify-content-end"
                id="navbarNavDropdown"
            >
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="profileDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                  >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        fill="currentColor"
                        className="bi bi-person-fill"
                        viewBox="0 0 16 16"
                    >
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    </svg>
                  </a>
                  <ul
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="profileDropdown"
                  >
                    <li>
                      <a
                          className="dropdown-item btn"
                          href="#"
                          onClick={handleLogout}
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container mt-5">
          <h2 className="mb-3">Lista de utilizadores</h2>
          {users ? (
              <div className="table-responsive">
                <table className="table table-dark table-hover">
                  <caption>Lista de utilizadores</caption>
                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Editar</th>
                    <th>Apagar</th>
                  </tr>
                  </thead>
                  <tbody>
                  {users.map((users) => (
                      <tr key={users.id}>
                        <td>{users.id}</td>
                        <td>{users.name}</td>
                        <td>{users.email}</td>
                        <td>
                          <button className="btn link-light" title="Edit" onClick={() => handleEdit(users)}>

                          </button>
                        </td>
                        <td>
                          <button className="btn link-light"  title="Delete" onClick={() => handleDelete(users.id)}>

                          </button>
                        </td>
                      </tr>
                  ))}
                  </tbody>
                </table>
              </div>
          ) : (
              <p>A carregar utilizadores...</p>
          )}
        </div>
        <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
        >
          <div className="modal-dialog text-black">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Apagar utilizador
                </h5>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Fechar"
                ></button>
              </div>
              <div className="modal-body">Tem certeza de que deseja excluir o utilizador?</div>
              <div className="modal-footer">
                <button
                    type="button"
                    className="btn btn-dark"
                    data-bs-dismiss="modal"
                >
                  Não
                </button>
                <button type="button" className="btn btn-primary">
                  Sim
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
