import { Component } from 'react';
import PropTypes from 'prop-types';

export default class DynamicImport extends Component {

    static propTypes = {
        load: PropTypes.func.isRequired,
        children: PropTypes.func.isRequired
    }

    state = {
        component: null
    }

    componentDidMount () {
        this.props.load()
        .then((mod) => this.setState(()=>({
            component: mod.default
        })))
    }


    render(){
        return this.props.children(this.state.component);
    }
}