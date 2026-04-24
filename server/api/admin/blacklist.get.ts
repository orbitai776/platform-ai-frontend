import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

export default defineEventHandler(async (event) => {
    const filePath = resolve(process.cwd(), 'suspended_users.json');
    
    let blacklistMap = {};
    if (existsSync(filePath)) {
        try {
            const content = readFileSync(filePath, 'utf-8');
            blacklistMap = JSON.parse(content);
            // Handle legacy array format
            if (Array.isArray(blacklistMap)) {
                const oldArray = blacklistMap;
                blacklistMap = {};
                oldArray.forEach(id => { blacklistMap[id] = 'suspended'; });
            }
        } catch (e) {
            console.error('[BLACKLIST GET] Error reading file:', e);
        }
    }
    
    return {
        success: true,
        blacklist: blacklistMap
    };
});
