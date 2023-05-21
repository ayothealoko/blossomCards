import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./sidebar.module.scss";

interface NavProps {
  pages: NavLinkProps[];
  logo: NavImageProps["imgUrl"];
}

function Sidebar({ pages, logo }: NavProps) {
  return (
    <nav className={styles.container}>
      <NavImage imgUrl={logo} />
      <div className={styles.NavLinks_wrapper}>
        {pages.map((item, i) => {
          return <NavLink href={item.href} key={item.href} name={item.name} />;
        })}
      </div>
    </nav>
  );
}

interface NavLinkProps {
  href: string;
  name: string;
}

interface NavImageProps {
  imgUrl: string;
}

function NavLink({ href, name }: NavLinkProps) {
  const router = useRouter();

  return (
    <div
      className={clsx({
        [styles.NavLink_container]: true,
        [styles.NavLink_active]: linkPartialMatch(href, router.pathname),
      })}
    >
      <Link href={href}>{name}</Link>
    </div>
  );
}

function linkPartialMatch(href: string, route: string): boolean {
  // WARNING: Technically doesnt work with root path
  // route must at least be href length to match
  if (href.length <= route.length) {
    let hrefArr = href.split("/");
    let routeArr = route.split("/");

    let match = hrefArr
      .map((x, i) => {
        if (routeArr[i] !== undefined && x === routeArr[i]) {
          return true;
        }

        return false;
      })
      .reduce((prev, curr) => {
        return prev && curr;
      }, true);

    return match;
  }

  return false;
}

function NavImage({ imgUrl }: NavImageProps) {
  return (
    <div className={styles.NavImage_container}>
      <div className={styles.NavImage_wrapper}>
        <Image src={imgUrl} alt="logo" fill />
      </div>
    </div>
  );
}
export default Sidebar;
