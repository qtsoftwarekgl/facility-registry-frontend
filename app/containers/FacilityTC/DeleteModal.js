import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiDialog-paperWidthSm': {
      maxWidth: 900,
      minWidth: 900
    }
  },
  titleRoot: {
    marginBottom: 10
  },
  label: {
    fontWeight: 'bold'
  },
  value: {
    marginLeft: 10
  },
  label_head: {
    fontWeight: 'bold',
    fontSize: '1.125rem',
    borderBottom: '1px dashed #C0C0C0'
  },
}));


const DeleteModal = (props) => {
  const classes = useStyles();
  const { open, onClose , handleCtlBtn} = props;

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        className={classes.root}
      >
        <DialogContent>
          <Grid container spacing={1}>
            <Grid container item xs={12} sm={9} spacing={1}>
              <Grid container item xs={12} sm={12}>
                <Grid item xs={12} sm={6}>
                  <h6 className={[classes.label_head, {}]} style={{ color: 'green' }}>
                    Admin Confirmation
                  </h6>
                </Grid>
              </Grid>
              <Grid container item xs={12} sm={12}>
                <h1 style={{ color: 'grey' }}>are you sure you want to delete this facility type? </h1>
              </Grid>

            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary" variant="outlined" style={{ background: 'red', color: "#fff" }}>
            No
          </Button>
          <Button onClick={()=>{
            handleCtlBtn();
            onClose();
          }} color="primary" variant="outlined" style={{ backgroundColor: 'green', color: "#fff" }}>
            Yes
          </Button>

        </DialogActions>
      </Dialog>
    </div>
  );
};

DeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  auditData: PropTypes.object.isRequired
};

export default DeleteModal;
