import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'fs';
import { readFileSync } from 'fs';

const argv = yargs(hideBin(process.argv))
  .option('implementation', {
    type: 'string',
    description: 'The implementation to test.',
    demandOption: true,
  })
  .parse();
const implementation = argv.implementation;

export function getConfig() {
    const configPath = `./implementations/${implementation}/config.json`;
    const configFile = readFileSync(configPath, 'utf8');
    return JSON.parse(configFile);
}

export const schemas = {
    "VerifiableCredential": {
        "2.0": "https://w3c.github.io/vc-data-model/schema/verifiable-credential/verifiable-credential-schema.json"
    },
    "DigitalProductPassport": {
        "0.5.0": "https://test.uncefact.org/vocabulary/untp/dpp/untp-dpp-schema-0.5.0.json",
    },
    "DigitalConformityCredential": {
        "0.5.0": "https://test.uncefact.org/vocabulary/untp/dcc/untp-dcc-schema-0.5.0.json",
    },
    "DigitalTraceabilityEvent": {
        "0.5.0": "https://test.uncefact.org/vocabulary/untp/dte/untp-dte-schema-0.5.0.json",
    },
    "DigitalFacilityRecord": {
        "0.5.0": "https://test.uncefact.org/vocabulary/untp/dfr/untp-dfr-schema-0.5.0.json",
    },
    "DigitalIdentityAnchor": {
        "0.2.1": "https://test.uncefact.org/vocabulary/untp/dia/untp-dia-schema-0.2.1.json",
    },
};
