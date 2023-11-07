
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  formControlInput: {
    width: '100%',
    '& label + div input': {
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 0,
      paddingRight: 0
    }
  },
  formInputPadding: {
    padding: 14
  },
  formControlSelect: {
    margin: theme.spacing(1),
    '& .MuiInputLabel-formControl': {
      top: 1,
      left: 4
    }
  },
  formControlSelectInner: {
    '& .MuiInputLabel-formControl': {
      top: 1,
      left: 4
    }
  },
  autoCompleteContainer: {
    paddingTop: 14,
  },
  autoCompleteLabel: {
    fontSize: 12,
    paddingLeft: 10
  },
  menu: {
    width: 200,
  },
  picker: {
    marginTop: 7,
    marginBottom: 7
  },
  icon: {
    top: theme.spacing(2)
  },
  divider: {
    display: 'block',
    margin: `${theme.spacing(3)}px 0`,
  },
  input: {
    margin: theme.spacing(3),
  },
  root: {
    flexGrow: 1,
    '& .MuiStepLabel-root': {
      display: 'block',
      '& .MuiStepLabel-iconContainer': {
        padding: 0
      },
      '& .MuiSvgIcon-root': {
        margin: 'auto'
      }
    },
    padding: 14
  },
  btnHolder: {
    paddingTop: 20,
    textAlign: 'right'
  },
  button: {
    margin: 10
  },
  defaultContainer: {
    backgroundColor: '#f5f5f5',
    margin: 'auto',
    marginTop: 15
  },
  borderDanger: {
    border: '0.063rem solid #db3131',
    borderRadius: 3
  },
  margin: {
    margin: theme.spacing(1),
  },
  required: {
    color: '#db3131',
  }
});

export default styles;
