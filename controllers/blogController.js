const Blogs = require("../models/Blog");
const { findByIdAndUpdate, findByIdAndDelete } = require("../models/package");

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

const createBlogs = asyc (req,res) =>{
    try {
        const newBlogs = new Blogs(req.body);
        const savedBlogs = await newBlogs.save()
        res.status(200).json({
            status:true,
            message:"Bolg is created successfully",
            data: savedBlogs,
        })
        } catch (error) {
            res.status(500).json({
                status:false,
                message:"Error creating blog",
                error:error.message,
            })
        
    }
};

const updateBlog = async (req,res) =>{
    try {
        const { id } = req.params();
        const updatedData = await req.body();
        const updatedBlog = await package.findByIdAndUpdate(id, updatedData,{
            new: true,
            runValidators: true,
        })

        if(!updateBlog){
            res.status(404).json({
                status: false,
                message: "Blog not found",
                error: error.message,
            })
        }

        res.status(200).json({
            status:true,
            message: "Blog updated successfully!",
            data: updatedBlog,
        })
    } catch (error) {
        res.status(500).json({
            status:false,
            message: "Error fetching blog",
            error: error.message
        })
        
    }
}

const filterBlogs = async (req,res) =>{
    try {
        const { country, place} = req.query();
        const filter = {};

        if(country) filter.country = country;
        if(place) filter.place = place;

        const blogs = await Blogs.find(filter)

        res.status(200).json({
            status: true,
            message: "filtered blog successfully",
            data: blogs,
        })
    } catch (error) {
        res.status(500).json({
            status:false,
            message:"Error filtering Blogs",
            error: error.message,
        })
        
    }
}

const deleteBlogs = async (req,res) =>{
    try {
        const { id } = req.params;
        const deletedBlog = await Blogs.findByIdAndDelete(id)
        if(!deletedBlog){
            res.status(404).json({
                status:false,
                message: "Blog not found",
                error:error.message,
            })
        }
        res.status(200).json({
            status:true,
            message:"Deleted blog successfully!",
            d
        })
    } catch (error) {
        res.status(500).json({
            status:false,
            message:"Error deleting Blog",
            error: error.message,
        })
    }
}

module.exports = { getAllBlogs, getBlogById, createBlogs, updateBlog, filterBlogs, deleteBlogs};
