export interface WorkerI {
	id: number;
	name: string;
	surname: string;
	patronymic: string;
	post: string;
	didHandOverEmploymentHistory: boolean;
	salary: number;
	startDate: string;
	rate: 'full' | 'half' | '';
}