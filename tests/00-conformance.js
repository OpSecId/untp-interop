import { 
    getConfig,
    schemas 
} from "./config.js";
import { 
    credentialIsSecured,
    extractCredential,
    getIssuer,
    getSchema,
    // getStatusEntries,
    resolveCredential
} from "./helpers.js";
import chai from 'chai';
import chaiString from 'chai-string';
import chaiJsonSchema from 'chai-json-schema';
import * as allure from "allure-js-commons";
import { Status, ContentType } from "allure-js-commons";

chai.use(chaiString);
chai.use(chaiJsonSchema);
const should = chai.should();
const { expect } = chai;

const implementation = getConfig();
describe('Samples Conformance', function() {
    for(const sample of implementation.samples) {
    
    describe(sample.name, function() {
        let response;
        let credential;
        let issuer;
        // let statusEntries;
        before(async function() {
            response = await resolveCredential(sample.id, sample.mediaType);
            credential = extractCredential(response);
            issuer = getIssuer(credential);
            // statusEntries = getStatusEntries(credential);
        });
        describe('00 Resolving', function() {
            it('The endpoint SHOULD return a 200 status Code',
            async function() {
                this.test.link = '';
                await allure.step("Expected response status to equal 200.", async () => {
                    response.status.should.equal(200, 
                        'Expected response status to equal 200.'
                    )
                });
            });
            it('The endpoint MAY return the appropriate mediaType',
            async function() {
                this.test.link = '';
                await allure.parameter("mediaType", sample.mediaType);
                await allure.step(`Expected response Content-Type: ${sample.mediaType}`, async () => {
                    response.contentType.should.equal(sample.mediaType, 
                        `Expected response Content-Type: ${sample.mediaType}`
                    )
                });
            });
            it('The response MUST include a credential',
            async function() {
                this.test.link = '';
                await allure.step('Expected response to contain a credential.', async () => {
                    should.exist(credential,
                        'Expected response to contain a credential.'
                    )
                });
                await allure.attachment("Credential", JSON.stringify(credential, null, 2), ContentType.JSON);
            });
        });
        describe('01 Issuer', function() {
            it('The issuer MUST use a valid did:web identifier',
            async function() {
                this.test.link = '';
                await allure.step('Expected credential to have an issuer.', async () => {
                    should.exist(issuer,
                        'Expected credential to have an issuer.'
                    )
                });
                await allure.step('Expected a valid did:web id.', async () => {
                    issuer.should.startsWith('did:web:',
                        'Expected a valid DID WEB id.'
                    );
                });
            // TODO more test for DID, regex
            });
            it('The issuer did MUST resolve to a valid did document.',
            async function() {
                this.test.link = '';
                this.skip();
            });
            it('The issuer did MAY be included in a UNTP trust registry.',
            async function() {
                this.test.link = '';
                this.skip();
            });
        });
        describe('02 Securing Mechanism', function() {
            it('The credential MUST be secured.',
            async function() {
                this.test.link = '';
                this.skip();
            });
            it('The credential MUST support the VC-JOSE Securing Mechanism.',
            async function() {
                this.test.link = '';
                this.skip();
            });
            it('The credential MAY support Data Integrity Securing Mechanism.',
            async function() {
                this.test.link = '';
                this.skip();
            });
            it('The securing mechanism MUST verify.',
            async function() {
                this.test.link = '';
                this.skip();
            });
        });
        describe('03 Data Model', function() {
            it('The credential MUST conform with the Verifiable Credential Data Model 2.0 specification.',
            async function() {
                this.test.link = '';
                await allure.step('Expected response to contain a credential.', async () => {
                    should.exist(credential,
                        'Expected response to contain a credential.'
                    )
                });
                // TODO cache schemas
                const vcdmSchema = await getSchema(schemas['VerifiableCredential']['2.0']);
                await allure.attachment("Schema", JSON.stringify(vcdmSchema, null, 2), ContentType.JSON);
                await allure.attachment("Credential", JSON.stringify(credential, null, 2), ContentType.JSON);
                await allure.step('Expected credential to be a conformant Verifiable Credential.', async () => {
                    expect(credential).to.be.jsonSchema(vcdmSchema,
                        'Expected credential to be a conformant Verifiable Credential.'
                    );
                });
            });
            it('The credential MUST conform with the UNTP specification.',
            async function() {
                this.test.link = '';
                await allure.step('Expected response to contain a credential.', async () => {
                    should.exist(credential,
                        'Expected response to contain a credential.'
                    )
                });
                // TODO cache schemas
                const untpSchema =  await getSchema(schemas[sample.type][sample.version]);
                await allure.attachment("Schema", JSON.stringify(untpSchema, null, 2), ContentType.JSON);
                await allure.attachment("Credential", JSON.stringify(credential, null, 2), ContentType.JSON);
                await allure.step(`Expected credential to be a conformant ${sample.type}.`, async () => {
                    expect(credential).to.be.jsonSchema(untpSchema,
                        `Expected credential to be a conformant ${sample.type}.`
                    );
                });
            });
        });
        describe('04 Credential Status', function() {
            it('The credential SHOULD include a revocation status.',
            async function() {
                this.test.link = '';
                this.skip();
                should.exist(credential,
                    'Expected response to contain a credential.'
                )
            });
            it('The revocation status MUST be retrieveable according to the BitstringStatusList specification.',
            async function() {
                this.test.link = '';
                this.skip();
                should.exist(credential,
                    'Expected response to contain a credential.'
                )
            });
        });
    });
    }
});
