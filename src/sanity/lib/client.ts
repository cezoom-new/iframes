import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true
});

export const runQuery = async (query: any, params: any = {}, tags: any = null) => {
  if (tags) 
    return await client.fetch(query, params, { cache: "no-store" } );
  return await client.fetch(query, params);
}
  
