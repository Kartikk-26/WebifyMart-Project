// components/CheckoutModal.js
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  InputAdornment,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { FaUser, FaAddressCard, FaCity, FaGlobe, FaTimes, FaCreditCard } from 'react-icons/fa';

const CheckoutModal = ({ open, onClose, totalAmount, onPayNow }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [userId, setUserId] = useState(null);

 
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleFormSubmit = (data) => {
    
    const checkoutData = { ...data, userId };
    onPayNow(checkoutData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Checkout</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <TextField
            {...register('firstName', { required: 'First name is required' })}
            label="First Name"
            fullWidth
            margin="normal"
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaUser />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            {...register('lastName', { required: 'Last name is required' })}
            label="Last Name"
            fullWidth
            margin="normal"
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaUser />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            {...register('streetAddress', { required: 'Street address is required' })}
            label="Street Address"
            fullWidth
            margin="normal"
            error={!!errors.streetAddress}
            helperText={errors.streetAddress?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaAddressCard />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            {...register('city', { required: 'City is required' })}
            label="City"
            fullWidth
            margin="normal"
            error={!!errors.city}
            helperText={errors.city?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaCity />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            {...register('state', { required: 'State is required' })}
            label="State"
            fullWidth
            margin="normal"
            error={!!errors.state}
            helperText={errors.state?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaGlobe />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            {...register('zipCode', { required: 'Zip code is required' })}
            label="Zip Code"
            fullWidth
            margin="normal"
            error={!!errors.zipCode}
            helperText={errors.zipCode?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaAddressCard />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            {...register('country', { required: 'Country is required' })}
            label="Country"
            fullWidth
            margin="normal"
            error={!!errors.country}
            helperText={errors.country?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaGlobe />
                </InputAdornment>
              ),
            }}
          />
          <Typography variant="body1" sx={{ mt: 2, display: 'flex' }}>
           
            Total Amount: Rs {totalAmount.toFixed(2)}
          </Typography>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="error" startIcon={<FaTimes />}>
          Cancel
        </Button>
        <Button onClick={handleSubmit(handleFormSubmit)} color="primary" variant="contained" startIcon={<FaCreditCard />}>
          Pay Now
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CheckoutModal;
