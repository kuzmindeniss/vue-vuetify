import workersTable from '@/workers';
import {Ref, ref} from "vue";
import {WorkerI} from "@/types";


const localW = window.localStorage.getItem('workers');
export const localWorkers = localW ? JSON.parse(localW) : undefined;
export const workers: Ref<WorkerI[]> = localWorkers ? ref(localWorkers) : ref(workersTable);