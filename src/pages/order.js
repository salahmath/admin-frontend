import { css } from "@emotion/react";
import { Card, Col, Input, Row, Table } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { FcPlus } from "react-icons/fc";

import { Getorders } from "../feature/auth/authslice";
import { QRCode } from 'antd';
import { MdSettingsVoice } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Tag } from "antd";
import { MdPayment } from "react-icons/md";
const { Search } = Input;

const override = css`
  display: block;
  margin: 10 auto;
  border-color: red;
`;

function Orderlist() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const orders = useSelector((state) => state?.auth?.Getorders);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(Getorders());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const handleVoiceSearch = useCallback(() => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
      console.log("Texte transcrit:", transcript);
    };
    recognition.start();
  }, [setText]);

  const generateQRValue = (order) => {
    const productNames = order?.orderItems?.map((item) => item?.product?.title);
    const totalPrice = order?.totalPriceAfterdiscount;
    const createdAt = order?.createdAt;
    const id = order?._id;
    const status = order?.orderStatus;
    const quantite = order?.orderItems?.map((item) => item?.quantity);

    const url = `https://say123.netlify.app/facture?num_de_commande=${id}&produits=${quantite +""+"+"+""+ encodeURIComponent(productNames.join(','))}&Prix_total=${totalPrice}&commander_Le=${createdAt}&status_de_commande=${status}`;

    return url;
  };

  const columns = [
    {
      title: "Nom de client",
      dataIndex: "name",
    },
    {
      title: "Adresse",
      dataIndex: "Adresse",
    },
   
    {
      title: "Prix de commande",
      dataIndex: "price",
    },
    {
      title: "Date de commande",
      dataIndex: "date",
    },
    {
      title: "status de commande",
      dataIndex: "status",
    }
    ,{
      title: "Statut de paiement",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (_, record) => (
        <Tag color={record.paymentStatus === "1" ? "green" : "volcano"}>
          <MdPayment/>
        </Tag>
      ),
    },{
      title: "Méthode de paiement",
      dataIndex: "méthode", // Utilisez "méthode" avec un accent aigu
      key: "méthode",
      render: (_, { méthode }) => { // Utilisez "méthode" avec un accent aigu
        let color; // Couleur par défaut
        switch (méthode.toUpperCase()) { // Utilisez "méthode" avec un accent aigu
          case "WALLET":
            color = "grey";
            break;
          case "BANK_CARD":
            color = "green";
            break;
          case "E-DINAR":
            color = "blue";
            break;
          case "NON":
            color = "volcano";
            break;
          default:
            color = "default";
        }
        return (
          <Tag color={color} key={méthode}>
            {méthode.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Plus de details",
      dataIndex: "orderLink",
      render: (orderLink) => <Link to={orderLink}><FcPlus/></Link>,
    }
    
  ];

  const formattedData = orders?.map((order, index) => ({
    key: index,
    name: order?.user?.lastname,
   Adresse: order?.Shippinginfo?.Address+","+order?.Shippinginfo?.Other,
    price: order?.totalPriceAfterdiscount+"DT",
    paymentStatus:order?.type,
    méthode:order?.method,
    status: (
      <select
        className="form-select form-control"
        aria-label="Default select example"
        value={order?.orderStatus}
        disabled
      >
        <option value={order?.orderStatus} disabled>
          {order?.orderStatus}
        </option>
      </select>
    ),
    date: new Date(order?.createdAt).toLocaleString(),
    orderLink: `/admin/vieworder/${order?.user?._id}/${order?._id}`,
    qrValue: generateQRValue(order),
  }));

  const filteredData = formattedData?.filter(
    (item) =>
      item?.name.toLowerCase().includes(text.toLowerCase()) ||
      item?.date.toLowerCase().includes(text.toLowerCase())
  );

  return (
    <div>
      <div className="mt-4">
        <h3 className="mb-4">Liste des commandes</h3>
        {loading ? (
          <div className="loading-container">
            <ClipLoader
              color={"#123abc"}
              css={override}
              size={150}
              loading={loading}
            />
          </div>
        ) : (
          <>
            <Row className="rowed" gutter={16}>
              <Col span={8}>
                <Card
                  className="crd100"
                  title="Nombre de commandes"
                  bordered={false}
                >
                  <div className="text1">{orders?.length}</div>
                </Card>
              </Col>
            </Row>
            <br />
            <Search
              placeholder="Recherche par nom"
              enterButton="Rechercher"
              size="large"
              value={text}
              onChange={(e) => setText(e.target.value)}
              suffix={<MdSettingsVoice onClick={handleVoiceSearch} />}
            />
            <br />
            <Table columns={columns} dataSource={filteredData} size="middle" />
          </>
        )}
      </div>
    </div>
  );
}

export default Orderlist;
