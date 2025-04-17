import { useLocation, Link } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import LogoImage from "/logomarca.png";
import { useState, useEffect } from "react";
import { getMenuByRole } from "../utils/menu";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";

export default function Sidebar({ isOpen, onClose }) {
  const theme = useTheme();
  const location = useLocation();
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const currentPath = location.pathname;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("dataUser"));
    const role = user.user.role;
    const filteredMenu = getMenuByRole(role);
    setMenuItems(filteredMenu);

    const activeMenu = filteredMenu.find(item =>
      item.subItems?.some(sub => sub.path === currentPath)
    );
    if (activeMenu) {
      setExpandedMenu(activeMenu.path);
    }
  }, [currentPath]);

  const toggleMenu = (menuPath) => {
    setExpandedMenu(prev => (prev === menuPath ? null : menuPath));
  };

  return (
    <>
      <Overlay onClick={onClose} $isOpen={isOpen} $bgColor={theme.primary} />
      <SidebarContainer $isOpen={isOpen}>
        <LogoWrapper>
          <img src={LogoImage} alt="Logo" />
        </LogoWrapper>
        <ul>
          {
            menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.path}>
                  <NavItem
                    selected={currentPath.startsWith(item.path)}
                    onClick={() => item.subItems ? toggleMenu(item.path) : null}
                  >
                    <span style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ display: "flex", alignItems: "center" }}>
                        {Icon && <Icon style={{ marginRight: 8 }} />}
                        {item.label}
                      </span>
                      {item.subItems && (
                        expandedMenu === item.path ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />
                      )}
                    </span>
                  </NavItem>

                  {item.subItems && expandedMenu === item.path && (
                    item.subItems.map((sub) => {
                      const SubIcon = sub.icon;
                      return (
                        <SubItem
                          key={sub.path}
                          selected={currentPath === sub.path}
                        >
                          <Link to={sub.path}>
                            {SubIcon && <SubIcon style={{ marginRight: 8 }} />}
                            {sub.label}
                          </Link>
                        </SubItem>
                      );
                    })
                  )}
                </div>
              );
            })
          }
        </ul>
      </SidebarContainer>
    </>
  );
}

const StyledLink = styled(Link)`
  color: ${({ selected, theme }) => (selected ? theme.colors.primary : "#fff")};
  text-decoration: none;
  display: block;
  width: 100%;
  height: 100%;
`;

const SidebarContainer = styled.aside`
  width: 240px;
  height: 100vh;
  background-color: #111;
  color: white;
  padding: 1rem;
  position: fixed;
  top: 0;
  left: ${({ $isOpen }) => ($isOpen ? "0" : "-260px")};
  transition: left 0.3s ease;
  z-index: 1001;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);

  ul {
    list-style: none;
    padding: 0;
  }

  @media (min-width: 768px) {
    position: relative;
    left: 0;
    z-index: auto;
  }
`;

const NavItem = styled.li`
  margin: 1rem 0;
  font-weight: bold;
  border-radius: 8px;
  background-color: ${({ selected, theme }) => selected ? theme.primary : "transparent"};
  padding: 0.5rem 1rem;
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme, selected }) => !selected && "#1a1a1a"};
  }
`;

const SubItem = styled.div`
  margin-left: 1rem;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  background-color: ${({ selected, theme }) => selected ? theme.primary : "transparent"};
  color: ${({ selected, theme }) => (selected ? theme.colors.primary : "#fff")};
  cursor: pointer;
  transition: background-color 0.2s;

  a {
    color: inherit;
    text-decoration: none;
    display: block;
  }

  &:hover {
    background-color: #1a1a1a;
    color: #fff;
  }
`;

const LogoWrapper = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  img {
    max-width: 120px;
    height: auto;
  }
`;

const Overlay = styled.div`
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ $bgColor }) => $bgColor || "rgba(0, 0, 0, 0.4)"};
  z-index: 1000;

  @media (min-width: 768px) {
    display: none;
  }
`;
