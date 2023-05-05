import { PropTypes } from "prop-types";
import { Breadcrumbs, Link, Typography } from "@mui/material";

function TopBalk({ currPagina, clickHandler }) {
  if (currPagina === "groveSorteer") {
    return (
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="text.primary" sx={{ cursor: "default" }}>
          Globale Sorteer
        </Typography>
        <Link underline="hover" sx={{ cursor: "pointer" }} color="inherit" onClick={clickHandler}>
          Precieze Sorteer
        </Link>
      </Breadcrumbs>
    );
  } else {
    return (
      <Breadcrumbs aria-label="breadcrumb">
        <Link sx={{ cursor: "default" }} color="inherit" underline="none">
          Globale Sorteer
        </Link>
        <Typography color="text.primary" sx={{ cursor: "default" }}>
          Precieze Sorteer
        </Typography>
      </Breadcrumbs>
    );
  }
}

TopBalk.propTypes = {
  currPagina: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default TopBalk;
