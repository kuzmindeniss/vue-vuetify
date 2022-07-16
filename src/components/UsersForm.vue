<script setup lang="ts">
import workersTable, {tableHeaders} from '@/workers';
import {WorkerI} from "@/types";
import Vue, {computed, reactive, ref, watch} from "vue";

let dialog = ref<boolean>(false);
let dialogDelete = ref<boolean>(false);
let editedIndex = ref<number>(-1);
let defaultItem: WorkerI = {
  name: '',
  surname: '',
  patronymic: '',
  startDate: '',
  post: '',
  rate: '',
  salary: 0,
  didHandOverEmploymentHistory: false
};

let formTitle = computed(() => {
  return editedIndex.value === -1 ? 'Новый сотрудник' : 'Изменить сотрудника'
});

let isAddingNewValid = ref(false);
const rules = {
  nameRules: [
    (v: string) => !!v || 'Имя обязательно',
  ],
  surnameRules: [
    (v: string) => !!v || 'Фамилия обязательна',
  ]
}

const rates = [
  {ru: 'Полная', eng: 'full'},
  {ru: 'Половина', eng: 'half'}
]

const workers = ref<WorkerI[]>(workersTable);
let editedItem = reactive<WorkerI>({
  name: '',
  surname: '',
  patronymic: '',
  startDate: '',
  post: '',
  rate: '',
  salary: 0,
  didHandOverEmploymentHistory: false
});

const editItem = (item: WorkerI) => {
  editedIndex.value = workers.value.indexOf(item);
  Object.assign(editedItem, item);
  dialog.value = true;
}

const deleteItem = (item: WorkerI) => {
  editedIndex.value = workers.value.indexOf(item);
  Object.assign(editedItem, item);
  dialogDelete.value = true;
}

const deleteItemConfirm = () => {
  workers.value.splice(editedIndex.value, 1);
  closeDelete();
}

const close = () => {
  dialog.value = false
  Vue.nextTick(() => {
    Object.assign(editedItem, defaultItem);
    editedIndex.value = -1;
  })
}

const closeDelete = () => {
  dialogDelete.value = false
  Vue.nextTick(() => {
    Object.assign(editedItem, defaultItem);
    editedIndex.value = -1;
  })
}

const save = () => {
  if (editedIndex.value > -1) {
    Object.assign(workers.value[editedIndex.value], {...editedItem});
  } else {
    if (isAddingNewValid.value) {
      workers.value.push({...editedItem});
    }
  }
  if (!isAddingNewValid.value) return
  close();
}

watch(dialog, (val) => {
  val || close();
});
watch(dialogDelete, (val) => {
  val || closeDelete();
});

</script>


<template>
  <v-data-table
      :headers="tableHeaders"
      :items="workers"
      :items-per-page="5"
      class="elevation-1"
  >
    <template v-slot:[`item.didHandOverEmploymentHistory`]="{ item }">
      <v-simple-checkbox
          v-model="item.didHandOverEmploymentHistory"
          disabled
          align="left"
      ></v-simple-checkbox>
    </template>
    <template v-slot:[`item.rate`]="{ item }">
      <span v-if="item.rate === 'full'">Полная</span>
      <span v-if="item.rate === 'half'">Половина</span>
    </template>


    <template v-slot:top>
      <v-toolbar
          flat
      >
        <v-toolbar-title>Панель управления</v-toolbar-title>
        <v-divider
            class="mx-4"
            inset
            vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
            v-model="dialog"
            max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
            >
              Добавить сотрудника
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-form v-model="isAddingNewValid">
                  <v-row>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="editedItem.name"
                          label="Имя"
                          :rules="rules.nameRules"
                          required
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="editedItem.surname"
                          label="Фамилия"
                          required
                          :rules="rules.surnameRules"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="editedItem.patronymic"
                          label="Должность"
                          required
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="editedItem.post"
                          label="Должность"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-checkbox
                          v-model="editedItem.didHandOverEmploymentHistory"
                          label="Сдал ли трудовую"
                      ></v-checkbox>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="editedItem.salary"
                          label="Оклад"
                          required
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="editedItem.startDate"
                          label="Начало работы"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-select
                          v-model="editedItem.rate"
                          label="Ставка"
                          :items="rates"
                          item-text="ru"
                          item-value="eng"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Вы уверены, что хотите удалить этого работника?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
          small
          @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
          color="primary"
          @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>


<style lang="scss">
.v-data-table-header th {
  text-align: left;
}
</style>