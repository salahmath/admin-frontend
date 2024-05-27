import React ,{useState}from "react";
import { Table } from 'antd';
import { Column } from '@ant-design/plots';
import { Tiny } from '@ant-design/plots';
import { GrDescend } from "react-icons/gr";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { Getmonth, Getmonth2, Getorders, Getordersnum1, Getordersum } from "../feature/auth/authslice";
import { Pie } from '@ant-design/plots';
import { Tag } from "antd";
import { Row, Col, Statistic, Card } from 'antd';
import { RiCoupon2Fill } from "react-icons/ri";
import { Divider, Flex } from 'antd';
import { ToastContainer } from "react-toastify";

import { MdPayment } from "react-icons/md";
import { getblogs } from "../feature/blob/blobSlice";
import { getcoupon } from "../feature/coupon/couponslice";
import { getUsers } from "../feature/customrs/customerslice";
const PlotMaps = {};

function Dashbord() {
const [datas ,setdatas]=useState([])
  const columns1 = [
    {
      title: 'Num',
      dataIndex: 'key',
    },
    {
      title: 'Nom et Prénom de client',
      dataIndex: 'name',
    },
    {
      title: 'Numéro de télephone',
      dataIndex: 'mobile',
    },
    {
      title: 'Adresse',
      dataIndex: 'count',
    },
    {
      title: 'Prix total',
      dataIndex: 'prixtotal',
    },
    {
      title: 'Statut',
      dataIndex: 'status',
    },{
      title: "Statut de paiement",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (_, record) => (
        <Tag color={record.paymentStatus === "1" ? "green" : "volcano"}>
          <MdPayment/>
        </Tag>
      ),
    },
  ];
  
  const config = {
    data: datas,
    colorField:"#41B06E",
    xField: 'type',
    yField: 'commandes',
    label: {
        position: 'top',
        style: {
          fill:"#DAAB3A",
            opacity: 0.6,
        },
    },
    xAxis: {
        label: {
            autoHide: true,
            autoRotate: false,
        },
    },
    meta: {
        type: {
            alias: 'Month',
        },
        commandes: {
            alias: 'Incomes',
        },
    },
};

const dispatch = useDispatch()
useEffect(()=>{
dispatch(Getmonth())
dispatch(Getmonth2())
dispatch(Getorders())
dispatch(Getordersnum1())
dispatch(Getordersum())
},[dispatch])

const dashstate = useSelector((state) => state?.auth?.Getmonthdetail);
const dashstate2 = useSelector((state) => state?.auth?.Getyears);
const order = useSelector((state) => state?.auth?.Getorders);
const sum = useSelector((state) => state?.auth?.Getordersum);
const anuulestate=useSelector((state)=>state?.auth?.Getordersnum1 )

const data1 = [];
  for (let i = 0; i < order?.length; i++) {
    const orderItem = order[i]; // Obtenir l'élément de commande à l'index i
    data1.push({
      key:i+1,
        name: orderItem?.user.lastname,
        mobile: orderItem?.user.mobile,
        count: orderItem?.Shippinginfo?.Address +","+orderItem?.Shippinginfo?.Other,
        prixtotal: orderItem?.totalPrice+"DT",
        status: orderItem?.orderStatus,
        paymentStatus:orderItem?.type,
    });
}
useEffect(() => {
  let monthNames = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];  
  let data2 = [];

  for (let i = 0; i < dashstate?.length; i++) {
    data2.push({
      type: monthNames[dashstate[i]?._id?.month],
      commandes: dashstate[i]?.count
    });
  }
  setdatas(data2)
}, [dashstate]);

const showTooltip = (evt, pie) => {
  PlotMaps[pie]?.chart?.emit('tooltip:show', {
    data: { data: evt?.data?.data },
  });
};
useEffect(()=>{
  dispatch(getblogs());
  dispatch(getcoupon());
  dispatch(getUsers());
},[dispatch])

const blogstate = useSelector((state)=>state?.blog?.blog)
const brandstate = useSelector((state)=> state.coupon.coupon)
const customerState = useSelector((state) => state?.customer?.customers);


const hideTooltip = (evt, pie) => {
  PlotMaps[pie]?.chart?.emit('tooltip:hide');
};
const [data3, setData3] = useState([]);

useEffect(() => {
  if (sum && sum.length > 0) {
    const newData = sum.map(item => ({
      area: item._id,
      bill: 4,
      commande: item.count
    }));
    setData3(newData);
  }
}, [sum]);
const [dates, setDates] = useState([]);

useEffect(() => {
  if (anuulestate && anuulestate.length > 0) {
    const newData = anuulestate.map(item => ({
      produit: item.productName,
      annulation: item.count
    }));
    setDates(newData);
  }
}, [anuulestate]);
if (data3?.length === 0) {
  return null; // Si le tableau de données est vide, retourne 'null'
}
const LeftConfig = {
  angleField: 'commande',
  colorField: 'area',
  data: data3,
  label: {
    text: 'commande',
  },
  legend: false,
  tooltip: {
    title: 'area',
  },
  interaction: {
    elementHighlight: true,
  },
  state: {
    inactive: { opacity: 0.5 },
  },
};
const progress = 0.7;

const config5 = {
  width: 480,
  height: 60,
  autoFit: false,
  percent: progress,
  color: ['#0f0f0f', '#85f231'],
  annotations: [
    {
      type: 'text',
      style: {
        text: `${progress * 100}%`,
        x: '50%',
        y: '50%',
        textAlign: 'center',
        fontSize: 16,
        fontStyle: 'bold',
      },
    },
  ],
};

const config10 = {
  data: dates,
  xField: 'produit',
  yField: 'annulation',
  colorField:"#C40C0C",
  scrollbar: {
    x: {
      ratio: 1,
    },
  },
};

  return (
    <>
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
  <br/><br/>
  <div class="parent">
  <div class="child"></div>
</div>
  <br/><br/>

      <div class="row col-12">
      <Row gutter={[20, 20]}> {/* gutter pour définir l'espacement entre les colonnes */}
  <Col xs={50} sm={12} md={8} lg={6}> {/* Réglez xs, sm, md, lg pour définir la largeur des colonnes sur différentes tailles d'écran */}
 
  <Tag color="magenta" className="text-center"> 
    <Flex gap="10px " >
    <Statistic 
  title="Nombre de clients" 
  value={(customerState && customerState?.length) || 0} // Assurez-vous de gérer le cas où customerState est null ou undefined
  valueStyle={{ color: 'red', fontSize: '20px'}} // Exemple de styles CSS personnalisés
/>

      
    </Flex>
    </Tag>
  </Col>
  
  <Col xs={24} sm={12} md={8} lg={6}>
  <Tag color="blue" className="text-center"> 
      <Statistic  title="Nombre de commandes" value={(dashstate2 && dashstate2[0]?.count) || 0} valueStyle={{ color: 'blue', fontSize: '20px'}}/>
        </Tag>

  </Col>
  <Col xs={24} sm={12} md={8} lg={6}>
  <Tag color="green" className="text-center"> 
      <Statistic title="Nombre de blogs" value={(blogstate && blogstate?.length)|| 0} valueStyle={{ color: 'green', fontSize: '20px'}}/>
        </Tag>

  </Col>
  <Col xs={24} sm={12} md={8} lg={6}>
  <Tag color="purple" className="text-center"> 
      <Statistic title="Nombre de coupons" value={(brandstate && brandstate?.length)||0} valueStyle={{ color: 'purple', fontSize: '20px' }}/>
        </Tag>

  </Col>
  {/* Ajoutez plus de colonnes pour d'autres métriques si nécessaire */}
</Row>
    
</div>
  <br/><br/>
  <div class="parent">
  <div class="child"></div>
</div>
      <div className="row d-flex flex-wrap">
  <div className="mt-4 col-12 col-sm-12 col-md-6 col-lg-6">
    <h3 className="mb-4">
    <Flex gap="4px 0" wrap>
      <Tag color="#87d068">Commande/Mois</Tag>
    </Flex>
  </h3>
    <Column {...config} />
  </div>
  <div className="mt-4 col-12 col-sm-12 col-md-6 col-lg-6">
<h3 className="mb-4">
<Flex gap="4px 0" wrap>
      <Tag color="#2db7f5">Statut/Commande</Tag>
    </Flex></h3>

   <Pie
      style={{ width: '100%' }}
      {...LeftConfig}
      onReady={(plot) => {
        PlotMaps.leftPie = plot;
        plot?.chart?.on('interval:pointerover', (evt) => {
          showTooltip(evt, 'leftPie');
        });
        plot.chart.on('interval:pointerout', (evt) => {
          hideTooltip(evt, 'leftPie');
        });
      }}
    />
  </div>
  <div>
  
  </div>
</div>
<br/>
  <br/><br/>
  <div class="parent">
  <div class="child"></div>
</div>

  <br/>
  <h3 className="mb-4 text-center"><Flex gap="4px 0" wrap>
      <Tag color="#f50">Produits/annulés</Tag>
    </Flex></h3>

<div className="col-12">
  <Column {...config10} />
</div>
      <div className="mt-4">
        <h3 className="mb-4"><Flex gap="4px 0" wrap>
      <Tag color="#108ee9">Commandes récentes</Tag>
    </Flex></h3>
      <Table columns={columns1} dataSource={data1} size="middle" />
      </div>
   
    
    </>
  );
}

export default Dashbord
