import * as nock from "nock";
import * as path from "path";
import * as fs from "fs";
import { PathLike } from "fs";
import { join, prepend, map } from "ramda";

interface TestRecorderOptions {
  fixturesDir: PathLike;
}

export default (name: string, options: TestRecorderOptions) => {
  options = options || {};
  const filePath = path.join(options.fixturesDir.toString(), `${name}.js`);
  let needsWriting = false;

  return {
    before() {
      try {
        require(`${filePath}`);
      } catch (e) {
        needsWriting = true
        nock.recorder.rec({
          dont_print: true,
        });
      }
    },
    // saves our recording if fixtures didn't already exist
    after() {
      if (needsWriting) {
        const payload = nock.recorder.play().join("\n");
        const headline = `import * as nock from 'nock';`;
        fs.writeFileSync(filePath, headline);
        fs.appendFileSync(filePath, payload);
      }
    },
  };
};
