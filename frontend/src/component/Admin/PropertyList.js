import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./PropertyList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProperty,
  deleteProperty,
} from "../../actions/propertyAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import LaunchIcon from '@mui/icons-material/Launch';
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_PROPERTY_RESET } from "../../constants/propertyConstants";

const PropertyList = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, properties } = useSelector((state) => state.properties);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.property
  );

  const deletePropertyHandler = (id) => {
    dispatch(deleteProperty(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Property Deleted Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: DELETE_PROPERTY_RESET });
    }

    dispatch(getAdminProperty());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const columns = [
    { field: "id", headerName: "Property ID", minWidth: 200, flex: 0.5 },

    {
      field: "sellRent",
      headerName: "Sell/Rent",
      minWidth: 200,
      flex: 0.4,
    },
    {
      field: "propertyType",
      headerName: "Property Type",
      minWidth: 90,
      flex: 0.8,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
             <Link to={`/property/${params.getValue(params.id, "id")}`}>
              < LaunchIcon />
            </Link>
            <Button
              onClick={() =>
                deletePropertyHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  properties &&
    properties.forEach((item) => {
      rows.push({
        id: item._id,
        sellRent: item.sellRent,
        propertyType: item.propertyType,
        price: item.price,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL PROPERTIES - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="propertyListContainer">
          <h1 id="propertyListHeading">ALL PROPERTIES</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="propertyListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default PropertyList;