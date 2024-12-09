import { useEffect, useState } from "react";
import { AppBar, Button, DatePicker, DateTimePicker, Grid, TextField, Typography } from "../Components";
import { useAppContext } from "../Services/Context";
import { adjustDateTimeForTimezone, getUser, handleChange } from "../Utils/Core";
import { handleInputChange, selectItem } from "../Utils/action";
import { getItem, getUserID, saveData } from "../Services/supabase";
import { useNavigate } from "react-router-dom";
import { logOut } from "../Services/authentication";

function Settings(){
  const [data, setData] = useState({});
  const {translate, showAlert, supabase} = useAppContext();
  const navigate = useNavigate();

  async function onLoad() {
    const userID = await getUserID();
    const result = await getItem("profile", [{field: "user_id", value: userID}]);
    setData(result);
  }

  useEffect(() => {
    onLoad();
  }, [])

  return (
    <>
      <AppBar title={translate("settings")}/>
      <Grid container={true} spacing={2} sx={{mt: 2, mr: 2, ml: 2}}>
        <Grid size={{xs: 12}}>
          <TextField 
            className="formInput" 
            placeholder={translate("name")} 
            fullWidth={true} 
            onChange={
              (event) => handleChange(data, setData, event.target.value, "name")
            } 
            value={data.name}
          />
      </Grid>
      <Grid size={{xs: 12}}>
        <TextField 
          type="number" 
          className="formInput" 
          placeholder={translate("weight")} 
          fullWidth={true} 
          onChange={
            (event) => handleChange(data, setData, event.target.value, "weight")
          } 
          value={data.weight}
        />
      </Grid>
      <Grid size={{xs: 12}}>
          <TextField type="number" className="formInput" placeholder={translate("height")} fullWidth={true} onChange={(event) => handleChange(data, setData, event.target.value, "height")} value={data.height}/>
      </Grid>
      <Grid size={{xs: 12}}>
        <DatePicker
          name="birth"
          placeholder={translate("birth")}
          ampm={false}
          format="DD/MM/YYYY"
          fullWidth={true}
          onChange={(value) => handleInputChange("birth", new Date(value.toString()), data, setData)}
          className="formInput"
          value={data?.birth ? adjustDateTimeForTimezone(data?.birth) : null}
        />
      </Grid>
      <Grid size={{xs: 12}}>
          <Typography variant="h6">{translate("language")}</Typography>
      </Grid>
      <Grid size={{xs: 12}}>
          <Grid container={true} spacing={2} className="selectOptions">
              <Button 
                  color={data.language === "pt" ? "secondary" : "primary"} 
                  onClick={() => selectItem("pt", "language", data, setData)} 
                  variant="contained" 
                  className="Button"
              >
                  {translate("portuguese")}
              </Button>
              <Button 
                  color={data.language === "en" ? "secondary" : "primary"} 
                  onClick={() => selectItem("en", "language", data, setData)} 
                  variant="contained" 
                  className="Button"
              >
                  {translate("english")}
              </Button>
              <Button 
                  color={data.language === "sp" ? "secondary" : "primary"} 
                  onClick={() => selectItem("sp", "language", data, setData)} 
                  variant="contained" 
                  className="Button"
              >
                  {translate("spanish")}
              </Button>
          </Grid>
      </Grid>
      <Grid size={{xs: 12}}>
          <Button variant="contained" className="Button" fullWidth={true} sx={{mt: 2}} onClick={async () => {
              try {
                  let user;
                  if (localStorage.getItem("session")) {
                      user = getUser();
                  }
                  data.user_id = user.id;
                  await saveData("profile", data);
                  showAlert("Configurações salvas com sucesso!", "success");
                  setTimeout(() => {
                      navigate('/');
                  }, 3000)
              }
              catch(err) {
                  showAlert("Ocorreu um erro ao salvar!", "error");
              }
          }}>
              {translate("save")}
          </Button>
        </Grid>
        <Grid size={{xs: 12}}>
          <Button 
            variant="contained" 
            className="Button" 
            fullWidth={true} 
            onClick={() => logOut(supabase, navigate)}
            sx={{mt: 32}}>{translate("log-out")}</Button>
        </Grid>
      </Grid>
    </>
  )
}

export default Settings;