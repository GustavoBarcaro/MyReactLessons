import React, {  useState, useEffect, useCallback } from "react";
import axios from '../../axios-orders';
import { connect, useDispatch, useSelector } from 'react-redux';
 
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
// import * as actionTypes from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/index'



const  BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    const dispatch = useDispatch();

    const ingredients =  useSelector( state => {
        return state.burgerBuilder.ingredients
    });
    const price =  useSelector( state => {
        return state.burgerBuilder.totalPrice
    });
    const error =  useSelector( state => {
        return state.burgerBuilder.error
    });
    const isAuthenticated =  useSelector( state => {
        return state.auth.token !== null
    });

    const onAddIngredient = (ingredientName) => dispatch(actions.addIngredient(ingredientName));
    const onRemoveIngredient = (ingredientName) => dispatch(actions.removeIngredient(ingredientName));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
    const onInit = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

    useEffect (() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const purchaseHandler = () => {
        if(isAuthenticated){
            setPurchasing(true)
        }else{
            props.history.push('/auth');
            onSetAuthRedirectPath('/checkout');
        }

    }

    const updatePurchaseState = (ingredients) =>{
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            },0);
        return sum > 0
    }

    const purchaseContinueHandler = () => {
        onInit();
        props.history.push({
            pathname: '/checkout'
        });
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false)
    }

    const disableInfo = {
        ...ingredients
    };

    for(let key in disableInfo){
        disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null
    

    let burger =  error ? <p>Ingredients can't be loaded!</p> : <Spinner />
    if(ingredients){
        burger = (
            <Aux>
                <Burger ingredients={ingredients}/>
                <BuildControls
                    price={price}
                    ingredientAdded={onAddIngredient}
                    ingredientRemoved={onRemoveIngredient}
                    disabled={disableInfo}
                    auth={isAuthenticated}
                    purchaseable={updatePurchaseState(ingredients)}
                    order={purchaseHandler}
                />
            </Aux>
            )
            orderSummary = <OrderSummary
                            price={price}
                            purchaseCanceled={purchaseCancelHandler}
                            purchaseContinued={purchaseContinueHandler}
                            ingredients={ingredients}
                        />
    }

    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
};

const mapStateToProps = state => {
    return{
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return{
        onAddIngredient: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onRemoveIngredient: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInit:() => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath:(path) => dispatch(actions.setAuthRedirectPath(path))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));