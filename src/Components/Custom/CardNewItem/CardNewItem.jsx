import {Card, Box, Typography, Fab} from "../../index.tsx";
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from "@mui/material";
import {useNavigate} from "react-router-dom";

function CardNewItem({title, actionType, Icon, color, t}) {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Card className="centerBox" sx={{paddingTop: '1.2rem', overflow: 'visible', borderRadius: "2rem", marginTop: '-1.5rem'}}>
      <Box>
        <Icon sx={{color: color}} className="icon"/>
      </Box>
      <Typography className="cardNewItemTitle">{t(title)}</Typography>
      <Box>
        <Typography className="cardNewItemSubtitle">{t("add-something")}</Typography>
      </Box>
      <Box>
        <Fab
          className="fabButton"
          sx={{
            color: color, backgroundColor: '#fff'
          }}
          onClick={() => {
            navigate(`new/${actionType}`);
          }}
        >
          <AddIcon className="icon" />
        </Fab>
      </Box>

    </Card>
  );
}

export default CardNewItem;