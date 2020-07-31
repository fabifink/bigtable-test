import { bigtable, INSTANCE_ID, TABLE_ID } from "../setup";
import * as assert from "assert";
import { getRandomKey } from "../helper";
import { expect } from "chai";
import { promisify } from "../promisify";

describe("Bigtable: emptyRows", async () => {
  const instance = bigtable.instance(INSTANCE_ID);
  const table = instance.table(TABLE_ID);
  const key = getRandomKey();

  before(async () => {
    await table.truncate();
  });

  context("#row.get()", () => {
    it("it should not find a row before insertion", async () => {
      await assert.rejects(table.row(key).get());
    });
  });
  context("#row.exists()", () => {
    it("should return false for a non existing row a row before insertion", async () => {
      const [exists] = await table.row(key).exists();
      expect(exists).to.be.false;
    });
  });
  context("#createReadStream()", () => {
    it("it should not return any rows", async () => {
      const rows = await promisify(table.createReadStream({ limit: 10 }));
      expect(rows.length).to.eql(0);
    });
  });
});
