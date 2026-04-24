import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { uid, action } = body;
    
    if (!uid) return { success: false, error: 'Missing UID' };

    const filePath = resolve(process.cwd(), 'suspended_users.json');
    
    let blacklistMap = {}; // Use object to store uid: status
    if (existsSync(filePath)) {
        try {
            const content = readFileSync(filePath, 'utf-8');
            blacklistMap = JSON.parse(content);
            // Migrate old array format if needed
            if (Array.isArray(blacklistMap)) {
                const oldArray = blacklistMap;
                blacklistMap = {};
                oldArray.forEach(id => { blacklistMap[id] = 'suspended'; });
            }
        } catch (e) {
            console.error('[BLACKLIST API] Parse error:', e);
            blacklistMap = {};
        }
    }

    if (action === 'suspend') {
        blacklistMap[uid] = 'suspended';
    } else if (action === 'delete') {
        blacklistMap[uid] = 'deleted';
    } else if (action === 'activate') {
        delete blacklistMap[uid];
    }

    writeFileSync(filePath, JSON.stringify(blacklistMap, null, 2));
    
    return { 
        success: true, 
        count: Object.keys(blacklistMap).length,
        action: action
    };
});
