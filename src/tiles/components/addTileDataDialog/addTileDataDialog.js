import React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import config from "config";

import "./styles.scss";

export default function AddTileDataDialog(basicData) {
  const [open, setOpen] = React.useState(false);
  const [loadingDate, setLoadingData] = React.useState(false);
  const [primaryValue, setPrimaryValue] = React.useState();
  const [secondaryValue, setSecondaryValue] = React.useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveTileData = () => {
    setLoadingData(true);

    fetch(
      `${config.api.URL}/tiles/${basicData.type}/${basicData.name}/record`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("writeSecret"),
        },
        body: JSON.stringify({
          Primary: primaryValue,
          Secondary: secondaryValue,
        }),
      }
    )
      .then((res) => {})
      .then(
        (result) => {
          setLoadingData(false);
          handleClose();
        },
        (error) => {
          setLoadingData(false);
          console.error(error);
        }
      );
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen} size="medium">
        <AddIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Tile Data</DialogTitle>
        <DialogContent>
          <div className="add-tile-data__dialog-content">
            <TextField
              size="small"
              id="outlined-basic"
              label="Primary value"
              value={primaryValue}
              type="number"
              variant="outlined"
              disabled={loadingDate}
              onChange={(e) => setPrimaryValue(e.target.value)}
            />
            <TextField
              size="small"
              id="outlined-basic"
              label="Secondary value"
              value={secondaryValue}
              type="number"
              variant="outlined"
              disabled={loadingDate}
              onChange={(e) => setSecondaryValue(e.target.value)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveTileData} disabled={loadingDate}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
