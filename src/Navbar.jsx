import { createSignal } from "solid-js";
import "./index.css";
const Navbar = () => {
  // Define state for the active link
  const [activeLink, setActiveLink] = createSignal("Home");

  // Function to handle click on nav links
  const handleNavClick = (link) => {
    setActiveLink(link);
  };

  return (
    <nav>
      <ul>
        <li
          onClick={() => handleNavClick("Home")}
          classList={{ active: activeLink() === "Home" }}
        >
          <a href="#">Home</a>
        </li>
        <li
          onClick={() => handleNavClick("About")}
          classList={{ active: activeLink() === "About" }}
        >
          <a href="#">About</a>
        </li>
        <li
          onClick={() => handleNavClick("Services")}
          classList={{ active: activeLink() === "Services" }}
        >
          <a href="#">Services</a>
        </li>
        <li
          onClick={() => handleNavClick("Contact")}
          classList={{ active: activeLink() === "Contact" }}
        >
          <a href="#">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
