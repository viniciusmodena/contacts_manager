import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  Paper,
  Typography,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "whitesmoke",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: [400, 400, 400, 400, 400],
};

function ConfirmationModal({ open, handleClose, modalMessage, handleClick }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container sx={style}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5" alignSelf="center">
              Delete Account?
            </Typography>
          </Grid>
          {/* Confirmation Text */}
          <Grid item xs={12}>
            <Typography sx={{ p: 2 }}>{modalMessage}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={6} sx={{ m: 0, p: 0 }}>
                {/* No Button */}
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ m: 0, p: 0, bgcolor: "red" }}
                  onClick={handleClose}
                >
                  No
                </Button>
              </Grid>

              <Grid item xs={6}>
                {/* Yes Button */}
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ m: 0, p: 0 }}
                  onClick={handleClick}
                >
                  Yes
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Modal>
  );
}

export default ConfirmationModal;
