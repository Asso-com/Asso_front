import {
  FaBox,
  FaProductHunt,
  FaTachometerAlt,
  FaUsers,
  FaChartBar,
  FaFileAlt,
  FaQuestionCircle,
} from "react-icons/fa";
import {
  FiBell,
  FiMessageSquare,
  FiSettings,
  FiShoppingCart,
} from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { IoMdHelpCircle } from "react-icons/io";

import { AiOutlineAppstore } from "react-icons/ai";

const GetIconComponent = (iconName: string) => {
  switch (iconName) {
    case "FaBox":
      return FaBox;
    case "FaProductHunt":
      return FaProductHunt;
    case "FaTachometerAlt":
      return FaTachometerAlt;
    case "FaUsers":
      return FaUsers;
    case "FaChartBar":
      return FaChartBar;
    case "FaFileAlt":
      return FaFileAlt;
    case "FaQuestionCircle":
      return FaQuestionCircle;
    case "FiShoppingCart":
      return FiShoppingCart;
    case "FiMessageSquare":
      return FiMessageSquare;
    case "FiBell":
      return FiBell;
    case "FiSettings":
      return FiSettings;
    case "MdDashboard":
      return MdDashboard;
    case "IoMdHelpCircle":
      return IoMdHelpCircle;
    default:
      return AiOutlineAppstore;
  }
};

export default GetIconComponent;
