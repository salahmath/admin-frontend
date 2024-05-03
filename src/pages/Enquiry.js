import { css } from "@emotion/react";
import { Card, Col, Input, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { Getorders } from "../feature/auth/authslice";
import { QRCode } from 'antd';
import { MdSettingsVoice } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
//import { ""from 'antd';
import { Link } from "react-router-dom";
import { getenquirys } from "../feature/enquiry/enquiryslice";
import { BiExitFullscreen } from "react-icons/bi";

const { Search } = Input;

const override = css`
  display: block;
  margin: 10 auto;
  border-color: red;
`;

function Enquiry() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(getenquirys());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const handleVoiceSearch = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
    };
    recognition.start();
  };

 const enqstate=useSelector((state)=>state?.enquiry?.enquiry)
  const columns = [
    {
      title: "Nom",
      dataIndex: "name",
    },
    {
      title: "repondu sur message",
      dataIndex: "orderLink",
      render: (orderLink) => <Link to={orderLink}>Voir l'enquête</Link>

    },
    {
      title: "Email",
      dataIndex: "price",
    },
    
    {
      title: "Message",
      dataIndex: "date",
    },
    {
      title: "Reponse",
      dataIndex: "reponse",
    },
    {
      title: "status",
      dataIndex: "status",
    }
  ];
  let a = 0;
  let b = 0;
  let c = 0;
  function RenderHTML({ htmlContent }) {
    return (
      <div
        style={{
          display: "-webkit-box",
          overflow: "hidden",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 3,
        }}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    );
  }

  const formattedData = enqstate?.map((enq, index) => {
    // Incrémenter a, b ou c selon le statut de l'enquête
    if (enq?.status === "En attente" || enq?.status === "en attente" ) {
      a++;
    } else if (enq?.status === "voir") {
      b++;
    } else if (enq?.status === "repondre") {
      c++;
    }
  
    return {
      key: index,
      name: enq?.name,
      orderLink: `/admin/viewenq/${enq?._id}`,
      price: enq?.email,
      date: enq?.comment,
      reponse: enq?.reponse ?<RenderHTML htmlContent={enq?.reponse} /> :  < BiExitFullscreen  style={{ color: 'red' }} />,
      status: (
        <select
          className="form-select form-control"
          aria-label="Default select example"
          value={enq?.status}
          disabled
        >
          <option value={enq?.status} disabled>
            {enq?.status}
          </option>
        </select>
      )
    };
  });
  
 
  const filteredData = formattedData?.filter(
    (item) =>
      (item?.name && item.name.toLowerCase().includes(text.toLowerCase())) ||
      (item?.email && item.email.toLowerCase().includes(text.toLowerCase()))
  );
  
 
  return (
    <div>
      <div className="mt-4">
        <h3 className="mb-4">Liste des enquêtes
</h3>
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
              <Col span={6}>
                <Card
                  className="crd100"
                  title="total de enquêtes"
                  bordered={false}
                >
                   <div className="text1">{enqstate?.length}</div>
                </Card>
              </Col>
              <Col span={6}>
                <Card
                  className="crd100"
                  title=" enquêtes en attente"
                  bordered={false}
                >
                   <div className="text1">{a}</div>
                </Card>
              </Col>
              <Col span={6}>
                <Card
                  className="crd100"
                  title="enquêtes voir"
                  bordered={false}
                >
                   <div className="text1">{b}</div>
                </Card>
              </Col>
              <Col span={6}>
                <Card
                  className="crd100"
                  title="enquêtes repondre"
                  bordered={false}
                >
                   <div className="text1">{c}</div>
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

export default Enquiry;
