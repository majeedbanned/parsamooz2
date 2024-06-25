// app/actions/queryAction.js
'use server';

import { executeQuery } from '../../lib/db';

export async function fetchQueryResult(query) {
  try {
    const result = await executeQuery(query);
    return result;
  } catch (error) {
    console.error('Error fetching query result:', error);
    throw error;
  }
}
