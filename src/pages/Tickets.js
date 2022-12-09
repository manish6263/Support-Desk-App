import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import TicketItem from '../components/TicketItem';
import { getTickets, reset } from '../features/tickets/ticketSlice';

const Tickets = () => {

    const { tickets, isSuccess, isLoading } = useSelector((state) => state.tickets);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        return () => {
            if (isSuccess) {
                dispatch(reset());
            }
        }
    }, [dispatch, isSuccess]);

    useEffect(() => {
        dispatch(getTickets());
        setLoading(false);
    }, [dispatch]);

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <BackButton url='/' />
            <h1>Tickets</h1>
            <div className='tickets'>
                <div className='ticket-headings'>
                    <div>Date</div>
                    <div>Product</div>
                    <div>Status</div>
                    <div></div>
                </div>
                {loading ? <h2>Loading.........</h2> :
                    tickets.map((ticket) => (
                        <TicketItem key={ticket._id} ticket={ticket} />
                    ))}
            </div>
        </>
    )
}

export default Tickets;