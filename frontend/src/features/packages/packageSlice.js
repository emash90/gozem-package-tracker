import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import packageService from './packageService'


const initialState = {
    packages: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//create package

export const createPackage = createAsyncThunk('packages/create', async (packageData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await packageService.createPackage(packageData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
//get packages
export const getPackages = createAsyncThunk('packages/getAll', async(_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await packageService.getPackages(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
export const packageSlice = createSlice({
    name: 'packages',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPackage.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createPackage.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.packages.push(action.payload)
            })
            .addCase(createPackage.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getPackages.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPackages.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.packages = action.payload
            })
            .addCase(getPackages.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})
export const {reset} = packageSlice.actions
export default packageSlice.reducer