import { Patable1Base} from '@baseapp/patable1/patable1/patable1.base.model';

export class Patable1ApiConstants {
    public static readonly getById: any = {
        url: '/rest/patable1s/{sid}',
        method: 'GET',
        showloading: true
    };
    public static readonly update: any = {
        url: '/rest/patable1s/',
        method: 'PUT',
        showloading: true
    };
    public static readonly getDatatableData: any = {
        url: '/rest/patable1s/datatable',
        method: 'POST',
        showloading: true
    };
    public static readonly create: any = {
        url: '/rest/patable1s/',
        method: 'POST',
        showloading: true
    };
    public static readonly getBypr_keyIndex: any = {
        url: '/rest/patable1s/getbypr_key/{field1}',
        method: 'GET',
        showloading: true
    };
    public static readonly autoSuggestService: any = {
        url: '/rest/patable1s/autosuggest',
        method: 'GET',
        showloading: true
    };
    public static readonly delete: any = {
        url: '/rest/patable1s/{ids}',
        method: 'DELETE',
        showloading: true
    };
}