import { Grid, Avatar, Typography, TextField, Button, Box } from "../Components";
import { useAppContext } from "../Services/Context";
import { Link } from "react-router-dom"
import logo from "../assets/images/logo.png";
import { signIn } from "../Services/authentication"
import { useState } from "react";
import { handleChange } from "../Utils/Core";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: {
      value: "",
      error: null,
      helperText: null,
    },
    password: {
      value: "",
      error: null,
      helperText: null,
    }
  });
  const { showSnackMessage, supabase, translate } = useAppContext();

  async function verifyLogin() {
    let {data: response, error} = await signIn(data.email.value, data.password.value, supabase);

    if (error && error.message === "Invalid login credentials") {
        showSnackMessage("Dados do Usuário inválidos!");
    }
    else {
      localStorage.setItem("session", JSON.stringify(response.session));
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate("/");
    }
  }

  return (
    <Box className="Container">
      <Grid container={true}>
        <Grid size={{xs: 12}} className="Avatar">
          <Avatar
            sx={{width: 100, height: 100}}
            src={logo}
          />
        </Grid>
        <Grid size={{xs: 12}} className="formLabel">
          <Typography variant="h3">{translate("login")}</Typography>
        </Grid>
        <Grid size={{xs: 12}} className="formLabel">
          <Typography variant="h5">{translate("welcome")}</Typography>
        </Grid>
        <Grid size={{xs: 12}} className="formLabel">
          <TextField
            value={data.email.value}
            label={translate("email")}
            type="email"
            fullWidth={true}
            className="formInput"
            onChange={(e) => handleChange(data, setData, e.target.value, "email")}
          />
        </Grid>
        <Grid size={{xs: 12}} className="formLabel">
          <TextField
            value={data.password.value}
            label={translate("password")}
            type="password"
            fullWidth={true}
            className="formInput"
            onChange={(e) => handleChange(data, setData, e.target.value, "password")}
          />
        </Grid>
        <Grid size={{xs: 12}} className="Link">
          <Typography variant="overline">{translate("new-to-the-site")} <Link to="/signup">{translate("sign-up")}</Link></Typography>
        </Grid>
        <Grid size={{xs: 12}} className="formLabel">
          <Button onClick={verifyLogin} fullWidth={true} variant="contained" color="primary" className="Button">{translate("login")}</Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SignIn;