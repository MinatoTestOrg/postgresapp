import { Patable2Base} from '@baseapp/patable2/patable2/patable2.base.model';

export class Patable2ApiConstants {
    public static readonly getById: any = {
        url: '/rest/patable2s/{sid}',
        method: 'GET',
        showloading: true
    };
    public static readonly delete: any = {
        url: '/rest/patable2s/{ids}',
        method: 'DELETE',
        showloading: true
    };
    public static readonly update: any = {
        url: '/rest/patable2s/',
        method: 'PUT',
        showloading: true
    };
    public static readonly getByp_keyIndex: any = {
        url: '/rest/patable2s/getbyp_key/{field1}',
        method: 'GET',
        showloading: true
    };
    public static readonly getDatatableData: any = {
        url: '/rest/patable2s/datatable',
        method: 'POST',
        showloading: true
    };
    public static readonly create: any = {
        url: '/rest/patable2s/',
        method: 'POST',
        showloading: true
    };
    public static readonly autoSuggestService: any = {
        url: '/rest/patable2s/autosuggest',
        method: 'GET',
        showloading: true
    };
}