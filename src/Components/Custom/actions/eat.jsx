import { useEffect } from "react";
import { Grid, TextField, DateTimePicker, Button } from "../..";
import { handleInputChange, selectItem } from "../../../Utils/action";
import { adjustDateTimeForTimezone } from "../../../Utils/Core";

function Eat({data, setData, t}) {
    useEffect(() => {
        setData({...data, 'action_type': 2});
    }, []);

    return (
        <Grid container={true} spacing={2}>
            <Grid size={{xs: 12}}>
                <Grid container={true} spacing={2} className="selectOptions">
                    <Button 
                        color={data.type === 1 ? "secondary" : "primary"} 
                        onClick={() => {
                            handleInputChange('side', null, data, setData);
                            handleInputChange('end_date', null, data, setData)
                            selectItem(1, "type", data, setData);
                        }} 
                        variant="contained" 
                        className="Button"
                    >
                        {t("eat-bottle")}
                    </Button>
                    <Button 
                        color={data.type === 2 ? "secondary" : "primary"} 
                        onClick={() => {
                            handleInputChange('quantity', null, data, setData)
                            selectItem(2, "type", data, setData)
                        }} 
                        variant="contained" 
                        className="Button"
                    >
                        {t("eat-bosom")}
                    </Button>
                </Grid>
            </Grid>
            {
                data.type === 1 ? 
                <Grid size={{xs: 12}}>
                    <TextField 
                        fullWidth={true} 
                        type="number"
                        name="quantity"
                        label={t('quantity') + " (ml)"}
                        onChange={(event) => handleInputChange("quantity", event.target.value, data, setData)}
                        className="formInput"
                        value={data?.quantity ? data.quantity : ""}
                    />
                </Grid> : null
            }
            {
                data.type === 2 ?
                <Grid size={{xs: 12}}>
                    <Grid container={true} spacing={2} className="selectOptions">
                        <Button color={data.side === 2 ? "secondary" : "primary"} onClick={() => selectItem(2, "side", data, setData)} variant="contained" className="Button">{t("right")}</Button>
                        <Button color={data.side === 1 ? "secondary" : "primary"} onClick={() => selectItem(1, "side", data, setData)} variant="contained" className="Button">{t("left")}</Button>
                        <Button color={data.side === 3 ? "secondary" : "primary"} onClick={() => selectItem(3, "side", data, setData)} variant="contained" className="Button">{t("both")}</Button>
                    </Grid>
                </Grid> : null
            }
            <Grid size={{xs: 12}}>
                <DateTimePicker 
                    name="start_date"
                    label={data.type === 1 ? t("data-hour") : t("data-hour-start")}
                    ampm={false}
                    format="DD/MM/YYYY HH:mm"
                    fullWidth={true}
                    onChange={(value) => handleInputChange("start_date", new Date(value.toString()), data, setData)}
                    className="formInput"
                    value={data?.start_date ? adjustDateTimeForTimezone(data?.start_date) : null}
                />
            </Grid>
            {
                data.type === 2 ? 
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
                </Grid> : null
            }
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

export default Eat;