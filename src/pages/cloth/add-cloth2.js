import {useRouter} from "next/router";
import Link from "next/link";
import { useState } from "react";
import React, { useEffect } from 'react';

const addCloth = () => {
        const router = useRouter();

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
        <form>
            <div>
                <input
                    type="text"
                    id="categoria"
                    placeholder="Introduza a categoria"

                    required
                />
            </div>
            <div>
                <input
                    type="text"
                    id="cor"
                    placeholder="Introduza a cor"

                    required
                />
            </div>
            <div>
                <input
                    type="text"
                    id="tamanho"
                    placeholder="Introduza o tamanho"

                    required
                />
            </div>
            <div>
                <button type="submit">Adicionar peça de roupa</button>
            </div>
        </form>
    )

}
export default addCloth;