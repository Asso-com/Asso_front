import {
  FaBox,
  FaProductHunt,
  FaTachometerAlt,
  FaUsers,
  FaChartBar,
  FaFileAlt,
  FaQuestionCircle,
  FaHome,
  FaUserGraduate,
  FaAngleDoubleRight,
  FaWallet,
  FaRegCalendarAlt,
  FaMoneyBillAlt,
  FaListAlt,
  FaGraduationCap,
  FaUsersCog,
  FaCommentDots,
  FaQuestion,
  FaRegHandshake,
  FaReceipt,
  FaBookReader,
  FaRegIdCard,
  FaCog,
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
    case "FaHome":
      return FaHome;
    case "FaUserGraduate":
      return FaUserGraduate;
    case "FaAngleDoubleRight":
      return FaAngleDoubleRight;
    case "FaWallet":
      return FaWallet;
    case "FaRegCalendarAlt":
      return FaRegCalendarAlt;
    case "FaMoneyBillAlt":
      return FaMoneyBillAlt;
    case "FaListAlt":
      return FaListAlt;
    case "FaGraduationCap":
      return FaGraduationCap;
    case "FaUsersCog":
      return FaUsersCog;
    case "FaCommentDots":
      return FaCommentDots;
    case "FaQuestion":
      return FaQuestion;
    case "FaRegHandshake":
      return FaRegHandshake;
    case "FaReceipt":
      return FaReceipt;
    case "FaBookReader":
      return FaBookReader;
    case "FaRegIdCard":
      return FaRegIdCard;
    case "FaCog":
      return FaCog;
    default:
      return AiOutlineAppstore;
  }
};

export default GetIconComponent;