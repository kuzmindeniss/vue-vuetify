<script setup lang="ts">
import {workers} from "@/store";
import router from "@/router";
let worker;
const workerArr = workers.value.filter(item => item.id === Number(router.currentRoute.params.id));
if (workerArr) worker = workerArr[0];
</script>

<template>
  <div class="employee">
    <h2>{{worker && worker.name}} {{worker && worker.surname}}</h2>
    <template v-if="worker">
      <v-simple-table>
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">
              Name
            </th>
            <th class="text-left">
              Calories
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="(value, propertyName) in worker"
              :key="propertyName"
          >
            <td>{{ propertyName }}</td>
            <td>{{ value }}</td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </template>
    <template v-else>
      <h2>Работник не найден</h2>
    </template>
  </div>
</template>