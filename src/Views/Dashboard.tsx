import { AppBar, Grid } from "../Components";
import { useAppContext } from "../Services/Context";

function Dashboard() {
    const { translate } = useAppContext();
    return (
        <Grid container={true}>
            <Grid size={{xs: 12}}>
                <AppBar title={translate("dashboard")}/>
            </Grid>
        </Grid>
    );
}

export default Dashboard;