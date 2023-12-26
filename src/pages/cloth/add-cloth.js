import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect } from "react";

const AddCloth = () => {
    const [categoria, setCategoria] = useState("");
    const [cor, setCor] = useState("");
    const [tamanho, setTamanho] = useState("");
    const [apiResponse, setApiResponse] = useState(null);
    const [user, setUser] = useState(null);
    const router = useRouter();

    const handleSubmit = async (event, userId) => {
        event.preventDefault();

        try {
            const res = await fetch("/api/cloth/add-cloth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ categoria, cor, tamanho, userId }),
            });
            const data = await res.json();

            console.log("---- Signup API Response ---");
            console.log(data);

            if (res.ok) {
                router.push("/armario");
            } else {
                // falhou, adicionar aviso
                console.error(data.message);
                setApiResponse(data.message);
            }
        } catch (error) {
            console.error("Ocorreu um erro:", error);
        }
    };

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    // Redirect to the login page if token is not found
                    router.push("/auth/login");
                } else {
                    const response = await fetch("/api/auth/check-auth", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const data = await response.json();
                    if (!response.ok) {
                        // Redirect to the login page if the token is invalid
                        router.push("/auth/login");
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

    return (
        <form onSubmit={(event) => handleSubmit(event, user ? user.id : null)}>
            <div>
                <input
                    type="text"
                    id="categoria"
                    placeholder="Introduza a categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    required
                />
            </div>
            <div>
                <input
                    type="text"
                    id="cor"
                    placeholder="Introduza a cor"
                    value={cor}
                    onChange={(e) => setCor(e.target.value)}
                    required
                />
            </div>
            <div>
                <input
                    type="text"
                    id="tamanho"
                    placeholder="Introduza o tamanho"
                    value={tamanho}
                    onChange={(e) => setTamanho(e.target.value)}
                    required
                />
            </div>
            <div>
                <button type="submit">Adicionar peça de roupa</button>
            </div>
        </form>
    );
};

export default AddCloth;