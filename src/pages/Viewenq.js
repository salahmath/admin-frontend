import { css } from "@emotion/react";
import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import {
  geteteenquirys,
  messages,
  updtenquirys,
} from "../feature/enquiry/enquiryslice";
import ReactQuill from "react-quill";
import { Button, Flex } from "antd";
const override = css`
  display: block;
  margin: 10 auto;
  border-color: red;
`;
function Viewenq() {
  const [loading, setLoading] = useState(true);
  const [data1, setData1] = useState([]);
  const [mes, setmes] = useState("");
  const columns1 = [
    {
      title: "Nom",
      dataIndex: "name",
    },
    {
      title: "Message",
      dataIndex: "product",
    },
    {
      title: "Votre reponse",
      dataIndex: "reponse",
    },
    {
      title: "Status",
      dataIndex: "action",
    },
    {
      title: "Valider",
      dataIndex: "btn",
    },
  ];
  const dispatch = useDispatch();
  const location = useLocation();
  const getid = location.pathname.split("/")[3];

  const enqstate = useSelector((state) => state?.enquiry?.get_a_enquiry);
  const Updatestatus = (a, b) => {
    dispatch(updtenquirys({ a, b }));
  };
  const Ajoutermessage = (a, b) => {
    dispatch(messages({a,b}));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(geteteenquirys(getid));
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);
  useEffect(() => {
    if (enqstate) {
      setData1([
        {
          name: enqstate?.name,
          product: enqstate?.comment,
          reponse: (
            <ReactQuill
              name="response"
              
              onChange={handleChange}
            />
          ),
          btn: (
            <Flex gap="small" wrap="wrap">
              <Button
                type="primary"
                onClick={(e) => Ajoutermessage(getid,mes)}
              >
                Envoyer
              </Button>
            </Flex>
          ),
          action: (
            <>
              <select
                className="form-select form-control"
                aria-label="Default select example"
                onChange={(e) => Updatestatus(getid, e.target.value)}
              >
                <option value="En attente">En attente</option>
                <option value="voir">voir</option>
                <option value="repondre">repondre</option>
              </select>
            </>
          ),
        },
      ]);
    }
  }, [enqstate,Ajoutermessage,Updatestatus,getid,mes]);
  const handleChange = (content) => {
    setmes(content);
  };
  console.log(mes);
  return (
    <div>
      <div className="mt-4">
        <h3 className="mb-4">Enquiry num: "{getid}"</h3>
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
          <Table columns={columns1} dataSource={data1} size="middle" />
        )}
      </div>
    </div>
  );
}

export default Viewenq;
