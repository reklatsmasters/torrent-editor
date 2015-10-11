import React from 'react';
import ReactDOM from 'react-dom';
import TorrentEditor from './app/app';
import { IndexRoute, Router, Route } from 'react-router';
import Landing from './landing/landing';
import Editor from './editor/editor';
import HistoryStore from './store/history-store';
import NotFound from './404/not-found-hash';

ReactDOM.render((
	<Router history={HistoryStore.history}>
		<Route path='/' component={TorrentEditor}>
			<IndexRoute component={Landing} />
			<Route path='torrent/:hash' component={Editor} />
			<Route path='/torrent-not-found' component={NotFound} />
		</Route>
	</Router>
	), document.getElementById('content')
); // jshint ignore:line
