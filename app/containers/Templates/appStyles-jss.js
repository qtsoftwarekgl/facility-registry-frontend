import { darken, lighten } from '@material-ui/core/styles/colorManipulator';

const appFrame = {
  display: 'flex',
  width: '100%',
  minHeight: '100% !important',
  zIndex: 1,
};

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: 0,
    zIndex: 1,
    overflow: 'auto',
  },
  blogWrap: {
    position: 'relative'
  },
  appFrameInner: {
    background: theme.palette.type === 'dark' ? darken(theme.palette.primary.dark, 0.8) : lighten(theme.palette.primary.light, 0.9),
    color: theme.palette.text.primary,
    ...appFrame,
  },
  appFrameOuter: {
    ...appFrame,
  },
  appFrameLanding: {
    backgroundColor: theme.palette.background.default,
    minHeight: 1000,
  },
  appFrameSlider: {
    display: 'flex',
    width: '100%',
    height: '100%',
    [theme.breakpoints.up('lg')]: {
      position: 'absolute',
      overflow: 'hidden',
    },
    backgroundColor: theme.palette.background.default
  },
  topNav: {
    flexDirection: 'column',
  },
  sideNav: {
    flexDirection: 'row',
  },
  content: {
    width: '100%',
    padding: theme.spacing(2),
    minHeight: '100%',
    overflow: 'hidden',
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    backgroundColor: '#e3e3e3'
  },
  outerContent: {
    backgroundSize: 'cover',
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto'
  },
  bgWrap: {
    position: 'fixed',
    background: theme.palette.background.default,
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  headerBg: {},
  halfBg: {},
  fullBg: {},
  bgbar: {
    backgroundAttachment: 'fixed',
    width: '100%',
    top: 0,
    left: 0,
    position: 'absolute',
    '&$headerBg': {
      height: 64
    },
    '&$halfBg': {
      height: 400
    },
    '&$fullBg': {
      height: '100%'
    },
  },
  solidBg: {
    backgroundColor: '#d3d3d3'
  },
  sidebarLayout: {},
  topbarLayout: {},
  mainWrap: {
    height: '100%',
    position: 'relative',
    '& > div': {
      willChange: 'inherit !important' // hack for floating form issue when expaded
    },
    '&$sidebarLayout': {
      paddingTop: theme.spacing(8),
    },
    '&$topbarLayout': {
      width: '100%',
      marginTop: theme.spacing(3),
    },
  },
  preloader: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000,
    background: 'transparent',
    height: 3,
  },
  materialBg: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    opacity: 0.5
  },
  contentPaddingLeft: {
    paddingLeft: theme.spacing(9),
    paddingRight: theme.spacing(2),
  },
  contentPaddingRight: {
    paddingRight: theme.spacing(10),
    paddingLeft: theme.spacing(2),
  },
  contentPaddingLeftSm: {
    paddingLeft: theme.spacing(2)
  },
  contentPaddingRightSm: {
    paddingRight: theme.spacing(2)
  },
  hideApp: {
    display: 'none'
  },
  circularProgress: {
    position: 'fixed',
    top: 'calc(50% - 45px)',
    left: 'calc(50% - 45px)',
  },
  brand: {
    height: 54,
    display: 'flex',
    padding: '10px 10px 5px',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    '& img': {
      width: 20
    },
    '& h3': {
      margin: 0,
      fontSize: 16,
      fontWeight: 500,
      paddingLeft: 10,
      color: theme.palette.common.white,
    }
  },
  light: {},
  pageTitle: {
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      alignItems: 'flex-end',
    },
    '& h4': {
      fontWeight: 700,
      fontSize: 24,
      paddingLeft: 10,
      paddingRight: theme.spacing(1),
      textTransform: 'capitalize',
      color: theme.palette.type === 'dark' ? theme.palette.secondary.light : theme.palette.primary.dark,
      [theme.breakpoints.down('md')]: {
        marginBottom: theme.spacing(3)
      }
    },
  },
});

export default styles;
