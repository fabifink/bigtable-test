import { Readable } from "stream";
import { Row } from "@google-cloud/bigtable";

export const promisify = async (stream: Readable): Promise<Row[]> => {
  return new Promise((resolve, reject) => {
    const rows: Row[] = [];
    stream
      .on("error", reject)
      .on("data", (row) => {
        rows.push(row);
      })
      .on("end", () => {
        resolve(rows);
      });
  });
};
