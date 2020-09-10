import React from "react";
import Button from "../button.component";
import { Link } from "react-router-dom";
import styled from "styled-components";

import PropTypes from "prop-types";
import Edit from "@material-ui/icons/Edit";
// import { LockIcon } from "@material-ui/icons";
import MaterialTable from "material-table";

export default function TeamListView({ players = [], teamId, onUpdatePlayer }) {
  const columns = [
    { title: "Name", field: "name" },
    { title: "Position", field: "position" },
    { title: "Number", field: "number" },
    { title: "Height", field: "height" },
    { title: "Weight", field: "weight" },
  ];

  return (
    <PlayersPageStyled>
      <PlayersListStyled>
        <MaterialTable
          title="Teams"
          columns={columns}
          data={players}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  if (oldData) {
                    onUpdatePlayer(newData);
                  }
                }, 600);
              }),
          }}
        />
        <Link to={`/create_player`}>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            data-testid="sign-up-button"
          >
            Create New Player
          </Button>
        </Link>
        <Link to={`/start_match`}>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            data-testid="sign-up-button"
          >
            Start Match
          </Button>
        </Link>
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
