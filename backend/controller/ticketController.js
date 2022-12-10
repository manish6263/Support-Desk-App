const asyncHandler = require('express-async-handler');
const Ticket = require('../models/ticketModel');
const User = require('../models/userModel');

//@desc Get user tickets..
//@route GET /tickets
//@access private
const getTickets = asyncHandler(async (req, res) => {

    //get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const tickets = await Ticket.find({ user: req.user.id });
    res.status(200).json(tickets);
});

//@desc Get user ticket..
//@route GET /tickets/:id
//@access private
const getTicket = asyncHandler(async (req, res) => {

    //get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        res.status(404);
        throw new Error('Ticket not found');
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not authorized');
    }

    res.status(200).json(ticket);
});

//@desc Create a new ticket..
//@route POST /tickets
//@access private
const createTicket = asyncHandler(async (req, res) => {

    const { product, description } = req.body;

    if (!product || !description) {
        res.status(400);
        throw new Error('Please enter all the details');
    }

    //get user using the id in the JWT
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const ticket = await Ticket.create({
        user: req.user.id,
        product,
        description,
        status: 'new'
    });

    res.status(200).json(ticket);
});

//@desc Delete user ticket..
//@route DELETE /tickets/:id
//@access private
const deleteTicket = asyncHandler(async (req, res) => {

    //get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        res.status(404);
        throw new Error('Ticket not found');
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not authorized');
    }
    await ticket.remove();

    res.status(200).json({ success: true });
});

//@desc Update user ticket..
//@route GET /tickets/:id
//@access private
const updateTicket = asyncHandler(async (req, res) => {

    //get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        res.status(404);
        throw new Error('Ticket not found');
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not authorized');
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedTicket);
});

module.exports = { getTickets, getTicket, createTicket, deleteTicket, updateTicket };