import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import menuReducer from "./features/menu/menuSlice";
import panierReducer from "./features/panier/panierSlice";

export default configureStore({
    reducer: {
        auth: authReducer,
        menu: menuReducer,
        panier: panierReducer
    }
});