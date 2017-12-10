import * as fs from 'fs';
import { PathLike } from 'fs';
import { AnyJson } from '../types/Types';

export const getJsonFromFile = (filePath: PathLike): AnyJson =>
	JSON.parse(
		fs.readFileSync(filePath).toString()
	)
