import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import {Logo} from "./Logo.js";
import { useRouter } from "next/router";

const hrefRoutes = [
    {
        hrefArmario: "/armario",
    },
    {
        hrefOutfits: "/outfits",
    },
    {
        hrefMarketplace: "/marketplace",
    },
];
export default function CustomNavbar() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const response = await fetch("/api/auth/logout", {
                method: "POST",
            });

            if (response.ok) {
                // apaga o token e manda para a pagina de login
                localStorage.removeItem("token");
                router.push("/auth/login");
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <Navbar position="static">
            <NavbarBrand>
                <Logo />
                <p className="font-bold text-inherit">ACME</p>
            </NavbarBrand>
            <NavbarContent className=" sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link
                        color={
                            router.pathname === hrefRoutes[0].hrefArmario ? "" : "foreground"
                        }
                        href={hrefRoutes[0].hrefArmario}
                    >
                        Armario
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        color={
                            router.pathname === hrefRoutes[0].hrefOutfits ? "" : "foreground"
                        }
                        href={hrefRoutes[1].hrefOutfits}
                    >
                        Outfits
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        color={
                            router.pathname === hrefRoutes[0].hrefMarketplace ? "" : "foreground"
                        }
                        href={hrefRoutes[2].hrefMarketplace}
                    >
                        Marketplace
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Button onClick={handleLogout} as={Link} color="danger" href="#" variant="flat">
                        LogOut
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}