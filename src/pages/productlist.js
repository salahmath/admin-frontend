import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Table } from "antd";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

import { getProduct } from "../feature/product/productSlice";
import Link from "antd/es/typography/Link";
const columns1 = [
  {
    title: "key",
    dataIndex: "key",
  },
  {
    title: "produit",
    dataIndex: "title",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.title.localeCompare(b.title)
  },
  {
    title: "prix",
    dataIndex: "prix",
    defaultSortOrder:"descend",
    sorter:(a,b) =>a.prix - b.prix,

  }, {
    title: "quantite",
    dataIndex: "quantite",
    defaultSortOrder:"descend",
    sorter:(a,b) =>a.quantite - b.quantite,

  }, {
    title: "marque",
    dataIndex: "marque",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.marque.localeCompare(b.marque)
  },{
    title: "color",
    dataIndex: "color",
  },{
    title: "action",
    dataIndex: "action",
  },
];
const data1 = [];

function Productlist() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct());
  }, []);
  const productstate = useSelector((state) => state.product.products);

  // Initialiser un tableau pour stocker les données
const data1 = [];

// Parcourir le tableau productstate
for (let i = 0; i < productstate.length; i++) {
    // Ajouter chaque élément avec l'index de la boucle comme clé
    data1.push({
        key: i + 1, // Utiliser l'index de la boucle comme clé
        title: productstate[i].title,
        prix: productstate[i].price,
        quantite: productstate[i].quantite,
        marque: productstate[i].brand,
        color: productstate[i].color.map((i)=> {return i.color+","}),
        action: (
            <>
                <Link className="fs-5" to="/">
                    <CiEdit />
                </Link>
                <Link className="ms-3 fs-5" to="/">
                    <MdDelete />
                </Link>
            </>
        )
    });
}

  return (
    <div>
      <div className="mt-4">
        <h3 className="mb-4">liste de produit</h3>
        <Table columns={columns1} dataSource={data1} size="middle" />
      </div>
    </div>
  );
}

export default Productlist;
