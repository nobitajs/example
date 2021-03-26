export class GetListDataDto {
	readonly pname: string;
	readonly rname: string;
	readonly plat: string;
	readonly plng: string;
	readonly rlat: string;
	readonly rlng: string;
	readonly ptime: string;
	readonly rtime: string;
}


export class GetCarListParamsDto{
	readonly pcid: string;
	readonly rcid: string;
	readonly plat: string;
	readonly plng: string;
	readonly rlat: string;
	readonly rlng: string;
	readonly ptime: string;
	readonly rtime: string;
}

export class SendGetCarListToCtrip{
	readonly url: string;
	readonly method: string;
	readonly data: string;
	readonly headers: string
}