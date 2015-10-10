import React,{Component} from 'react';
import Header from '../header/header';
import { Link } from 'react-router';

const NotFound = (props) => {
	return (
		<section className='torrent-404'>
			<Link to='/' activeClassName='wrap-heading' >
				<Header />
			</Link>
			
			<h2>Torrent Not Found</h2>
		</section>
	);
}

export default NotFound;