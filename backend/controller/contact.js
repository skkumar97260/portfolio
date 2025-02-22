const Contact=require('../model/contact');


exports.saveContact = async (req, res) => {
    try
    {
        const contact = await Contact(req.body);
        await contact.save();
        res.status(201).json({result:contact,message:"Contact created successfully"});
    }
    catch(error)
    {
        res.status(400).json({message:error.message});
    }
}

exports.getContact = async (req, res) => {
    try {
        const contact = await Contact.find();
        res.status(201).json({result:contact,message:"Contact fetched successfully"});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

exports.getsingleContact = async (req, res) => {
    try {
        const contact = await Contact.findById({ _id: req.query._id });
        res.status(201).json({result:contact,message:"Contact fetched successfully"});
    } catch (error) {
        res.status(400).json({message:error.message});
    }   
}

exports.updateContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.body._id, req.body, { new: true });
        res.status(201).json({result:contact,message:"Contact updated successfully"});
    } catch (error) {
        res.status(400).json({message:error.message});
}
}

exports.deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.query._id);
        res.status(201).json({result:contact,message:"Contact deleted successfully"});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}