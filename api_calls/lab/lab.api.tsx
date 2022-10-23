export interface ILabDataForm {
    testName: string;
    value: string | number;
    normalValue: string | number;
}


export interface ILabData {

    labData: ILabDataForm[]
}

export const initialLabDataForm: ILabDataForm = {
    testName: "",
    value: "",
    normalValue: "",
}
export const initialLabData: ILabData = {
    labData: []
}