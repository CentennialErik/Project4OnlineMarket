import Product from "../models/product.model.js";
import mongoose from "mongoose";

// GET all requests
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(401).json({ error: "Sorry, we couldnt get the products" });
  }
};

// // GET specific id requests
// const getProduct = async (req, res) => {
//   const productId = req.params.id;
//   try {
//     const product = await Product.findById(productId); // i might need to fix this -- Yeah this didnt work for searching by ID
//     if (product) {
//       res.status(201).json(product);
//     } else {
//       res.status(500).json({ message: "Product was not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Server could not fetch that data" });
//   }
// };

const ProductByID = async (req, res, next, id) => { //for new productIDsearch
    console.log('Searching for product by ID');
    try {
        let product = await Product.findById(id);
      if (!product)
            return res.status('400').json({
                error: "Product not found",
            });
      req.profile = product;
       console.log(product);
        next();
    } catch (err) {
        return res.status('400').json({
            error: "Could not retrieve Product",
        });
    }
};

const read = (req, res) => {    // read data send to frontend
    return res.json(req.profile);
};

// // // POST product
// const createProduct = async (req, res) => {
//   const { name, description, price, quantity } = req.body;
//   try {
//     const newProduct = await Product.create({
//       name,
//       description,
//       price,
//       quantity,
//     });
//     res.status(201).json(newProduct);
//   } catch (error) {
//     res.status(500).json({ error: "Could not create product" });
//   }
// };


//post Create product
const createProduct = async (req, res) => {
  console.log('Attempting to add item');
  try {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
    console.log('item added');
  } catch (err) {
    console.log(err)
    res.status(500).send();
  }
};


// UPDATE all requests
const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const product = await Product.findOneAndUpdate(
        { _id: id },
        {
          ...req.body,
        }
      );
      res.status(201).json({ message: "Product succesfully changed" });
    } else {
      res.status(401).json({ message: "This is not a valid product" });
    }
  } catch (error) {
    res.status(500).json({ error: "Could not update product" });
  }
};

// DELETE specific requests
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const product = await Product.findOneAndDelete({ _id: id });
      res.status(201).json({ message: "Product successfully deleted" });
    } else {
      res.status(401).json({ message: "That product id is not valid" });
    }
  } catch (error) {
    res.status(500).json({ error: "Could not delete product" });
  }
};

////searchs filter
const searchProdName = async (req, res) => {
    console.log("Searching for name that contains: ", req.query.name );
    try {
        let products;
        if (req.query.name) {
            console.log("Showing searchs that contain: ", req.query.name);
            products = await Product.find({ name: { $regex: req.query.name } });
            console.log(products)
        } else {
            console.log(req.query.name, "not found. Displaying all products")
            products = await Product.find({});
        }
        res.json(products);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        });
    }
};



export default {
 ProductByID,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProdName,
  read,
};
