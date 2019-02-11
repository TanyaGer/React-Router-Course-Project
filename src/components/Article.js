import {Component} from 'react';
import PropTypes from 'prop-types';
import { getArticle } from '../api';

export default class Article extends Component {

    static propTypes = {
        teamId: PropTypes.string.isRequired,
        articleId: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired
    }

    state = {
        article: null
    }

    componentDidUpdate(prevProps) {
        if(prevProps.articleId !== this.props.articleId || prevProps.teamId !== this.props.teamId){
            this.generateArticle(this.props.teamId, this.props.articleId);
        }
    }

    componentDidMount() {
        this.generateArticle(this.props.teamId, this.props.articleId);
    }

    generateArticle = (teamId, articleId) => {
        this.setState(()=>({article: null}));

        getArticle(teamId, articleId)
            .then((article)=> this.setState(()=>({article})))
    }

    render() {
        return this.props.children(this.state.article);
    }
}