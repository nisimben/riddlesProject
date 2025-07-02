import fs from 'fs';

export default function loadRiddlesFromFile(path = './db/riddles.txt') {
    try {
        const data = fs.readFileSync(path, 'utf-8');
        const riddles = JSON.parse(data);
        return riddles;
    } catch (err) {
        console.error("Failed to load riddles:", err.message);
        return [];
    }
}
