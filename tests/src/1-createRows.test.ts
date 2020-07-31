import { expect } from "chai";
// Imports the Google Cloud client library
import { INSTANCE_ID, TABLE_ID, bigtable } from "../setup";
import * as assert from "assert";
import { getRandomKey, getRowData } from "../helper";

describe("Bigtable: createRows", async () => {
  const instance = bigtable.instance(INSTANCE_ID);
  const table = instance.table(TABLE_ID);

  context("when creating a row", () => {
    const key = getRandomKey();

    it("it should insert a row", async () => {
      expect(await table.insert(getRowData(key))).to.not.throw;
    });

    it("it should return the inserted row by key", async () => {
      await table.insert(getRowData(key));
      const [row] = await table.row(key).get();
      expect(row.data).to.not.be.null;
    });
  });
  context("when creating multiple rows", () => {
    const keys = [...new Array(3)].map(getRandomKey);
    const rowData = keys.map(getRowData);

    it("it should insert multiple rows", async () => {
      await assert.doesNotReject(table.insert(rowData));
    });

    it("it should return all inserted rows by key", async () => {
      const [rows] = await table.getRows({ keys });
      rows.forEach((row) => {
        expect(row.data).to.not.be.null;
      });
    });
  });
});
