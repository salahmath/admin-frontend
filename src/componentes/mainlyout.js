import React, { useState } from "react";
import "./mainlyout.css";
import { MdAdminPanelSettings  } from "react-icons/md";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CiLogout } from "react-icons/ci";
import { RxDashboard, RxColorWheel } from "react-icons/rx";
import { GrCatalog } from "react-icons/gr";
import { RiProductHuntLine, RiOrderPlayFill } from "react-icons/ri";
import { FaUserFriends, FaUsers } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TbBrandAdobe, TbBrandBumble } from "react-icons/tb";
import { TbCategoryPlus } from "react-icons/tb";
import {
  MdColorize,
  MdOutlineProductionQuantityLimits,
  MdFormatListBulletedAdd,
  MdFormatListBulleted,
  MdCategory,
  MdOutlineFeaturedPlayList,
  MdOutlineBorderColor,
} from "react-icons/md";
import { SiMicrodotblog } from "react-icons/si";
import { DiGitPullRequest } from "react-icons/di";
import { LiaBlogSolid } from "react-icons/lia";
import {
  IoIosAddCircleOutline,
  IoMdNotificationsOutline,
} from "react-icons/io";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import AnimatedText from "../anime/animetext";

const { Header, Sider, Content } = Layout;
const Mainlyout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical">
          <h3 className="text-white text-center fs-3 py-2">
            {collapsed ? "OE" : <AnimatedText text="Odoo Expert" />}
          </h3>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            // Logs key only
            if (key == "signout") {
              // Handle signout here
            } else {
              navigate(key); // Assure that you use `key.key` if it is the expected value
            }
          }}
          items={[
            {
              key: "",
              icon: <RxDashboard className="fs-5" />,
              label: "Tableau de bord",
            },
            {
              key: "catalog",
              icon: <GrCatalog className="fs-5" />,
              label: "Gestion de stock",
              children: [
                {
                  key: "product",
                  icon: <RiProductHuntLine className="fs-5" />,
                  label: "Ajouter produit",
                },{
                  key: "product-list",
                  icon: <MdOutlineProductionQuantityLimits className="fs-5" />,
                  label: "Liste de produits",
                },
                
                {
                  key: "brand",
                  icon: <TbBrandAdobe className="fs-5" />,
                  label: "Marque",
                },{
                  key: "brand-list",
                  icon: <TbBrandBumble className="fs-5" />,
                  label: "Liste de marques",
                },
                
                {
                  key: "category",
                  icon: <TbCategoryPlus className="fs-5" />,
                  label: "categorie",
                },{
                  key: "category-list",
                  icon: <MdCategory className="fs-5" />,
                  label: "Liste de categories",
                },
                
              
                
                    {
                      key: "color",
                      icon: <MdColorize className="fs-5" />,
                      label: "ajouter un coleur",
                    }, 
                    {
                      key: "color-list",
                      icon: <RxColorWheel className="fs-5" />,
                      label: "Liste de coleurs",
                    },
                  
                
                
                {
                  key: "fournisseur",
                  icon: <FaUsers className="fs-5" />,
                  label: "Fournisseur",
                  children: [
                    {
                      key: "add-fournisseur",
                      icon: <MdFormatListBulletedAdd className="fs-5" />,
                      label: "Ajout fournisseur",
                    },
                    {
                      key: "list-fournisseur",
                      icon: <MdFormatListBulleted className="fs-5" />,
                      label: "Liste de fournisseurs",
                    },
                  ],
                },
              ],
            },
            
            {
              key: "vente",
              icon: <SiMicrodotblog className="fs-5" />,
              label: "Gestion de vente",
              children: [
                {
                  key: "order",
                  icon: <MdOutlineBorderColor className="fs-5" />,
                  label: "Commande",
                },
            {
              key: "customers",
              icon: <FaUserFriends className="fs-5" />,
              label: "Client",
            },
                {
                  key: "add-blog",
                  icon: <IoIosAddCircleOutline className="fs-5" />,
                  label: "Ajout blog",
                },
                {
                  key: "list-blog",
                  icon: <MdOutlineFeaturedPlayList className="fs-5" />,
                  label: "Liste de blogs",
                },
                {
                  key: "blog-category",
                  icon: <IoIosAddCircleOutline className="fs-5" />,
                  label: "Ajout une category",
                },
                {
                  key: "blog-category-list",
                  icon: <LiaBlogSolid className="fs-5" />,
                  label: "liste de categories",
                },{
                  key: "enquiries",
                  icon: <DiGitPullRequest className="fs-5" />,
                  label: "Demandes",
                },
              ],
            },
            
            
          ]}
        />
      </Sider>
      <Layout>
      <Header
  className="d-flex justify-content-between ps-3 pe-5"
  style={{
    padding: 0,
    background: colorBgContainer,
  }}
>
  <Button
    type="text"
    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    onClick={() => setCollapsed(!collapsed)}
    style={{
      fontSize: "16px",
      width: 64,
      height: 64,
    }}
  />
  <Dropdown>
    <div className="d-flex gap-3 align-items-center">
      <div className="position-relative">
          <IoMdNotificationsOutline />
          <span className="badge bg-warning rounded-circle p-1 position-absolute">4</span>
      </div>
      <Dropdown.Toggle
          as="div"
          className="d-flex align-items-center"
          id="dropdown-custom-components"
      >
          <img
              height="45"
              width="50"
              src="https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg"
              alt=""
          />
          <div className="d-flex flex-column justify-content-center ms-2">
            <h5>salah mathlouthi</h5>
            <p>mathlouthi@gmail.com</p>
          </div>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item Link="/" style={{height:"auto" ,lineHeight:"20px"}}><MdAdminPanelSettings /> Admin profile</Dropdown.Item>
        <Dropdown.Item Link="/"  style={{height:"auto" ,lineHeight:"20px"}}><CiLogout/> quit</Dropdown.Item>
        
      </Dropdown.Menu>
    </div>
  </Dropdown>
</Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <ToastContainer position="top-right"
autoClose={250}
hideProgressBar={false}
newestOnTop={true}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable

theme="dark"

/>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Mainlyout;
