import Logo from "../assets/Logo.svg";

const Navbar = () => {
  return (
    <nav className="w-full bg-white h-20 flex items-center px-28">
      <img src={Logo} alt="logo" className="w-16 h-16 object-cover" />
    </nav>
  );
};
export default Navbar;
