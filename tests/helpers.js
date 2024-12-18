


export async function resolveCredential(endpoint, mediaType) {
    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Accept': mediaType
            }
        });
        let data;
        const status = response.status;
        const contentType = response.headers.get('Content-Type');
        if (contentType.includes('application/json')) {
            data = await response.json();
        } else if (contentType.includes('text/')) {
            data = await response.text();
        } else if (contentType.includes('application/vc')) {
            data = await response.text();
        } else if (contentType.includes('application/vc+jwt')) {
            data = await response.text();
        } else if (contentType.includes('image/') || contentType.includes('application/octet-stream')) {
            data = await response.blob();
        } else {
            data = await response.text();
        }
        return {
            data,
            status,
            contentType
        };

    } catch (error) {
        console.error('Error fetching data:', error);
        const data=null;
        const status=null;
        const contentType=null;
        return {
            data,
            status,
            contentType
        };
    }
};

export function extractCredential(response) {
    let credential = null;
    try {
        if (response.contentType === 'application/json') {
            credential = response.data;
        } else if (response.contentType === 'application/vc') {
            credential = JSON.parse(response.data);
        } else if (response.contentType === 'application/vc+jwt') {
            try {
                const parts = response.data.split('.');
                if (parts.length !== 3) {
                    console.error('Invalid JWT: Incorrect format');
                }
        
                const payload = parts[1];
                const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
        
                credential = JSON.parse(decodedPayload);
            } catch (error) {
                console.error('Error decoding JWT:', error.message);
            }
        }
    } catch(error) {}
    return credential;
};

export function getIssuer(credential) {
    let issuer = null;
    try {
        if(credential) {
            const issuerField = credential.issuer;
            const issuerType = typeof credential.issuer;
            issuer = issuerType === 'string' ? issuerField : issuerField?.id;
        } else {}
    } catch(error) {}
    return issuer;
};


export async function resolveDid(did) {
    try {
        // Validate the DID format
        if (!did.startsWith('did:web:')) {
            throw new Error('Invalid DID: Not a DID Web identifier');
        }

        // Extract domain and path from DID Web
        const didParts = did.replace('did:web:', '').split(':');
        let domain = didParts[0];
        let path = didParts.slice(1).join('/'); // Handle path after the domain, if any

        // Construct URL to fetch DID document
        let url = `https://${domain}`;
        if (path) {
            url += `/${path}`;
        }
        url += '/did.json';

        console.log(`Fetching DID document from: ${url}`);

        // Fetch the DID document
        const response = await fetch(url, { method: 'GET' });

        if (!response.ok) {
            throw new Error(`Failed to resolve DID Web. HTTP Status: ${response.status}`);
        }

        const didDocument = await response.json();
        return {
            didDocument,
            url,
            status: response.status
        };
    } catch (error) {
        console.error('Error resolving DID Web:', error.message);
        return null;
    }
};


export function credentialIsSecured(response) {
    if (response.contentType.includes('application/json')) {
    } else if (response.contentType.includes('application/vc')) {
    } else if (response.contentType.includes('application/vc+jwt')) {
    } else {};
};

export function verifyCredential(credential) {
};

export function getRevocationStatusEntry(credential) {
    let revocationEntry = null;
    let statusEntries = credential?.credentialStatus;
    // if(Array.isArray(statusEntries)) {
    // } else if(typeof statusEntries === 'object' && statusEntries !== null) {
    //     if(statusEntries)
    // } else {
    // }
    return statusEntries
};

export function getCredentialStatus(statusEntry) {
};

export async function getSchema(endpoint) {
    try {
        const response = await fetch(endpoint, {
            method: 'GET'
        });
        return await response.json();

    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};
