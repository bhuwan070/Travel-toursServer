const Blogs = require("../models/Blog");

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find();

    res.status(200).json({
      status: true,
      message: "Blogs found successfully",
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error fetching blogs",
      error: error.message,
    });
  }
};

const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blogs.findById(id);
    if (!blog) {
      res.status(404).json({
        status: false,
        message: "Blog no found!",
        error: error.message,
      });
    }

    res.status(200).json({
      status: true,
      message: "Blog has been fetched successfully!",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error fetching bolg",
      error: error.message,
    });
  }
};

// const createBlogs = asyc (req,res) =>{
//     try {
//         const newBlogs = new Blogs(req.body);
//         const savedBlogs = await newBlogs.save()
//         res.status(200).json({
//             status:true,
//             message:"Bolg is created successfully",
//             data: savedBlogs,
//         })
//         } catch (error) {
//             res.status(500).json({
//                 status:false,
//                 message:"Error creating blog",
//                 error:error.message,
//             })
        
//     }
};

module.exports = { getAllBlogs, getBlogById, createBlogs };
