import algoliasearch from 'algoliasearch';
import { environment as globals } from 'src/environments/environment';

const client = algoliasearch(globals.algolia.appId, globals.algolia.searchKey);
const index = client.initIndex(globals.algolia.indexes.entities);

export { client, index };
