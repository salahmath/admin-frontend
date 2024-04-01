import { css } from "@emotion/react";
import { Card, Col, Input, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { Getorders } from "../feature/auth/authslice";
import { QRCode } from 'antd';
import { MdSettingsVoice } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
  const orders = useSelector((state) => state.auth.Getorders);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(Getorders());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const handleVoiceSearch = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
      console.log("Texte transcrit:", transcript);
    };
    recognition.start();
  };

  const generateQRValue = (order) => {
    const productNames = order?.orderItems?.map((item) => item?.productId?.product?.title);
    const totalPrice = order.totalPriceAfterdiscount;
    const createdAt = order.createdAt;

    // Construire l'URL avec les valeurs des champs
    const url = `https://say123.netlify.app/facture?products=${encodeURIComponent(productNames.join(','))}&totalPrice=${totalPrice}&createdAt=${createdAt}`;

    return url;
  };

  const columns = [
    {
      title: "Nom",
      dataIndex: "name",
    },
    {
      title: "Commande",
      dataIndex: "orderLink",
      render: (orderLink) => <Link to={orderLink}>Voir la commande</Link>,
    },
    {
      title: "Prix",
      dataIndex: "price",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "status",
      dataIndex: "status",
    },
    {
      title: "QR Code",
      dataIndex: "qrValue",
      key: "qrCode",
      render: (qrValue) => (
        <QRCode value={qrValue || "-"} />
      ),
    },
  ];

  const formattedData = orders?.map((order, index) => ({
    key: index,
    name: order?.user?.lastname,
    orderLink: `/admin/vieworder/${order?.user?._id}`,
    price: order?.totalPriceAfterdiscount,
   status:<>
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


  </>,
    date: new Date(order?.createdAt).toLocaleString(),
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
                  <div className="text1">{orders.length}</div>
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
