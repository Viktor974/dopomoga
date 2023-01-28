import Organization from '../models/organization.js';
import Post from '../models/post.js';

export const createOrganization = async (req, res) => {
    try {
        const content = req.body;

        let imagesUrl = [];
        if(req.files){
            req.files.map(file => {
                imagesUrl.push(`${req.protocol}://${req.get("host")}/public/uploads/${file.filename}`);
            })
        }
        if(!content) return res.status(403).json({message:"please add some content !!"});
        const newOrg = new Organization({
            ...req.body,
            img:imagesUrl,
            owner:req.user._id});
        if(!newOrg) return res.status(500).json({message:"something went wrong !!"});

        await newOrg.save();

        return res.status(200).json(newOrg);
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const info = async (req, res) => {
    try {
        const getOrg = await Organization.findById(req.params.organizationId);
        if (!getOrg) return res.status(404).json({message: "Organization not found!!"});
        return res.status(200).json(getOrg);
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

export const allOrganizations = async (req, res) => {
    try {
        const findOrganizations = await Organization.find({})
        if (!findOrganizations)
            return res.status(500)
                .json({message: "somthing went wrong !!"});
        return res.status(200)
            .json(findOrganizations);
    } catch (error) {
        return res.status(500).json(error.message)
    }
}


export const editOrganization = async (req, res) => {
    try {
        const getOrg = await Organization.findById(req.params.organizationId);
        if (!getOrg) return res.status(400).json({message: "something went wrong !"});

        if (getOrg.owner.toString() !== req.user._id.toString()) {
            return res.status(400).json({message: "you don`t own this organization"})
        }
        const newOrg = await Organization.findOneAndUpdate(req.params.organizationId, req.body, {new: true});

        if (!newOrg)
            return res.status(500).json({message: "something went wrong ! !"});

        return res.status(200).json({data: newOrg, message: "updated successfully "});
    } catch (error) {
        return res.status(500).json({message: "something went wrong !!!"});
    }
}


export const deleteOrganization = async (req, res) => {
    try {
        const {organizationId} = req.params;
        if (!organizationId) return res.status(404).json({message: "Organization not found !!"});
        const getOrg = await Organization.findById(organizationId);
        if (!getOrg) return res.status(404).json({message: "Organization not Found !!"});
        if (getOrg.owner.toString() !== req.user._id.toString()) {
            return res.status(400).json({message: "you don`t own this Organization"})
        }
        await getOrg.remove();
        return res.status(200).json({message: "Organization Deleted successfully"})
    } catch (error) {
        return res.status(500).json({message: "something went wrong !!"});
    }
}