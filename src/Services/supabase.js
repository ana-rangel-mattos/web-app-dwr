import { createClient } from '@supabase/supabase-js';
import { getUser } from '../Utils/Core';
import i18n from '../i18n';

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

async function getUserID() {
    let user = null;
    if (localStorage.getItem("session")) {
        user = getUser();
    }
    return user ? user.id : null;
}

async function updateData(table, data, id) {
    if (id) {
        data.id = id;
    }

    if (data.language && data.language !== localStorage.getItem("language")) {
        i18n.changeLanguage(data.language)
        localStorage.setItem("language", data.language);
    }

    return await supabase.from(table).upsert(data).select();
}

async function deleteData(table, id) {
    return await supabase.from(table).delete().eq("id", id);
}

async function getItem(table, conditions) {
    let query = supabase.from(table).select();

    if (conditions && conditions.length > 0) {
        for (let condition of conditions) {
            query = query.eq(condition.field, condition.value);
        }
    }
    
    const {data, error} = await query.order('created_at', {ascending: false});

    if (error) {
        throw error;
    }
    return data[0];
}

async function list(table) {
    const userID = await getUserID();
    const {data, error} = await supabase.from(table).select().eq("user_id", userID).order('created_at', {ascending: false});
    if (error) {
        throw error;
    }
    return data;
}

async function saveData(table, data) {
    return updateData(table, data, null);
}

export { saveData, updateData, deleteData, getItem, list, getUserID }

