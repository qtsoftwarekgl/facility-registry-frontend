import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import {
  emphasize, makeStyles, useTheme, createMuiTheme
} from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { lightBlue } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';

const appTheme = createMuiTheme({
  palette: {
    primary: lightBlue
  },
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  input: {
    display: 'flex',
    padding: 0,
    height: 'auto',
    cursor: 'pointer'
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden'
  },
  chip: {
    margin: theme.spacing(0.5, 0.25)
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2),
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 8,
    bottom: 6,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  error: {
    color: '#b92b2b',
    fontSize: 12,
    position: 'relative'
  }
}));

function NoOptionsMessage(props) {
  const { selectProps, innerProps, children } = props;
  return (
    <Typography
      color="textSecondary"
      className={selectProps.classes.noOptionsMessage}
      {...innerProps}
    >
      {children}
    </Typography>
  );
}

NoOptionsMessage.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired,
};

NoOptionsMessage.defaultProps = {
  children: null,
  innerProps: null
};

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

inputComponent.propTypes = {
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

inputComponent.defaultProps = {
  inputRef: undefined
};

function Control(props) {
  const {
    children,
    innerProps,
    innerRef,
    selectProps: { classes, TextFieldProps },
  } = props;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: classes.input,
          ref: innerRef,
          children,
          ...innerProps,
        },
      }}
      {...TextFieldProps}
    />
  );
}

Control.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  selectProps: PropTypes.object.isRequired,
};

Control.defaultProps = {
  children: null,
  innerProps: null,
  innerRef: undefined
};

function Option(props) {
  const {
    innerRef,
    isFocused,
    isSelected,
    innerProps,
    children
  } = props;
  return (
    <MenuItem
      ref={innerRef}
      selected={isFocused}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
      {...innerProps}
    >
      {children}
    </MenuItem>
  );
}

Option.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  isFocused: PropTypes.bool,
  isSelected: PropTypes.bool,
};

Option.defaultProps = {
  children: null,
  innerProps: null,
  innerRef: undefined,
  isFocused: false,
  isSelected: false
};

function Placeholder(props) {
  const { selectProps, innerProps, children } = props;
  return (
    <Typography
      color="textSecondary"
      className={selectProps.classes.placeholder}
      {...innerProps}
    >
      {children}
    </Typography>
  );
}

Placeholder.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired,
};

Placeholder.defaultProps = {
  children: null,
  innerProps: null,
};

function SingleValue(props) {
  const { selectProps, children, innerProps } = props;
  return (
    <Typography className={selectProps.classes.singleValue} {...innerProps}>
      {children}
    </Typography>
  );
}

SingleValue.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired,
};

SingleValue.defaultProps = {
  children: null,
  innerProps: null,
};

function ValueContainer(props) {
  const { selectProps, children } = props;
  return <div className={selectProps.classes.valueContainer}>{children}</div>;
}

ValueContainer.propTypes = {
  children: PropTypes.node,
  selectProps: PropTypes.object.isRequired,
};

ValueContainer.defaultProps = {
  children: null,
};

function MultiValue(props) {
  const {
    children,
    selectProps,
    removeProps,
    isFocused
  } = props;
  return (
    <Chip
      tabIndex={-1}
      label={children}
      className={classNames(selectProps.classes.chip, {
        [selectProps.classes.chipFocused]: isFocused,
      })}
      onDelete={removeProps.onClick}
      deleteIcon={<CancelIcon {...removeProps} />}
    />
  );
}

MultiValue.propTypes = {
  children: PropTypes.node,
  isFocused: PropTypes.bool,
  removeProps: PropTypes.object.isRequired,
  selectProps: PropTypes.object.isRequired,
};

MultiValue.defaultProps = {
  children: null,
  isFocused: false,
};

function Menu(props) {
  const { selectProps, innerProps, children } = props;
  return (
    <Paper square className={selectProps.classes.paper} {...innerProps}>
      {children}
    </Paper>
  );
}

Menu.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object,
};

Menu.defaultProps = {
  children: null,
  innerProps: null,
  selectProps: null,
};

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

const SelectSuggestions = (props) => {
  const {
    label, suggestions, onSelect, onInputChange, errorMessage, isLoading, disable
  } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [single, setSingle] = React.useState(null);
  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    setOptions(suggestions);
  }, [suggestions]);

  function handleChangeSingle(value) {
    setSingle(value);
    onSelect(value);
  }

  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit',
      },
    }),
  };

  return (
    <div className={classes.root}>
      <NoSsr>
        <ThemeProvider theme={appTheme}>
          {errorMessage
            ? (
              <span className={classes.error}>
                {errorMessage}
              </span>
            )
            : null}
          <Select
            isLoading={isLoading}
            isClearable
            classes={classes}
            styles={selectStyles}
            inputId="react-select-single"
            TextFieldProps={{
              label,
              InputLabelProps: {
                htmlFor: 'react-select-single',
                shrink: true,
              },
              placeholder: label
            }}
            isDisabled={disable}
            onInputChange={(value) => onInputChange(value)}
            options={options}
            components={components}
            value={single}
            onChange={handleChangeSingle}
          />
        </ThemeProvider>
      </NoSsr>
    </div>
  );
};

SelectSuggestions.propTypes = {
  label: PropTypes.string.isRequired,
  suggestions: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  disable: PropTypes.bool.isRequired
};

export default SelectSuggestions;
