import { useEffect } from "react";
import { Grid, TextField, DateTimePicker, Button } from "../..";
import { handleInputChange, selectItem } from "../../../Utils/action";
import { adjustDateTimeForTimezone } from "../../../Utils/Core";

function Diaper({data, setData, t}) {
    useEffect(() => {
        setData({...data, 'action_type': 3});
    }, []);
 
    return (
        <Grid container={true} spacing={2}>
            <Grid size={{xs: 12}}>
                <DateTimePicker 
                    name="start_date"
                    label={t("data-hour-start")}
                    ampm={false}
                    format="DD/MM/YYYY HH:mm"
                    fullWidth={true}
                    onChange={(value) => handleInputChange("start_date", new Date(value.toString()), data, setData)}
                    className="formInput"
                    value={data?.start_date ? adjustDateTimeForTimezone(data?.start_date) : null}
                />
            </Grid>
            <Grid size={{xs: 12}}>
                <Grid container={true} spacing={2} className="selectOptions">
                    <Button color={data.type === 1 ? "secondary" : "primary"} onClick={() => selectItem(1, "type", data, setData)} variant="contained" className="Button">{t("diaper-wet")}</Button>
                    <Button color={data.type === 2 ? "secondary" : "primary"} onClick={() => selectItem(2, "type", data, setData)} variant="contained" className="Button">{t("diaper-dirty")}</Button>
                    <Button color={data.type === 3 ? "secondary" : "primary"} onClick={() => selectItem(3, "type", data, setData)} variant="contained" className="Button">{t("diaper-both")}</Button>
                    <Button color={data.type === 4 ? "secondary" : "primary"} onClick={() => selectItem(4, "type", data, setData)} variant="contained" className="Button">{t("diaper-clean")}</Button>
                </Grid>
            </Grid>
            <Grid size={{xs: 12}}>
                <TextField 
                    fullWidth={true} 
                    multiline={true} 
                    rows={6}
                    name="observation"
                    label={t('observation')}
                    onChange={(event) => handleInputChange("observation", event.target.value, data, setData)}
                    className="formInput"
                    value={data?.observation ? data.observation : ""}
                />
            </Grid>
        </Grid>
    );
}

export default Diaper;