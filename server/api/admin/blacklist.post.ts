import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { tmpdir } from 'node:os';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { uid, action } = body;
    
    if (!uid) return { success: false, error: 'Missing UID' };

    // Sử dụng thư mục tạm của hệ điều hành (Vercel hỗ trợ /tmp)
    const filePath = resolve(tmpdir(), 'suspended_users.json');
    
    let blacklistMap: Record<string, string> = {};
    
    if (existsSync(filePath)) {
        try {
            const content = readFileSync(filePath, 'utf-8');
            blacklistMap = JSON.parse(content);
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

    try {
        writeFileSync(filePath, JSON.stringify(blacklistMap, null, 2));
        console.log(`[BLACKLIST] Saved to ${filePath}`);
    } catch (err) {
        console.error('[BLACKLIST WRITE ERROR]:', err);
        throw createError({
            statusCode: 500,
            statusMessage: 'Không thể ghi file vào thư mục tạm'
        });
    }
    
    return { 
        success: true, 
        count: Object.keys(blacklistMap).length,
        action: action
    };
});


