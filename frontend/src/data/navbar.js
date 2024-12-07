import {
  faBell,
  faEnvelope,
  faMessage,
} from '@fortawesome/free-regular-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
export const navbarNormal = [
  {
    icon: faCartShopping,
  },
];

export const navbarLogin = [
  {
    icon: faCartShopping,
    iconImg: '🛒',
    key: 'cart',
  },
  {
    icon: faBell,
    iconImg: '🔔',
    key: 'notification',
  },
  {
    icon: faEnvelope,
    iconImg: '✉️',
    key: 'message',
  },
];
