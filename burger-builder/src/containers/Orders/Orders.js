import React, { useEffect} from 'react'
import axios from '../../axios-orders'

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = (props) =>  {

    const { onFetchOrders, token, userID } = props

    useEffect(() => {
        onFetchOrders(token, userID)
    }, [onFetchOrders, token, userID])

    let  orders = <Spinner />
    if(!props.loading && props.orders) {
        orders = props.orders.map(order => (
            <Order 
                key={order.id} 
                ingredients={order.ingredients} 
                price={order.price}/>
        ))
    }

    return (
        <div>
            {orders}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userID: state.auth.userID
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userID) => dispatch(actions.fetchOrders(token, userID))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));