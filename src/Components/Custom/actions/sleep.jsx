import { useEffect } from "react";
import { DateTimePicker, Grid, TextField } from "../..";
import { handleInputChange } from "../../../Utils/action";
import { adjustDateTimeForTimezone } from "../../../Utils/Core";

function Sleep({data, setData, t}) {
    useEffect(() => {
        setData({...data, 'action_type': 1});
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
                <DateTimePicker 
                    name="end_date"
                    label={t("data-hour-end")}
                    ampm={false}
                    format="DD/MM/YYYY HH:mm"
                    fullWidth={true}
                    onChange={(value) => handleInputChange("end_date", value, data, setData)}
                    className="formInput"
                    value={data?.end_date ? adjustDateTimeForTimezone(data?.end_date) : null}
                />
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

export default Sleep;