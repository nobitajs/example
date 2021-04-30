export class GrabDataDto {
	readonly id: string;
	readonly pname: string;
	readonly rname: string;
	readonly plname: string;
	readonly rlname: string;
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
	readonly plname: string;
	readonly rlname: string;
}


export class MongoCarsCreateDataDto {
	readonly qid: String;
	readonly pname: String;
	readonly rname: String;
	readonly plname: String;
	readonly rlname: String;
	readonly plat: String;
	readonly plng: String;
	readonly rlat: String;
	readonly rlng: String;
	readonly ptime: String;
	readonly rtime: String;
	readonly queryTime: Date;
	readonly status: String;
}

export class MongoCarsUpdateDataDto {
	readonly queryUrl: String;
	readonly clid: String;
	readonly ctripResult: any;
	readonly zzcResult: any;
	readonly status: String;
}

export class CarListDto {
	readonly brandName: String;
	readonly name: String;
	readonly doorNo: String;
	readonly passengerNo: String;
	readonly transmissionName: String;
	readonly vehicleCode: String;
	readonly vendorPriceList: Array<VendorPriceList>;

}

export class VendorPriceList {
	readonly vendorName: String;
	readonly currentDailyPrice: Number;
	readonly currentTotalPrice: Number;
	
}


export class FormatDataDto {
	readonly id: String;
	
}