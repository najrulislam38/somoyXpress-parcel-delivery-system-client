import { useTheme } from "@/hooks/useTheme";
import logo1 from "./../../assets/images/logo-1.png";
import logo2 from "./../../assets/images/logo-2.png";

export default function Logo() {
  const { theme } = useTheme();

  const logo = theme === "dark" ? logo2 : logo1;

  return <img src={logo} alt="Nav Logo" className="max-w-[186px]" />;
}
