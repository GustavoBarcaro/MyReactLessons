import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary'

const withErrorHandler = (WrappedComponent, axios) => {
    return  class  extends Component {
        state = {
            // initialized para substituir o componentWillMount
            initialized:false,
            error: null
        }
        componentDidMount () {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({
                    error: null
                })
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error =>{
                this.setState({
                    error: error
                })
            });
            //set true quando acabar
            this.setState({
                initialized:true
            });
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
        
        errorConfirmedHandler = () => {
            this.setState({error: null})
        }
        render () {
            const initialized = this.state.initialized;
            // se component foi inicilizado dai da o display
            if(!initialized) return null;
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}
                    >
                        { this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default withErrorHandler;