export default class CustomResponse{
    private _status:number;
    private _message:string;
    private _data?:any;
    private _totalPages?:any;
    private _nextPages?:any;

    constructor(status: number, message: string, data?: any,totalPages?: any,nextPages?:any
    ) {
        this._status = status;
        this._message = message;
        this._data = data;
        this._totalPages = totalPages;
        this._nextPages=nextPages;
    }


    get status(): number {
        return this._status;
    }

    set status(value: number) {
        this._status = value;
    }

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        this._message = value;
    }

    get data(): any {
        return this._data;
    }

    set data(value: any) {
        this._data = value;
    }

    get totalPages(): any {
        return this._totalPages;
    }

    set totalPages(value: any) {
        this._totalPages = value;
    }

    get nextPages():any{
        return this._nextPages;
    }
    set nextPages(value:any){
        this._nextPages=value;
    }

    toJSON(){
        return{
            status:this._status,
            message:this._message,
            data:this._data,
            totalPages:this._totalPages,
            nextPages:this._nextPages
        }
    }
}