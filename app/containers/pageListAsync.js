import Loadable from 'react-loadable';
import Loading from 'enl-components/Loading';

export const Table = Loadable({
  loader: () => import('./Pages/Table/BasicTable'),
  loading: Loading,
});
export const Form = Loadable({
  loader: () => import('./Pages/Forms/ReduxForm'),
  loading: Loading,
});
export const Login = Loadable({
  loader: () => import('./Login'),
  loading: Loading,
});
export const ComingSoon = Loadable({
  loader: () => import('./Pages/ComingSoon'),
  loading: Loading,
});
export const BlankPage = Loadable({
  loader: () => import('./Pages/BlankPage'),
  loading: Loading,
});
export const NotFound = Loadable({
  loader: () => import('./NotFound/NotFound'),
  loading: Loading,
});
export const Error = Loadable({
  loader: () => import('./Pages/Error'),
  loading: Loading,
});
export const Maintenance = Loadable({
  loader: () => import('./Pages/Maintenance'),
  loading: Loading,
});
export const Parent = Loadable({
  loader: () => import('./Parent'),
  loading: Loading,
});
export const NotFoundDedicated = Loadable({
  loader: () => import('./Pages/Standalone/NotFoundDedicated'),
  loading: Loading,
});
export const CreateUser = Loadable({
  loader: () => import('./UserSettings/CreateUser'),
  loading: Loading,
});
export const EditUser = Loadable({
  loader: () => import('./UserSettings/CreateUser'),
  loading: Loading,
});
export const UserList = Loadable({
  loader: () => import('./UserSettings/UserList'),
  loading: Loading,
});
export const AuditLogs = Loadable({
  loader: () => import('./AuditLogs'),
  loading: Loading,
});
export const Services = Loadable({
  loader: () => import('./Settings/Services'),
  loading: Loading,
});
export const Packages = Loadable({
  loader: () => import('./Settings/Packages'),
  loading: Loading,
});
export const FacilityTC = Loadable({
  loader: () => import('./FacilityTC'),
  loading: Loading,
});
export const HealthFacilities = Loadable({
  loader: () => import('./GeneralSettings/HealthFacilities'),
  loading: Loading,
});
export const ResetPasswordNewLogin = Loadable({
  loader: () => import('./Pages/ResetPassword'),
  loading: Loading,
});