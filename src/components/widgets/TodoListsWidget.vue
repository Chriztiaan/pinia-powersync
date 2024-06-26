<template>
  <div class="py-10 pa-2">
    <LoadingMessage :loading :fetching />
    <ErrorMessage v-if="error">{{ error.message }}</ErrorMessage>
    <v-list v-else class="bg-black pa-0" lines="two">
      <ListItemWidget
        v-for="record in listRecords"
        :key="record.id"
        :title="record.name || ''"
        :description="description(record.total_tasks, record.completed_tasks)"
        @delete="() => deleteList(record.id)"
        @press="() => navigateToList(record.id)"
      />
    </v-list>
  </div>
</template>

<script setup lang="ts">
import { LISTS_TABLE, TODOS_TABLE } from "@/library/powersync/AppSchema";
import { TODO_LISTS_ROUTE } from "@/plugins/router"; // Adjust this import according to your project's structure
import { usePowerSync } from "@powersync/vue"; // Adjust according to your actual implementation
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useListStore } from "../../stores/listStore";
import LoadingMessage from "../LoadingMessage.vue";
import ListItemWidget from "./ListItemWidget.vue"; // Ensure this path is correct
const powerSync = usePowerSync();

// Vue Router for navigation
const router = useRouter();

const {
  data: listRecords,
  loading,
  fetching,
  error,
} = storeToRefs(useListStore());

const deleteList = async (id: string) => {
  await powerSync.value.writeTransaction(async (tx) => {
    // Delete associated todos
    await tx.execute(`DELETE FROM ${TODOS_TABLE} WHERE list_id = ?`, [id]);
    // Delete list record
    await tx.execute(`DELETE FROM ${LISTS_TABLE} WHERE id = ?`, [id]);
  });
};

const navigateToList = (id: string) => {
  router.push(`${TODO_LISTS_ROUTE}/${id}`);
};

// Helper function to format the description
const description = (total: number, completed: number = 0) => {
  return `${total - completed} pending, ${completed} completed`;
};
</script>
