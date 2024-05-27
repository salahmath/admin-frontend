import { css } from "@emotion/react";
import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Getaorder, Udateorder } from "../feature/auth/authslice";
import { updateaquan2 } from "../feature/product/productSlice";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const override = css`
  display: block;
  margin: 10 auto;
  border-color: red;
`;

function Vieworder() {
  const [loading, setLoading] = useState(true);
  const [data1, setData1] = useState([]);
  const [status, setstatus] = useState([]);
  const columns1 = [
   
    {
      title: "name",
      dataIndex: "name",
    },
    {
      title: "product",
      dataIndex: "product",
    },
    {
      title: "prix",
      dataIndex: "prix",
    },
    {
      title: "date",
      dataIndex: "date",
    },
    {
      title: "action",
      dataIndex: "action",
    },
  ];
  const dispatch = useDispatch();
  const location = useLocation();
  const getidUser = location.pathname.split("/")[3];
  const getid = location.pathname.split("/")[4];

  const orderstate = useSelector((state) => state?.auth?.Getaorder);
  const Udateorders = (a, b) => {
    dispatch(Udateorder({ a, b }))
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(Getaorder(getid));
      setLoading(false);
    };
    fetchData();
  }, [dispatch, getidUser,getid]);

  useEffect(() => {
    if (orderstate) {
      const formattedData = orderstate?.map((order) => {
        const dateStrFromAPI = order?.createdAt;
        const dateObject = new Date(dateStrFromAPI);
        const formattedDate = `${dateObject.getFullYear()}-${padNumber(
          dateObject.getMonth() + 1
        )}-${padNumber(dateObject.getDate())} à ${padNumber(
          dateObject.getHours()
        )}:${padNumber(dateObject.getMinutes())}:${padNumber(
          dateObject.getSeconds()
        )}`;
  
        return {
          name: order?.user?.lastname,
          prix: order?.totalPriceAfterdiscount + "DT",
          date: formattedDate,
          product: order?.orderItems
            .map((i) => i?.product?.title)
            .join(", "),
          action: (
            <select
              className="form-select form-control"
              aria-label="Default select example"
              onChange={(e) => Udateorders(getid, e.target.value)}
              defaultValue={order?.orderStatus}
            >
              <option value="En attente">En attente</option>
              <option value="En cours de traitement">
                En cours de traitement
              </option>
              <option value="Terminé">Terminé</option>
              <option value="Annulé">Annulé</option>
            </select>
          ),
        };
      });
  
      setData1(formattedData);
    }
  }, [orderstate,getid]);
  function padNumber(number) {
    return number.toString().padStart(2, "0");
  }

  const [previousOrderState, setPreviousOrderState] = useState(null); // État pour stocker l'état précédent de orderstate

  useEffect(() => {
    // Vérifiez s'il y a un changement significatif dans orderstate
    if (previousOrderState !== null && JSON.stringify(previousOrderState) !== JSON.stringify(orderstate)) {
      // Vérifiez si au moins un élément dans orderstate a un orderStatus égal à "Annulé"
      if (orderstate.some((i) => i.orderStatus === "Annulé")) {
        // Effectuez votre action de mise à jour
        dispatch(updateaquan2(orderstate.map((i) => i._id)));
        console.log((orderstate.some((i) => i.orderStatus )));
      }
    }

    // Mettez à jour l'état précédent avec l'état actuel
    setPreviousOrderState(orderstate);
  }, [dispatch, orderstate, previousOrderState]);

  return (
    <div>
<ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="dark"
          />
      <div className="mt-4">
        <h3 className="mb-4">Commande num: "{getid}"</h3>
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

export default Vieworder;
