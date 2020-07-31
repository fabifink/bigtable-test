import { promisify } from "../promisify";
import { expect } from "chai";
import { INSTANCE_ID, bigtable, TABLE_ID } from "../setup";
import * as assert from "assert";
import { getRandomKey, getRowData } from "../helper";

describe("Bigtable - createReadStream", () => {
  const instance = bigtable.instance(INSTANCE_ID);
  const table = instance.table(TABLE_ID);

  before(async () => {
    await table.truncate();
    const keys = [...new Array(4)].map(getRandomKey);
    const rowData = keys.map(getRowData);
    await table.insert(rowData);
  });

  context("find by readStream", () => {
    it("it should read all inserted rows", async () => {
      const rows = await promisify(table.createReadStream({ limit: 10 }));
      expect(rows.length).to.eql(4);
    });
  });
  context("delete rows", () => {
    it("it should delete all inserted rows", async () => {
      const rows = await promisify(table.createReadStream({ limit: 10 }));
      const deleteEntries = rows.map((r) => ({ method: "delete", key: r.id }));
      await assert.doesNotReject(table.mutate(deleteEntries));
    });

    it("it should not contain any rows after deletion", async () => {
      const rows = await promisify(table.createReadStream({ limit: 10 }));
      expect(rows.length).to.eql(0);
    });
  });
});
