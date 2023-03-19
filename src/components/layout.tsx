import Sidebar from "./sidebar";
import Styles from "./layout.module.scss";
import Logo from "../assets/Logo.svg";
import { ReactElement } from "react";

const pages = [
  { href: "/", name: "Dashboard" },
  { href: "/decks", name: "Decks" },
  { href: "/settings", name: "Settings" },
];

function Layout({ children }): ReactElement {
  return (
    <div className={Styles.container}>
      <Sidebar pages={pages} logo={Logo} />
      <main className={Styles.main}>{children}</main>
    </div>
  );
}

export default Layout;
