/**
 *
 * TeamListView
 *
 */

// import SearchIcon from "@material-ui/icons/Search";
// import Alert from "@material-ui/lab/Alert";

// import { DocumentStatuses } from "utils/enums";

import React from "react";
import Button from "../button.component";
import { Link } from "react-router-dom";
import styled from "styled-components";

import PropTypes from "prop-types";
import Edit from "@material-ui/icons/Edit";
// import { LockIcon } from "@material-ui/icons";
import MaterialTable from "material-table";

export default function StatisticsView({ matches = [] }) {
  const columns = [
    { title: "Vs", field: "opponent" },
    { title: "AllyPoints", field: "allyPoints" },
  ];
  //<Link to={`/team/${item._id}/info`} style={{ color: "#000" }}>
  return (
    <PlayersPageStyled>
      <PlayersListStyled>
        <MaterialTable
          title="Matches"
          columns={columns}
          data={matches}
          onRowClick={(event, rowData) => {
            window.open(`match/${rowData._id}`);
            event.stopPropagation();
          }}
        />
      </PlayersListStyled>
    </PlayersPageStyled>
  );
}

const PlayersPageStyled = styled.div`
  min-height: 100vh;
`;

const PlayersListStyled = styled.div`
  display: grid;
  gap: 20px;
  text-align: right;
  padding: 10px;
  button {
    height: 50px;
    width: 250px;
    padding: 20px;
  }
`;
