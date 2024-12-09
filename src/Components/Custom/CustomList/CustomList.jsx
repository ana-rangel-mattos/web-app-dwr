import {Avatar, List, ListItem, ListItemAvatar, ListItemText, useTheme} from "@mui/material";
import CribIcon from '@mui/icons-material/Crib';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SpaIcon from '@mui/icons-material/Spa';
import { useAppContext } from "../../../Services/Context";
import { useNavigate } from "react-router-dom";

function CustomList({items, ...props}) {
  const { translate } = useAppContext();
  const navigate = useNavigate()
  const theme = useTheme();

  function getIcon(action_type) {
    switch(action_type) {
      case 1:
        return <CribIcon />;
      case 2:
        return <LocalDiningIcon />;
      case 3:
        return <SpaIcon />;
      default:
        return <CribIcon />;
    }
  }

  function getPrimaryText(action_type) {
    switch(action_type) {
      case 1:
        return translate("sleep");
      case 2:
        return translate("eat");
      case 3:
        return translate("diaper");
      default:
        return translate("sleep");
    }
  }

  function subtitleSleep(item) {
    const duration = 0;
    return `${duration} ${translate('min')} ${translate('from')} ${item.startDate} ${translate('to')} ${item.endDate}`;
  }

  function subtitleEat(item) {
    return "Comendo";
  }

  function subtitleDiaper(item) {
    return "Trocando a fralda";
  }

  function getSubtitles(item) {
    switch(item.action_type) {
      case 1:
        return subtitleSleep(item);
      case 2:
        return subtitleEat(item);
      case 3:
        return subtitleDiaper(item);
    }
  }

  const colors = {
    1: "#4b10a9",
    2: "#47c869",
    3: "#f4cc1d",
  }

  return (
    <List {...props} sx={{marginLeft: '1rem', marginRight: '1rem'}}>
      {
        items.map((item, index) => (
          <ListItem 
            key={index} 
            sx={{backgroundColor: `${theme.palette.common.white}`, borderRadius: '2.25rem', marginTop: '1rem'}}
            onClick={() => navigate(`/${item.action_type}/${item.id}`)}
          >
            <ListItemAvatar>
              <Avatar sx={{backgroundColor: `${colors[item.action_type]}`}}>
                {getIcon(item.action_type)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={getPrimaryText(item.action_type)} secondary={getSubtitles(item)} />
          </ListItem>
        ))
      }
    </List>
  );
}

export default CustomList;