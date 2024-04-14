import { getConfigurations } from '../env.js';

export function getHeaders() {
    const properties = getConfigurations();
    return {
        headers: {
            'Content-Type': `application/json`,
            'TENANT_DATA': `{"id": "01226N0640J7K"}`,
            'USER_DATA': `{"callerId":"user123"}`
        },
        timeout: properties.timeout ? properties.timeout : '1m'
    };
}