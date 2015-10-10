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

export default {
	navigateTorrent,
	replaceTorrent
}