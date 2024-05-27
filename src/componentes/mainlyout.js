import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { FaLayerGroup, FaUserFriends, FaUsers } from "react-icons/fa";
import { GrCatalog, GrVmMaintenance } from "react-icons/gr";
import { IoIosPersonAdd } from "react-icons/io";
import { LuMessagesSquare } from "react-icons/lu";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { RiProductHuntLine } from "react-icons/ri";
import { RxColorWheel, RxDashboard } from "react-icons/rx";
import { TbBrandAdobe, TbBrandBumble, TbCategoryPlus } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./mainlyout.css";
import { FaBloggerB } from "react-icons/fa6";
import { MdOutlineCategory } from "react-icons/md";
import { Avatar, Badge } from "antd";

import "react-clock/dist/Clock.css";
import "react-time-picker/dist/TimePicker.css";

import {
  MdCategory,
  MdColorize,
  MdFormatListBulleted,
  MdOutlineBorderColor,
  MdOutlineFeaturedPlayList,
  MdProductionQuantityLimits,
} from "react-icons/md";

import { FaProductHunt } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import { LiaBlogSolid } from "react-icons/lia";
import { SiMicrodotblog } from "react-icons/si";

import { Button, Layout, Menu, theme } from "antd";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Outlet, useNavigate } from "react-router-dom";
import AnimatedText from "../anime/animetext";
import { logaut } from "../feature/auth/authslice";
import { exporState } from "../feature/blob/blobSlice";
import { reset } from "../feature/brand/brandslice";
import { resetstt } from "../feature/category-product/categorySlice";
import DarkMode from "./darkmode/DarkMode";
import { BiSolidCoupon } from "react-icons/bi";
import { MdPointOfSale } from "react-icons/md";
import { ClockCircleOutlined } from "@ant-design/icons";
import { BsFillCollectionFill } from "react-icons/bs";
import { MdOutlineSpeakerNotes } from "react-icons/md";

const { Header, Sider, Content } = Layout;
const Mainlyout = () => {
  const [userData, setUserData] = useState(null);
  const [value, onChange] = useState("10:00");
  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);
  function handleClick(event) {
    event.preventDefault(); // Empêche l'action par défaut (le clic)
  }

  const dispatch = useDispatch();
  const name = userData ? userData.lastname : null;
  const email = userData ? userData.email : null;
  const id = userData ? userData._id : null;

  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {}, []);

  const handleLogout = async () => {
    await localStorage.clear();
    await dispatch(logaut());
    dispatch(reset());
    dispatch(exporState());
    dispatch(resetstt());
    navigate("/");
  };
  let conteur = 0;
  const productstate = useSelector((state) => state.product.products);
  for (let i = 0; i < productstate.length; i++) {
    if (productstate[i].quantite == 0) {
      conteur++;
    }
  }
  let now = new Date();
  let wasDate = new Date("Thu Jul 18 2013 15:48:59 GMT+0400");
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical">
          <h3 className="text-white text-center fs-3 py-2">
            <Link className="vss" to="/admin">
              {" "}
              {collapsed ? "OE" : <AnimatedText text="Odoo Expert" />}
            </Link>
          </h3>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          onClick={({ key }) => {
            // Logs key only
            if (key === "signout") {
              localStorage.clear();
              navigate("");
              // Handle signout here
            } else {
              navigate(key); // Assure that you use `key.key` if it is the expected value
            }
          }}
        >
          <Menu.Item key="" icon={<RxDashboard className="fs-5" />}>
            <span className="ant-menu-title-content">Tableau de bord</span>
          </Menu.Item>
          <Menu.SubMenu
            title="Vente"
            icon={<MdPointOfSale className="fs-5" />}
          >
            <Menu.Item
              key="order"
              icon={<MdOutlineBorderColor className="fs-5" />}
            >
              <span className="ant-menu-title-content">Commande</span>
            </Menu.Item>
            <Menu.Item
              key="customers"
              icon={<FaUserFriends className="fs-5" />}
            >
              <span className="ant-menu-title-content">Client</span>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu
            title="Produits"
            icon={<BsFillCollectionFill className="fs-5" />}
          >
          
            <Menu.Item
              key="product"
              icon={<RiProductHuntLine className="fs-5" />}
            >
              <span className="ant-menu-title-content">Ajouter produit</span>
            </Menu.Item>
            {/*   <Menu.Item
            key="add-product-qr"
            icon={<LuQrCode className="fs-5" />}
          >
            <span className="ant-menu-title-content">add-product-qr</span>
          </Menu.Item> */}
            <Menu.Item
              key="product-list"
              icon={<MdOutlineProductionQuantityLimits className="fs-5" />}
            >
              <span className="ant-menu-title-content">Liste de produits</span>
            </Menu.Item>
          
          <Menu.SubMenu 
            key="category1"
            icon={<TbCategoryPlus className="fs-5" />}
            title="Catégorie"
          >
            <Menu.Item
              key="category"
              icon={<TbCategoryPlus className="fs-5" />}
            >
              <span className="ant-menu-title-content">
                Ajouter une catégorie
              </span>
            </Menu.Item>
            <Menu.Item
              key="category-list"
              icon={<MdCategory className="fs-5" />}
            >
              <span className="ant-menu-title-content">
                Liste de catégories
              </span>
            </Menu.Item>
          </Menu.SubMenu>{/* cqt */}
          <Menu.SubMenu
            key="color1"
            icon={<MdColorize className="fs-5" />}
            title="Couleur"
          >
            <Menu.Item key="color" icon={<MdColorize className="fs-5" />}>
              <span className="ant-menu-title-content">
                Ajouter une couleur
              </span>
            </Menu.Item>
            <Menu.Item
              key="color-list"
              icon={<RxColorWheel className="fs-5" />}
            >
              <span className="ant-menu-title-content">Liste de couleurs</span>
            </Menu.Item>
          </Menu.SubMenu>{/* col */}
          <Menu.SubMenu
            key="brand1"
            icon={<TbBrandAdobe className="fs-5" />}
            title="Marque"
          >
            <Menu.Item key="brand" icon={<TbBrandAdobe className="fs-5" />}>
              <span className="ant-menu-title-content">Ajouter une marque</span>
            </Menu.Item>
            <Menu.Item
              key="brand-list"
              icon={<TbBrandBumble className="fs-5" />}
            >
              <span className="ant-menu-title-content">Liste de marques</span>
            </Menu.Item>
          </Menu.SubMenu>{/* arq */}
          {/*   <Menu.SubMenu
            key="fournisseur"
            icon={<FaUsers className="fs-5" />}
            title="Fournisseur"
          >
            <Menu.Item
              key="add-fournisseur"
              icon={<IoIosPersonAdd className="fs-5" />}
            >
              <span className="ant-menu-title-content">
                Ajouter un fournisseur
              </span>
            </Menu.Item>
            <Menu.Item
              key="list-fournisseur"
              icon={<MdFormatListBulleted className="fs-5" />}
            >
              <span className="ant-menu-title-content">
                Liste de fournisseurs
              </span>
            </Menu.Item>
          </Menu.SubMenu> */}
          </Menu.SubMenu>

          <Menu.SubMenu
            key="maintenance"
            icon={<FaLayerGroup className="fs-5" />}
            title="Coupon"
          >
            <Menu.Item
              key="add-coupon"
              icon={<GrVmMaintenance className="fs-5" />}
            >
              <span className="ant-menu-title-content">
                Ajouter des coupons
              </span>
            </Menu.Item>
            <Menu.Item
              key="list-coupon"
              icon={<BiSolidCoupon className="fs-5" />}
            >
              <span className="ant-menu-title-content">Liste de coupons</span>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu
            title="Blogs"
            icon={<MdOutlineSpeakerNotes className="fs-5" />}
          >
          <Menu.SubMenu
            key="blog1"
            icon={<FaBloggerB className="fs-5" />}
            title="Blog"
          >
            <Menu.Item
              key="add-blog"
              icon={<IoIosAddCircleOutline className="fs-5" />}
            >
              <span className="ant-menu-title-content">Ajout blog</span>
            </Menu.Item>
            <Menu.Item
              key="list-blog"
              icon={<MdOutlineFeaturedPlayList className="fs-5" />}
            >
              <span className="ant-menu-title-content">Liste de blogs</span>
            </Menu.Item>
          </Menu.SubMenu>

          <Menu.SubMenu
            key="blog"
            icon={<MdOutlineCategory className="fs-5" />}
            title="catégrie de blog"
          >
            <Menu.Item
              key="blog-category"
              icon={<IoIosAddCircleOutline className="fs-5" />}
            >
              <span className="ant-menu-title-content">
                Ajout d'une catégorie
              </span>
            </Menu.Item>
            <Menu.Item
              key="blog-category-list"
              icon={<LiaBlogSolid className="fs-5" />}
            >
              <span className="ant-menu-title-content">
                Liste de catégories
              </span>
            </Menu.Item>
          </Menu.SubMenu>
          </Menu.SubMenu>

          <Menu.Item key="Enquiry" icon={<LuMessagesSquare className="fs-5" />}>
            <span className="ant-menu-title-content">Enquêtes</span>
          </Menu.Item>
        </Menu>
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
            icon={collapsed ? <AiOutlineArrowRight /> : <AiOutlineArrowLeft />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <DarkMode />
          <Dropdown>
            <div className="d-flex gap-3 align-items-center">
              <div className="position-relative">
                {conteur !== 0 ? (
                  <>
                    <Link to="/admin/product-list">
                      <Badge count={conteur}>
                        <Avatar shape="square" size="large" />
                      </Badge>
                    </Link>
                  </>
                ) : (
                  <>
                    {" "}
                    <Badge count={0} showZero>
                      <Avatar shape="square" size="large" />
                    </Badge>
                  </>
                )}
              </div>
              <Dropdown.Toggle
                as="div"
                className="d-flex align-items-center"
                id="dropdown-custom-components"
              >
                <div className=" d-flex flex-column justify-content-center ms-2 darkou">
                  <h5>{name}</h5>
                  <p>{email}</p>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={handleLogout}
                  style={{ height: "auto", lineHeight: "20px" }}
                >
                  <CiLogout /> Se déconnecter
                </Dropdown.Item>
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
          {/* <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="dark"
          /> */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Mainlyout;
