import { configureStore } from '@reduxjs/toolkit';
import authReducer  from '../features/auth/authSlice'
import packageReducer from '../features/packages/packageSlice'
import deliveryReducer from '../features/Delivery/deliverySlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    packages: packageReducer,
    deliveries: deliveryReducer
  }
});
