import React, { useEffect ,useState } from 'react';
import { fetchProduct } from '../../redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FiEdit2 } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { createProduct } from '../../redux/productSlice';
function Product() {
  const { handleSubmit, register } = useForm();
  const [isEdit , setIsEdit] = useState(false) ;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProduct());
  }, []);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
  
    boxShadow: 24,
    p: 4,
  };

  const { product } = useSelector((state) => state.product);

  const handleEdit = () => {
    setIsEdit(true)
    handleOpen()
  }
  const columns = [
    {
      field: 'image',
      headerName: 'Image',
      width: 100,
      renderCell: (params) => (
        <div>
          <img
            className="object-contain w-14"
            src={`${import.meta.env.VITE_API_URL}/${params.value}`}
          />
        </div>
      ),
    },
    { field: 'name', headerName: 'Name', width: 100 },
    {
      field: 'price',
      headerName: 'Price(Rs.)',
      width: 150,
    },
    {
      field: 'category',
      headerName: 'Category',
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 250,
    },
    {
      field: 'discountPrice',
      headerName: 'Discount Price(Rs.)',
    },
    {
      field: 'stock',
      headerName: 'Stock Avail.',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => (
        <div className="flex m-2 gap-2 cursor-pointer">
          <FiEdit2 size={26} onClick={handleEdit} className="text-blue-500" />

          <MdDeleteOutline size={26} className="text-red-500" />
        </div>
      ),
    },
  ];

  const onSubmit = async (data) => {
    console.log(data.discountPercentage);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('image', data.image[0]);
    formData.append('category', data.category);
    formData.append('stock', data.stock);
    formData.append('description', data.description);
    formData.append('discountPercentage', data.discountPercentage);
    console.log('formdata', formData);
    await dispatch(createProduct(formData));
    dispatch(fetchProduct());
    handleClose();
  };
  
  const handleButtonClick = () => {
    setIsEdit(false);
    handleOpen()
  }

  return (
    <div className="m-10">
      <button
        onClick={handleButtonClick}
        className="bg-blue-500 px-6 py-2 rounded-sm my-4 text-white font-semibold"
      >
        Add Product
      </button>
      <Box sx={{ height: 300, width: '100%' }}>
        <DataGrid
          rows={product}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
        />
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Name</label>
            <input
              className="input_field"
              type="text"
              {...register('name')}
              placeholder="Enter name"
            />
            <label>Price</label>
            <input
              className="input_field"
              type="number"
              {...register('price')}
              placeholder="Enter price"
            />
            <label>Image</label>
            <input
              className="input_field"
              type="file"
              {...register('image')}
              placeholder="Enter price"
            />
            <label>Category</label>
            <input
              className="input_field"
              type="text"
              {...register('category')}
              placeholder="Enter category"
            />
            <label>Description</label>
            <input
              type="text"
              className="input_field"
              {...register('description')}
              placeholder="Enter category"
            />
            <label>Stock</label>
            <input
              type="text"
              className="input_field"
              {...register('stock')}
              placeholder="Enter Stock"
            />
            <label>Discount Percentage</label>
            <input
              type="number"
              className="input_field"
              {...register('discountPercentage')}
              placeholder="Enter Discount"
            />
            <button
              className="bg-blue-500 px-6 py-2 rounded-md mt-2 text-white"
              type="submit"
            >
           {isEdit ? "Update Product" :   "Add Product" }
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default Product;
