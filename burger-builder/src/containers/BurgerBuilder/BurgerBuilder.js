import React, { Component } from "react";
import axios from '../../axios-orders';
import { connect } from 'react-redux';
 
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
// import * as actionTypes from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/index'



class BurgerBuilder extends Component{
    
    state = {
        purchasing: false
    }


    componentDidMount () {
        this.props.onInitIngredients();
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({
                purchasing: true
            })
        }else{
            this.props.history.push('/auth');
            this.props.onSetAuthRedirectPath('/checkout');
        }

    }

    updatePurchaseState = (ingredients) =>{
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            },0);
        return sum > 0
    }

    purchaseContinueHandler = () => {
        this.props.onInit();
        this.props.history.push({
            pathname: '/checkout'
        });
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    render () {
        const disableInfo = {
            ...this.props.ingredients
        };

        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null
       

        let burger =  this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />
        if(this.props.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls
                        price={this.props.price}
                        ingredientAdded={this.props.onAddIngredient}
                        ingredientRemoved={this.props.onRemoveIngredient}
                        disabled={disableInfo}
                        auth={this.props.isAuthenticated}
                        purchaseable={this.updatePurchaseState(this.props.ingredients)}
                        order={this.purchaseHandler}
                    />
                </Aux>
             )
             orderSummary = <OrderSummary
                                price={this.props.price}
                                purchaseCanceled={this.purchaseCancelHandler}
                                purchaseContinued={this.purchaseContinueHandler}
                                ingredients={this.props.ingredients}
                            />
        }
        
        // if ( this.state.loading ) {
        //     orderSummary = <Spinner />
        // }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                  {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
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