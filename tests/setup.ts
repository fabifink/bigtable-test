/**
 * test setup file
 */
import { Bigtable } from "@google-cloud/bigtable";
import * as credentials from "./bigtable-secret.json";

//CONSTANTS

export const INSTANCE_ID = process.env.INSTANCE_ID ?? "Bigtable";
export const TABLE_ID = "TestTable";
export const FAMILY = "f";

// Bigtable Config
const projectId = process.env.PROJECT_ID ?? "Bigtable";
const isDev = process.env.ENV === "dev";
const config = {
  projectId,
  ...(isDev && { credentials }),
  ...(!isDev && { apiEndpoint: "localhost:8086" }),
};

export const bigtable = new Bigtable(config);

const instance = bigtable.instance(INSTANCE_ID);
const table = instance.table(TABLE_ID);

export const mochaHooks = {
  async beforeAll(): Promise<void> {
    console.log("global beforeAll");

    const [exists] = await table.exists();

    if (exists) {
      await table.truncate();
      return;
    }

    await table.create();
    await table.createFamily(FAMILY);
    console.log(`Table=${TABLE_ID} for instance=${INSTANCE_ID} created.`);
  },
  async afterAll(): Promise<void> {
    console.log("global after all");
    await table.truncate();
  },
};
