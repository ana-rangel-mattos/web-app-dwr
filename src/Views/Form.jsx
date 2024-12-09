import {useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Diaper, Eat, Sleep, Grid, AppBar } from "../Components";
import { useAppContext } from "../Services/Context";
import { deleteData, getItem, getUserID, saveData, updateData } from "../Services/supabase";
import { validateFields } from "../Utils/validators";
import { getUser } from "../Utils/Core";

function Form() {
    const [data, setData] = useState({});
    const {translate, showAlert} = useAppContext();
    const params = useParams();
    const navigate = useNavigate();

    const actionType = params.type;
    const id = params.id;

    function getParamType() {
        switch (actionType) {
            case '1':
                return <Sleep data={data} setData={setData} t={translate} />;
            case '2':
                return <Eat data={data} setData={setData} t={translate} />;
            case '3':
                return <Diaper data={data} setData={setData} t={translate} />;
            default:
                return <Sleep data={data} setData={setData} t={translate} />;
        }
    }

    function getTitle(actionType) {
        switch (actionType) {
            case '1':
                return "sleep";
            case '2':
                return "eat";
            case '3':
                return "diaper";
            default:
                return "sleep";
        }
    }

    async function loadData(id) {
        const userID = await getUserID();

        if (id) {
            const result = await getItem("action-student", [{field: "id", value: id}, {field: "user_id", value: userID}]);
            setData(result);
        }
    }

    useEffect(() => {
        if (params && params.id) {
            loadData(id);
        }
    }, []);

    return (
        <>
            <AppBar title={translate(getTitle(actionType))} id={id} _delete={async () => {
                const _confirm = confirm("Deseja mesmo remover este item?");
                if (_confirm) {
                    await deleteData("action-student", id);
                    showAlert("Item deletado com sucesso!", "success");
                    setTimeout(() => {
                        navigate('/');
                    }, 3000);
                }   else {
                    showAlert("Ação cancelada", "error");
                }
            }}/>
            <Grid container={true} sx={{ml: 2, mr: 2, mt: 1.5}}>
                <Grid size={{xs: 12}} spacing={2}>
                    { getParamType() }
                    <Button 
                        type="submit" 
                        fullWidth={true}
                        variant="contained"
                        onClick={async () => {
                            try {
                                const fields = validateFields(data, actionType);
                                if (!fields) {
                                    if (id) {
                                        await updateData("action-student", data, id);
                                    }   else {
                                        data.user_id = getUser().id;
                                        await saveData("action-student", data);
                                    }
                                    showAlert(`Item ${id ? "editado" : "criado"} com sucesso!`, "success");
                                    setTimeout(() => {
                                        navigate("/");
                                    }, 3000);
                                }   
                                else {
                                    showAlert(`Os campos ${fields.join(", ")} são obrigatórios!`, "warning");
                                }
                            }
                            catch(err) {
                                showAlert(`${err.message}`, "error");
                            }
                        }}
                        sx={{mt: 3, mb: 3}}
                        className="Button"
                    >
                        {translate("save")}
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default Form;