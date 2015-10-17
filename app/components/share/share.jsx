import React,{Component} from 'react';

import icon_twitter from '../../images/twitter.svg';
import icon_facebook from '../../images/facebook.svg';
import icon_google from '../../images/google.svg';
import icon_linkedin from '../../images/linkedin.svg';
import icon_vk from '../../images/vk.svg';

import './share.scss';


function twitter(url, text) {
	return `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
}

function facebook(url, text) {
	return `https://www.facebook.com/sharer/sharer.php?u=${url}&t=${text}`;
}

function google(url) {
	return `https://plus.google.com/share?url=${url}`;
}

function linkedin(url, text) {
	return `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`;
}

function vk(url, text) {
	return `https://vk.com/share.php?url=${url}&title=${text}&noparse=true`;
}

export default class Share extends Component {
	static defaultProps = {
		url: location.href,
		text: 'Super fast torrent viewer, editor and creator'
	}
	
	handleClick(handle, ev) {
		ev.preventDefault();
		
		window.open(handle(this.props.url, this.props.text), null, `scrollbars=yes,width=800,height=450, top=100, left=100`);
	}

	render() {
			return (
				<div className='share'>
					<a title='facebook' className='share-button'
						onClick={this.handleClick.bind(this, facebook)}	dangerouslySetInnerHTML={{__html: icon_facebook}}/>
					<a title='twitter' className='share-button'
						onClick={this.handleClick.bind(this, twitter)} dangerouslySetInnerHTML={{__html: icon_twitter}}/>
					<a title='google plus' className='share-button'
						onClick={this.handleClick.bind(this, google)} dangerouslySetInnerHTML={{__html: icon_google}}/>
					<a title='linkedin' className='share-button'
						onClick={this.handleClick.bind(this, linkedin)} dangerouslySetInnerHTML={{__html: icon_linkedin}}/>
					<a title='vk' className='share-button'
						onClick={this.handleClick.bind(this, vk)} dangerouslySetInnerHTML={{__html: icon_vk}} />
				</div>
			)
	}
}