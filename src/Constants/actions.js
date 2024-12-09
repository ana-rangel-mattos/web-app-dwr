import CribIcon from '@mui/icons-material/Crib';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SpaIcon from '@mui/icons-material/Spa';

const ACTIONS = [
  {
    title: "sleep",
    actionType: 1,
    Icon: CribIcon,
    color: '#4b10a9'
  },
  {
    title: "eat",
    actionType: 2,
    Icon: LocalDiningIcon,
    color: '#47c869'
  },
  {
    title: "diaper",
    actionType: 3,
    Icon: SpaIcon,
    color: '#f4cc1d'
  }
];

export { ACTIONS };