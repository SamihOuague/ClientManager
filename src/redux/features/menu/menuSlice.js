import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

function getMenu() {
    return fetch("http://localhost:3001/list").then((res) => {
        return res.json();
    });
}

function addPic(img) {
    return fetch("http://localhost:3002/upload", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({img})
    }).then((res) => {
        return res.json();
    });
}

function addProd(categorie, prod) {
    return fetch("http://localhost:3001/add/" + categorie, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(prod)
    }).then((res) => {
        return res.json();
    });
}

function addCategorie(name) {
    return fetch("http://localhost:3001/add", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name})
    }).then((res) => {
        return res.json();
    });
}

export const postPic = createAsyncThunk(
    "menu/postPic",
    async (img, thunkAPI) => {
        const response = await addPic(img);
        return response;
    }
);

export const postCategorie = createAsyncThunk(
    "menu/postCategorie",
    async (name, thunkAPI) => {
        const response = await addCategorie(name);
        return response;
    }
);

export const postProd = createAsyncThunk(
    "menu/postProd",
    async (data, thunkAPI) => {
        const response = await addProd(data.categorie, data.prod);
        return response;
    }
);

export const fetchProd = createAsyncThunk(
    "menu/fetchProd",
    async (thunkAPI) => {
        const response = await getMenu();
        return response;
    }
);

export const menuSlice = createSlice({
    name: "menu",
    initialState: {
        menu: [],
        showF: false,
        currCat: "",
        currProd: null,
        preview: null,
        imgUrl: null
    },
    reducers: {
        addCategorie: (state, action) => {
            state.menu.push({name: action.payload, prod: []});
        },
        showForm: (state, action) => {
            state.currCat = action.payload;
            state.showF = true;
        },
        closeForm: (state) => {
            state.showF = false;
        },
        getProduct: (state, action) => {
            const { cat, id } = action.payload;
            const currCat = state.menu.find((value) => {
                return value.name === cat;
            });
            if (currCat) {
                state.currProd = currCat.prod.find((value) => {
                    return value.title === id;
                });
            }
        },
        setPreview: (state, action) => {
            state.preview = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProd.fulfilled, (state, action) => {
            state.menu = action.payload;
        });
        builder.addCase(postProd.fulfilled, (state, action) => {
            state.menu.find((value) => {
                return value.name === state.currCat;
            }).prod.push(action.payload);
            state.preview = null;
        });
        builder.addCase(postCategorie.fulfilled, (state, action) => {
            state.menu.push(action.payload.product);
        });
        builder.addCase(postPic.fulfilled, (state, action) => {
            console.log(action.payload);
        });
    }
});

export const { showForm, closeForm, getProduct, setPreview } = menuSlice.actions;

export default menuSlice.reducer;