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

export default function TeamListView({ teams = [], onUpdateTeam }) {
  const columns = [{ title: "Name", field: "name" }];
  //<Link to={`/team/${item._id}/info`} style={{ color: "#000" }}>
  return (
    <PlayersPageStyled>
      <PlayersListStyled>
        <MaterialTable
          title="Teams"
          columns={columns}
          data={teams}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  if (oldData) {
                    onUpdateTeam(newData);
                  }
                }, 600);
              }),
          }}
          onRowClick={(event, rowData) => {
            window.open(`team/${rowData._id}/info`);
            event.stopPropagation();
          }}
        />
        <Link to={`/create_team`}>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            data-testid="sign-up-button"
          >
            Create New Team
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

// const TeamListView = ({ teams, search = false }) => (
//   <MuiCardStyled variant="outlined">
//     {
//       <CardHeaderStyled
//         title={<Typography variant="h3">Your Teams </Typography>}
//         action={<SearchAction search={search} />}
//       />
//     }
//     <CardContentStyled>
//       <List teams={teams} />
//     </CardContentStyled>
//   </MuiCardStyled>
// );

// TeamListView.propTypes = {
//   search: PropTypes.bool,
//   teams: PropTypes.arrayOf(
//     PropTypes.shape({
//       text: PropTypes.string.isRequired,
//       version: PropTypes.string,
//       status: PropTypes.string,
//     })
//   ).isRequired,
// };

// const List = ({ teams }) => {
//   console.log(teams);
//   if (teams.length > 0) {
//     // TODO: fix the link
//     return (
//       <MuiList dense={false}>
//         {teams.map((item, index) => (
//           <ListItemStyled key={index}>
//             <Link to={`/team/${item._id}/info`} style={{ color: "#000" }}>
//               <Typography
//                 variant="body3"
//                 style={{
//                   borderBottom: "0.1em solid black",
//                   padding: "0.5em",
//                 }}
//               >
//                 {item.name}
//               </Typography>
//             </Link>
//           </ListItemStyled>
//         ))}
//       </MuiList>
//     );
//   }
//   return (
//     <PaddedDiv>
//       {/* <Alert severity="info">No items to display!</Alert> */}
//     </PaddedDiv>
//   );
// };

// List.propTypes = {
//   teams: PropTypes.array,
// };

// const SearchAction = ({ search, handleInputChange }) =>
//   search && (
//     <div>
//       <OutlinedInputStyled
//         placeholder="Search..."
//         onChange={handleInputChange}
//         startAdornment={<InputAdornment position="start"></InputAdornment>}
//       />
//     </div>
//   );

// SearchAction.propTypes = {
//   search: PropTypes.bool,
//   handleInputChange: PropTypes.func,
// };

// export default TeamListView;

// import React from "react";
// import Button from "../button.component";
// import { Link } from "react-router-dom";
// import styled from "styled-components";

// import PropTypes from "prop-types";
// import { makeStyles } from "@material-ui/core/styles";
// import ListItem from "@material-ui/core/ListItem";
// import { List as MuiList } from "@material-ui/core";

// import ListItemText from "@material-ui/core/ListItemText";
// import { FixedSizeList } from "react-window";
// import MaterialTable from "material-table";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import Typography from "@material-ui/core/Typography";
// import SearchIcon from "@material-ui/icons/Search";
// import Alert from "@material-ui/lab/Alert";
// import {
//   MuiCardStyled,
//   CardContentStyled,
//   OutlinedInputStyled,
//   CardHeaderStyled,
//   ListItemStyled,
//   TextDiv,
//   VersionDiv,
//   StatusDiv,
//   StatusGreenDiv,
//   PaddedDiv,
// } from "./styled";
// // import { List as MuiList } from "@material-ui/core";

// // const useStyles = makeStyles((theme) => ({
// //   root: {
// //     width: "100%",
// //     height: 400,
// //     maxWidth: 300,
// //     backgroundColor: theme.palette.background.paper,
// //   },
// // }));

// // function renderRow(props) {
// //   const { index, style } = props;

// //   return (
// //     <ListItem button style={style} key={index}>
// //       <ListItemText primary={`Item ${index + 1}`} />
// //     </ListItem>
// //   );
// // }

// // renderRow.propTypes = {
// //   index: PropTypes.number.isRequired,
// //   style: PropTypes.object.isRequired,
// // };

// export default function TeamListView({ teams = [] }) {
//   const columns = [{ title: "Name", field: "name" }];

//   // const classes = useStyles();

//   return (
//     <List teams={teams}></List>
//     // <div className={classes.root}>
//     //   <FixedSizeList
//     //     height={400}
//     //     width={300}
//     //     itemSize={46}
//     //     itemCount={teams.length}
//     //   >
//     //     {renderRow}
//     //   </FixedSizeList>
//     // </div>
//   );
// }
// const List = ({ list }) => {
//   if (list.length > 0) {
//     return (
//       <MuiList dense={false}>
//         {list.map((item, index) => (
//           <ListItemStyled key={index}>
//             <TextDiv>
//               <Typography variant="body2">{item.text}</Typography>
//             </TextDiv>
//             <VersionDiv>
//               <Typography variant="body2">{item.version}</Typography>
//             </VersionDiv>
//             <StatusDiv>
//               <StatusGreenDiv>
//                 <Typography variant="body2">{item.status}</Typography>
//               </StatusGreenDiv>
//               ) : (
//               <StatusDiv>
//                 <Typography variant="body2">{item.status}</Typography>
//               </StatusDiv>
//             </StatusDiv>
//           </ListItemStyled>
//         ))}
//       </MuiList>
//     );
//   }
//   return (
//     <PaddedDiv>
//       <Alert severity="info">No items to display!</Alert>
//     </PaddedDiv>
//   );
// };

// List.propTypes = {
//   list: PropTypes.array,
// };

// // return (
// // <DataTypesPageStyled>
// //   <DataTypesListStyled>
// //     <MaterialTable
// //       title="Teams"
// //       columns={columns}
// //       data={teams}
// //       options={{
// //         filtering: false,
// //         editable: false,
// //       }}

// // editable={{
// //   onRowUpdate: (newData, oldData) =>
// //     new Promise((resolve) => {
// //       setTimeout(() => {
// //         resolve();
// //         if (oldData) {
// //           onDataTypeEdit(newData);
// //         }
// //       }, 600);
// //     }),
// // }}
// //     />
// //     <Link to="/create_team">
// //       <Button
// //         color="primary"
// //         variant="contained"
// //         type="submit"
// //         data-testid="sign-up-button"
// //       >
// //         Create New DataType
// //       </Button>
// //     </Link>
// //   </DataTypesListStyled>
// // </DataTypesPageStyled>
// // );
// // }

// const DataTypesPageStyled = styled.div`
//   min-height: 100vh;
// `;

// const DataTypesListStyled = styled.div`
//   display: grid;
//   gap: 20px;
//   text-align: right;
//   padding: 50px;
//   button {
//     height: 50px;
//     width: 250px;
//     padding: 20px;
//   }
// `;
