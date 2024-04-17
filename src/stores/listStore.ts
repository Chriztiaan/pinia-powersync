import {
  LISTS_TABLE,
  ListRecord,
  TODOS_TABLE,
} from "@/library/powersync/AppSchema";
import { usePowerSyncWatchedQuery } from "@powersync/vue";
import { defineStore } from "pinia";

export const useListStore = defineStore("lists", () => {
  // You could add any other relevant lists logic here.

  const { data, loading, fetching, error } = usePowerSyncWatchedQuery<
    ListRecord & { total_tasks: number; completed_tasks: number }
  >(`
        SELECT
          ${LISTS_TABLE}.*, COUNT(${TODOS_TABLE}.id) AS total_tasks, SUM(CASE WHEN ${TODOS_TABLE}.completed = true THEN 1 ELSE 0 END) as completed_tasks
        FROM
          ${LISTS_TABLE}
        LEFT JOIN ${TODOS_TABLE}
          ON  ${LISTS_TABLE}.id = ${TODOS_TABLE}.list_id
        GROUP BY
          ${LISTS_TABLE}.id;
        `);
  return { data, loading, fetching, error };
});
