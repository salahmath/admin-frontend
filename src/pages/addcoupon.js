import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import { object, string, number, date } from "yup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { creecoupon, getacoupon, updatecoupon } from "../feature/coupon/couponslice";
import { reset } from "../feature/brand/brandslice";
import Customlogin from "../componentes/Coustomlogin";

function Couponadded() {
  const location = useLocation();
  const brstate = useSelector((state) => state.coupon);
  const getidcoupon = location.pathname.split("/")[3];
  const { isSuccess, isError, isLoading, ismessage, coupon, couponss, isupdated } = brstate;

  const userSchema = object({
    name: string().required("Il faut écrire votre titre"),
    expiry: string().required("Il faut choisir une date d'expiration"),
    discount: number().required("Il faut écrire le montant de la réduction"),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formattedExpiry, setFormattedExpiry] = useState("");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      expiry: "",
      discount: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getidcoupon !== undefined) {
        const data = { id: getidcoupon, data: values };
        dispatch(updatecoupon(data));
      } else {
        dispatch(creecoupon(values));
      }
      formik.resetForm();
      setTimeout(() => {
        dispatch(reset());
        navigate("/admin/list-coupon");
      }, 300);
    },
  });

  useEffect(() => {
    if (getidcoupon !== undefined) {
      dispatch(getacoupon(getidcoupon)).then((response) => {
        const { name, expiry, discount } = response.payload;
        setFormattedExpiry(formatDate(expiry));
        formik.setValues({ name, expiry, discount });
      });
    } else {
      dispatch(reset());
    }
  }, [getidcoupon]);

  useEffect(() => {
    if (isSuccess && ismessage) {
      toast.success('La nouvelle coupon a été ajoutée avec succès.');
    }
    if (isError) {
      toast.error('Erreur lors de l\'ajout du coupon');
    }
  }, [isSuccess, isError, isLoading, ismessage]);

  useEffect(() => {
    if (isSuccess && isupdated) {
      toast.success('la coupon a été mise à jour avec succès.');
    }
    if (isError) {
      toast.error('Erreur lors de la modification du coupon');
    }
  }, [isSuccess, isError, couponss, isupdated]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }

    return `${year}-${month}-${day}`;
  };

  const handleExpiryChange = (event) => {
    setFormattedExpiry(event.target.value);
    formik.handleChange(event);
  };

  return (
    <div>
      <h3>{getidcoupon !== undefined ? "Modifier la coupon" : "Ajouter une coupon"} un coupon</h3>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Nom:</label>
        <Customlogin
          id="name"
          name="name"
          type="text"
          Label="Ecriver le nom de coupon"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          val={formik.values.name}
        />
        {formik.touched.name && formik.errors.name && <div>{formik.errors.name}</div>}

        <label htmlFor="expiry">Date d'expiration:</label>
        <Customlogin
          id="expiry"
          name="expiry"
          type="date"
          Label="ecirver le date de fin de coupon"
          onChange={handleExpiryChange}
          onBlur={formik.handleBlur}
          val={formattedExpiry}
        />
        {formik.touched.expiry && formik.errors.expiry && <div>{formik.errors.expiry}</div>}

        <label htmlFor="discount">Réduction:</label>
        <Customlogin
          id="discount"
          name="discount"
          type="number"
          Label="Veuillez saisir le montant de la remise du coupon ici"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          val={formik.values.discount}
        />
        {formik.touched.discount && formik.errors.discount && <div>{formik.errors.discount}</div>}

        <Button type="submit" variant="outline-success">
          {getidcoupon !== undefined ? "Modifier la coupon" : "Ajouter une coupon"}
        </Button>
      </form>
    </div>
  );
}

export default Couponadded;
