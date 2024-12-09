import {Box, Grid, IconButton, Avatar, Typography, CardNewItem, CustomList} from "../Components";
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import baby from "../assets/images/baby.png"
import {useNavigate} from "react-router-dom";
import {useTheme} from "@mui/material";
import {ACTIONS} from "../Constants/actions";
import { useEffect, useState } from "react";
import { getItem, getUserID, list } from "../Services/supabase";
import { useAppContext } from "../Services/Context";
import { calculateDuration } from "../Utils/Core";

function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [profile, setProfile] = useState([]);
  const { translate } = useAppContext();

  async function loadData() {
    const userID = await getUserID()
    
    const result = await list("action-student");
    const p = await getItem("profile", [{field: "user_id", value: userID}])
    if (result) {
        setData(result);
    }

    if (p) {
      setProfile(p);
    }
  }

  useEffect(() => {
      loadData();
  }, []);

  return (
    <>
      <Grid container={true} spacing={4} padding={1.75} sx={{height: '25vh'}}>
          <Grid size={{xs: 12}}>
              <Grid container={true} sx={{paddingTop: '1.25rem'}}>
                  <Grid size={{xs: 4}} className="centerBox">
                      <IconButton
                        onClick={() => navigate("/dashboard")}
                        className="iconButton"
                        sx={{
                          border: `2px solid ${theme.palette.primary.dark}`,
                        }}
                      >
                          <SignalCellularAltIcon
                            className="icon"
                            sx={{
                              color: `${theme.palette.primary.dark}`,
                            }}
                          />
                      </IconButton>
                      <Box className="boxText">
                        <Typography className="text2" sx={{color: `${theme.palette.secondary.contrastText}`}}>{profile?.height} cm</Typography>
                        <Typography className="text3" sx={{color: `${theme.palette.secondary.contrastText2}`}}>{translate("height")}</Typography>
                      </Box>
                  </Grid>
                  <Grid size={{xs: 4}} className="centerBox">
                    <Avatar
                      src={baby}
                      sx={{
                        width: 90,
                        height: 90,
                      }}
                    />
                    <Box className="boxText">
                      <Typography className="text1" sx={{color: `${theme.palette.primary.contrastText}`}}>{profile?.name}</Typography>
                      <Typography className="text3" sx={{color: `${theme.palette.primary.contrastText}`}}>{profile?.birth ? calculateDuration(profile.birth, "days") : 0} {translate("days")}</Typography>
                    </Box>
                  </Grid>
                  <Grid size={{xs: 4}} className="centerBox">
                    <IconButton
                      onClick={() => navigate("/settings")}
                      className="iconButton"
                      sx={{
                        border: `2px solid ${theme.palette.primary.dark}`,
                      }}
                    >
                      <SettingsIcon
                        className="icon"
                        sx={{
                          color: `${theme.palette.primary.dark}`,
                        }}
                      />
                    </IconButton>
                    <Box className="boxText">
                      <Typography className="text2" sx={{color: `${theme.palette.secondary.contrastText}`}}>{profile?.weight} kg</Typography>
                      <Typography className="text3" sx={{color: `${theme.palette.secondary.contrastText2}`}}>{translate("weight")}</Typography>
                    </Box>
                  </Grid>
              </Grid>
          </Grid>
          <Grid size={{xs: 12}}>
              <Grid container={true} spacing={2}>
                {
                  ACTIONS.map((action, index) => {
                    return (
                      <Grid size={{xs: 4}} key={index}>
                        <CardNewItem
                          title={action.title}
                          actionType={action.actionType}
                          color={action.color}
                          Icon={action.Icon}
                          t={translate}
                        />
                      </Grid>
                    )
                  })
                }
              </Grid>
          </Grid>
      </Grid>
      <Grid
        container={true}
        spacing={4}
        sx={{
          height: '75vh',
          backgroundColor: `${theme.palette.primary.main}`,
      }}
      >
        <Grid size={{xs: 12}} sx={{height: '53vh', marginTop: '10.5rem', overflow: 'auto'}}>
            <CustomList items={data}/>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;