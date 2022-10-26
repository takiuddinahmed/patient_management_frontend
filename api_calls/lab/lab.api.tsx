export interface IValues {
    property: string;
    value: string | number;
    normalValue: string | number;
}


export const initialValues: IValues = {
    property: "",
    value: "",
    normalValue: ""

}

export interface ILabDataForm {
    testName: string;
    values: IValues[];
}

export interface ILabData {

    labData: ILabDataForm[]
}


export const initialLabDataForm: ILabDataForm = {
    testName: "",
    values: [],
}
export const initialLabData: ILabData = {
    labData: []
}