import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { css } from "@emotion/react";
import { Card, Col, Input, Modal, Row ,} from "antd";
import { MdSettingsVoice } from "react-icons/md";
import QRCode from 'qrcode.react'; // Importez la bibliothèque pour générer les codes QR
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { deleteaProduct, getProduct } from "../feature/product/productSlice";

const { Search } = Input;

const override = css`
  display: block;
  margin: 10 auto;
  border-color: red;
`;

const columns1 = [
  {
    title: "key",
    dataIndex: "key",
  },
  {
    title: "produit",
    dataIndex: "title",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.title.localeCompare(b.title),
  },
  {
    title: "prix",
    dataIndex: "prix",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.prix - b.prix,
  },
  {
    title: "quantite",
    dataIndex: "quantite",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.quantite - b.quantite,
  },
  {
    title: "marque",
    dataIndex: "marque",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.marque.localeCompare(b.marque),
  },
  {
    title: "color",
    dataIndex: "color",
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
      <QRCode value={qrValue || "-"}size={100} />
    ),
  },
  {
    title: "action",
    dataIndex: "action",
  },
];

const MAX_DESCRIPTION_LENGTH = 700;

const generateQRValue = (productstate) => {
  const colorArray = productstate?.color.map((item) => item.color);
  const images = encodeURIComponent(productstate?.images[0]?.url);
  const title = encodeURIComponent(productstate?.title);
  const prix = encodeURIComponent(productstate?.price);
  const quantite = encodeURIComponent(productstate?.quantite);
  const marque = encodeURIComponent(productstate?.brand);
  const img = images;
  const coleur = encodeURIComponent(colorArray.join(', '));
  const tags = encodeURIComponent(productstate?.tags);

  // Limiter la taille de la description et ajouter "..." si elle dépasse la limite
  let description = encodeURIComponent(productstate?.description);
  if (description.length > MAX_DESCRIPTION_LENGTH) {
    description = description.substring(0, MAX_DESCRIPTION_LENGTH) + '...';
  }

  const url = `https://main--produit.netlify.app/seul?title=${title}&quantite=${quantite}&Prix=${prix}&Marque=${marque}&description=${description}&coleur=${coleur}&tags=${tags}&img=${img}`;

  return url;
};


/*   const generateQRValue = (product) => {
    const colorArray = product.color.map((item) => (item.color));
    const images = product.images.map((i) => i.url); // Utilisez la variable imagesmages
    const values = [
      { label: 'Title', value: product.title },
      { label: 'Price', value: product.price },
      { label: 'Quantity', value: product.quantite },
      { label: 'Brand', value: product.brand },
      { label: 'description', value: product.description },
      { label: 'Color', value: colorArray.join(', ') },
      { label: 'Image URL', value: images.join(', ') }, // Utilisez la variable images ici
      { label: 'category', value: product.category },
      { label: 'tags', value: product.tags },
      { label: 'solde', value: product.solde },
    ];
   */
const data1 = [];

function Productlist() {
  const [text, setText] = useState(''); // Assurez-vous que text est initialisé à une chaîne vide

  const [loading, setLoading] = useState(true); // Nouvel état de chargement

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [brabdid, setbrabdid] = useState("");

  const showModal = (e) => {
    setIsModalOpen(true);
    setbrabdid(e);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getColorName = (hex) => {
    const convert = require("color-convert");
    const rgb = convert.hex.rgb(hex);
    const colorName = convert.rgb.keyword(rgb);
    return colorName || hex; // Si aucune correspondance trouvée, retourne le code hexadécimal
  };
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Déclenche l'état de chargement
      await dispatch(getProduct());
      setLoading(false); // Met à jour l'état de chargement
    };
    fetchData();
  }, [dispatch]);

  const productstate = useSelector((state) => state.product.products);

  // Initialiser un tableau pour stocker les données
  const data1 = [];
  let conteur = 0;
  let conteur2 = 0;
/*   const generateQRValue = (product) => {
    const colorArray = product.color.map((item) => (item.color));
    const images = product.images.map((i) => i.url); // Utilisez la variable imagesmages
    const values = [
      { label: 'Title', value: product.title },
      { label: 'Price', value: product.price },
      { label: 'Quantity', value: product.quantite },
      { label: 'Brand', value: product.brand },
      { label: 'description', value: product.description },
      { label: 'Color', value: colorArray.join(', ') },
      { label: 'Image URL', value: images.join(', ') }, // Utilisez la variable images ici
      { label: 'category', value: product.category },
      { label: 'tags', value: product.tags },
      { label: 'solde', value: product.solde },
    ];
   */
  
  
  // Parcourir le tableau productstate
  for (let i = 0; i < productstate.length; i++) {
    // Ajouter chaque élément avec l'index de la boucle comme clé

    const status =
      productstate[i].quantite === 0 ? "hors stock" : "en stock";

  
    data1.push({
      key: i + 1, // Utiliser l'index de la boucle comme clé
      title: productstate[i].title,
      prix: productstate[i].price,
      quantite: productstate[i].quantite,
      marque: productstate[i].brand,
      image: <img className="img-fluid imga" src={productstate[i]?.images[0]?.url} alt={productstate[i]._id} />,
      color: (
        <>
          {productstate[i].color.map((item, index) => {
            const color = getColorName(item.color);
            return index === productstate[i].color.length - 1 ? (
              color
            ) : (
              <React.Fragment key={index}>
                {color}
                <br />
              </React.Fragment>
            );
          })}
        </>
      ),
      
      status: status,
    // Utilisez une valeur unique (ID) comme valeur du code QR
    qrValue: generateQRValue(productstate[i]),

      action: (
        <>
          <Link className="fs-5" to={`/admin/product/${productstate[i]._id}`}>
            <CiEdit />
          </Link>
          <Link
            className="ms-3 fs-5"
            onClick={() => showModal(productstate[i]._id)}
          >
            <MdDelete />
          </Link>
        </>
      ),
      
    });
    if (status === "en stock") {
      conteur++; // Incrémenter le conteur uniquement si le produit est en stock
    } else {
      conteur2++;
    }
  }
  const filteredData = data1.filter(item =>
    item.title.toLowerCase().includes(text.toLowerCase())
  );

  const Supprimer = async (e) => {
    await dispatch(deleteaProduct(e));

    await setIsModalOpen(false);
    setTimeout(() => {
      dispatch(getProduct());
    }, 100);
  };
  // Fonction pour gérer la recherche vocale
const handleVoiceSearch = () => {
  const recognition = new window.webkitSpeechRecognition(); // Créez une instance de la reconnaissance vocale
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setText(transcript); // Mettez à jour le texte de recherche avec le texte transcrit
    console.log("Texte transcrit:", transcript); // Afficher le texte transcrit dans la console
  };
  recognition.start(); // Commencez à écouter pour la saisie vocale
};

  return (
    <div>
      <div className="mt-4">
        <h3 className="mb-4">liste de produit</h3>

        {loading ? ( // Affiche l'animation de chargement si loading est vrai
    <div className="loading-container">
        <ClipLoader
            color={"#123abc"}
            css={override}
            size={150}
            loading={loading}
        />
    </div>
) : (
    <div>
        <Row gutter={16}>
            <Col span={8}>
                <Card className="crd1" title="Produit en stock" bordered={false}>
                    
                    <div className="text1" >{conteur}</div>  
                </Card>
            </Col>
            <Col span={8}>
                <Card className="crd2" title="Produit hors stock" bordered={false}>
                    
                    <div className="text1" >{conteur2}</div>  
                </Card>
            </Col>
            <Col span={8}>
                <Card className="crd3" title="Nombre de produits" bordered={false}>
                 <div className="text1" >{conteur + conteur2}</div>  
                </Card>
            </Col>
        </Row>
        <br/>
        <Search
          placeholder="Recherche par nom"
          enterButton="Search"
          size="large"
          value={text} // Utiliser la valeur de l'état text comme valeur du champ de recherche
          onChange={(e) => setText(e.target.value)} // Mettre à jour l'état text lorsque le champ de recherche est modifié
          suffix={<MdSettingsVoice onClick={handleVoiceSearch} />} // Appel à la fonction handleVoiceSearch lors du clic sur l'icône de recherche vocale
        /><br/>
        
        <Table
    columns={columns1}
    dataSource={filteredData}
    size="middle"
/>
    </div>
)}

      </div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={() => {
          Supprimer(brabdid);
        }}
        onCancel={handleCancel}
      >
        <p>
          Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est
          irréversible.
        </p>
      </Modal>
    </div>
  );
}

export default Productlist;
