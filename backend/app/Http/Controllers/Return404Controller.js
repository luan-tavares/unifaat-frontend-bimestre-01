import path from 'node:path';
import CONSTANTS from '../../../bootstrap/config.js';

export default function Return404Controller(req, res) {
    return res.status(404).sendFile(
        path.join(CONSTANTS.DIR, 'public', '404.html')
    );
}