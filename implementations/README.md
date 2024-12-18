# UNTP Interoperability test suite

## How does it work

To submit an application, you must create your implementations directory, and include a configuration file. The configuration file should include the name of your implementation and a list of submitted samples. To learn about how you can submit a sample, read the next section.

## Submitting a sample

Utimatly, a sample will need to be retrieveable by executing a GET request on an endpoint. If your implementation already serves a sample at a domain you control, you can include this domain in the `id` field of the configuration. If you only have the credential data, you may also include this credential in a samples subdirectory, which will be published automatically. You can then include the published endpoint as the ID.

### Sample information
id: The endpoint at which a GET request can be conducted which will return a credential.
name: the name of the sample, ex: `Product GHG Footprint certificate`
mediaType: one of `application/vc` or `application/vc+jwt`. This should be coupled with the appropriate securing mechanism, ensuring an application/vc resolves to a VC secured through DataIntegrity, while a media type of application/vc+jwt resolves to a VC secured with vc-jose. The client will include this media type in the `Accept` header parameter of the request.
credentialType: Indicate which one of the core UNTP credential type this credential belongs to.
version: Version of the UNTP credential type to test against.

## The test-suite
### Conformance Testing
The test client will test the following:
- Conformance with the VCDM 2.0 specification
    - This includes json-ld processing.
- Conformance with the relevent Securing Mechanism specification (vc-jose or Data Integrity)
- Conformance with the relevent UNTP credential type Data Model

### Transparency Testing
TBD