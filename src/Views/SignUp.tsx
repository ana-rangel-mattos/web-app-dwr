import {Avatar, Box, Button, Grid, TextField, Typography} from "../Components";
import logo from "../assets/images/logo.png";
import {handleChange} from "../Utils/Core";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useAppContext} from "../Services/Context";
import {validateEmail, validPassword} from "../Utils/validators";
import {signUp} from "../Services/authentication";

function SignUp() {
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
        },
        confirmPassword: {
            value: "",
            error: null,
            helperText: null,
        }
    });
    const { translate } = useAppContext();

    const navigate = useNavigate();
    const { showSnackMessage, showAlert, supabase } = useAppContext();

    async function verifyRegister() {
        const emailValidation = validateEmail(data.email.value);
        const passwordValidation = validPassword(data.password.value);
        setData((d) => ({
            ...d,
            email: {
                value: d.email.value,
                error: emailValidation.error,
                helperText: emailValidation.helperText
            },
            password: {
                value: d.password.value,
                error: passwordValidation.error,
                helperText: passwordValidation.helperText
            }
        }))

        if (passwordValidation.error || emailValidation.error) return;

        if (data.password.value !== data.confirmPassword.value) {
            showAlert("As senhas não coincidem!", 'error');
            return;
        }

        let {data: response, error} = signUp(data.email.value, data.password.value, supabase);

        if (error){
            if (error.message.toString().indexOf("AuthApiError: User already registered") !== -1) {
                showSnackMessage("Usuário Registrado!");
            }
            else if (error.message.toString().length !== "") {
                showSnackMessage(error.toString());
            }
        }
        else {
            showSnackMessage("Usuário criado com sucesso!", 'success');
            navigate("/signin");
            return;
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
                  <Typography variant="h3">{translate("register")}</Typography>
              </Grid>
              <Grid size={{xs: 12}} className="formLabel">
                  <TextField
                    value={data.email.value}
                    label={translate("email")}
                    type="email"
                    fullWidth={true}
                    className="formInput"
                    error={data.email.error}
                    helperText={data.email.helperText}
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
                    error={data.password.error}
                    helperText={data.password.helperText}
                    onChange={(e) => handleChange(data, setData, e.target.value, "password")}
                  />
              </Grid>
              <Grid size={{xs: 12}} className="formLabel">
                  <TextField
                    value={data.confirmPassword.value}
                    label={translate("confirm-password")}
                    type="password"
                    fullWidth={true}
                    className="formInput"
                    onChange={(e) => handleChange(data, setData, e.target.value, "confirmPassword")}
                  />
              </Grid>
              <Grid size={{xs: 12}} className="Link">
                  <Typography variant="overline">{translate("already-have-an-account")} <Link to="/signin">{translate("login")}</Link></Typography>
              </Grid>
              <Grid size={{xs: 12}} className="formLabel">
                  <Button onClick={verifyRegister} fullWidth={true} variant="contained" color="primary" className="Button">{translate("sign-up")}</Button>
              </Grid>
          </Grid>
      </Box>
    )
}

export default SignUp;