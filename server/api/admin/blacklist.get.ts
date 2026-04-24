import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { tmpdir } from 'node:os';

export default defineEventHandler(async (event) => {
    const filePath = resolve(tmpdir(), 'suspended_users.json');
    
    let blacklistMap = {};
    if (existsSync(filePath)) {
        try {
            const content = readFileSync(filePath, 'utf-8');
            blacklistMap = JSON.parse(content);
        } catch (e) {
            console.error('[BLACKLIST GET] Error reading file:', e);
        }
    }
    
    return {
        success: true,
        blacklist: blacklistMap
    };
});


