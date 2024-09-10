import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const testJSON = require('../../pageobjects/standardPageobjects/PaTable1/patable1List.json');
const testCustomJSON = require('../../pageobjects/customPageobjects/PaTable1/patable1List.json');
const mockData = require('../../mockData/PaTable1/patable1Listmockdata.json')
import testcaseService from '../../../services/testcase.service.ts';
import { browser, $, $$ } from '@wdio/globals';
testJSON.components = testJSON.components.concat(testCustomJSON.components);
import { environment } from '../../environment.ts';
var mockDataRes: never[] = [];
var cookies: any;
await describe(testJSON.pageName + ' | PageLoad | Open', async () => {
    await it('Verify whether the page is open', async () => {
        await browser.url(environment.baseUrl);
        await $('#main-container').waitForExist({ timeout: 50000 });
        cookies = await browser.getCookies(['RSESSION']);
        mockData.create.requestDetails.requestUrl = environment.baseUrl + mockData.create.requestDetails.requestUrl;
        await testcaseService.createMockupRecord(mockData.create, cookies, mockDataRes);
        await browser.pause(2000);
        await browser.url(environment.baseUrl + environment.defaultPath + testJSON.pageUrl);
        if (testJSON.elementConfirm)
            await $(testJSON.elementConfirm.selector).waitForExist({ timeout: testJSON.elementConfirm.time || 50000 });
    });
})
var lastComponent = testJSON.components[testJSON.components.length-1];
var lastTest = lastComponent.tests[lastComponent.tests.length - 1];
var lastTestCasename = lastTest.testcases[lastTest.testcases.length - 1].name;
await testJSON.components.forEach(async (component: any) => {
    if (!component || component.length == 0)
        return
    for (const test of component.tests) {
         describe(testJSON.pageName + ' | ' + component.name + ' | ' + test.name, async () => {
            await testcaseService.iterateTestCases(test.testcases, callback, lastTestCasename);
        })
    }
});
function callback() {
    const url = environment.baseUrl + mockData.delete.requestDetails.requestUrl;
    testcaseService.deleteMockupRecord(url, (mockDataRes || []).toString(), cookies)
}

