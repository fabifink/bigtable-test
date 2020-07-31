# Bigtable nodeJS client - test repo

This repository is used in order to test the basic functionality of the [@google-cloud/bigtable](https://www.npmjs.com/package/@google-cloud/bigtable) npm module ([github](https://github.com/googleapis/nodejs-bigtable))

### Run Tests

You can either run the tests against the Bigtable Emulator or against a Bigtable GCP Instance.

In each case install dependencies by running `npm install`

#### Testing against the Bigtable Emulator

1. Start the emulator `gcloud beta emulators bigtable start`
1. run the tests `npm run test`

#### Testing against a GCP Bigtable Instance

1. Change the `INSTANCE_ID` and `PROJECT_ID` parameters in the package.json script `test:gcp` to your GCP Project ID & Bigtable instanceID
1. Create a .json GCP secret and store it under `/tests/bigtable-secret.json`
1. run the tests `npm run test:gcp`
