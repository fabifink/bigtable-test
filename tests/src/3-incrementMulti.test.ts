import { getRandomKey } from "../helper";
import { bigtable, INSTANCE_ID, TABLE_ID, FAMILY } from "../setup";
import { expect } from "chai";
import * as assert from "assert";

describe("Bigtable - increment Multi", () => {
  const instance = bigtable.instance(INSTANCE_ID);
  const table = instance.table(TABLE_ID);
  const key = getRandomKey();

  it("should increment Multiple rows", async () => {
    const columnIds = ["c1", "c2", "c3"];
    const row = table.row(key);
    const increments = columnIds.map((id) => row.increment(`${FAMILY}:${id}`));
    await Promise.all(increments);
  });

  it("should find row that was incremented", async () => {
    const [row] = await table.row(key).get();
    expect(row.data).to.not.be.null;
  });
  it("should delete the incremented row", async () => {
    await assert.doesNotReject(table.mutate({ method: "delete", key }));
  });
  it("should not find deleted row", async () => {
    await assert.rejects(table.row(key).get());
  });
});
