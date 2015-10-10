import history from './torrent-history';

/**
 * Navigate Landing -> Editor
 */
export function navigateTorrent(hash) {
	history.pushState(null, `/torrent/${hash}`);
}

/**
 * Navigate Editor -> Editor
 */
export function replaceTorrent(hash) {
	history.replaceState(null, `/torrent/${hash}`);
}

export function notFoundTorrent() {
	history.replaceState(null, `/torrent-not-found`);
}

export default {
	navigateTorrent,
	replaceTorrent,
	notFoundTorrent
}