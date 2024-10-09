const Product = require('./../models/productModel');

exports.createProduct = async (req, res, next) => {
  try {
    console.log(req.file);
    const { name, price, description, stock, category, discountPercentage } =
      req.body;
    const image = req.file.path;

    const product = await Product.create({
      name,
      price,
      description,
      stock,
      category,
      discountPercentage,
      image,
    });
    if (product) {
      res.status(201).json({
        message: 'success',
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.find();
    if (product) {
      res.status(200).json({
        length: product.length,
        product,
      });
    }
  } catch (error) {
    next(eror);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      throw new Error('Product not found');
    }

    res.status(204).json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, description, stock, category, discountPercentage } =
      req.body;

    let image;
    if (req.file) {
      image = req.file.path;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, description, stock, category, discountPercentage, image },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      throw new Error('Product not found');
    }

    res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};
