import {WorkerI} from "./types";

const workers: WorkerI[] = [
	{
		id: 1,
		name: 'Олег',
		surname: 'Марков',
		patronymic: 'Константинович',
		post: 'Менеджер',
		didHandOverEmploymentHistory: true,
		startDate: '01-05-2020',
		salary: 90000,
		rate: 'full'
	},
	{
		id: 2,
		name: 'Владимир',
		surname: 'Овчинников',
		patronymic: 'Львович',
		post: 'Продавец',
		didHandOverEmploymentHistory: false,
		startDate: '14-08-2021',
		salary: 40000,
		rate: 'half'
	}
];

export const tableHeaders = [
	{text: 'Имя', value: 'name'},
	{text: 'Фамилия', value: 'surname'},
	{text: 'Отчество', value: 'patronymic'},
	{text: 'Должность', value: 'post'},
	{text: 'Сдал ли трудовую', value: 'didHandOverEmploymentHistory', width: 30},
	{text: 'Оклад', value: 'salary'},
	{text: 'Дата выхода', value: 'startDate'},
	{text: 'Ставка', value: 'rate'},
	{text: 'Действия', value: 'actions', sortable: false}
]

export default workers;