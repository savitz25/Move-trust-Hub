ï»¿(function () {
    'use strict';

    var consumerModule = angular.module('App');

    consumerModule.factory('LicenseDataService', function ($http, $q, $cacheFactory) {
        return ({          
            GetLicenseToReset: GetLicenseToReset,
            GetIssuersInfo: GetIssuersInfo,
            getItemTypeForLicenseType: getItemTypeForLicenseType,
            getItemTypeAttributeForItemType: getItemTypeAttributeForItemType,
            getAttributeDropDownCollection:getAttributeDropDownCollection,
            UpdateMassLicItemValues: UpdateMassLicItemValues
        });
             
                
        function GetLicenseToReset() {
            var request = $http({ method: 'GET', url: '../api/License/GetLicenseToReset' });
            return (request.then(successHandler, errorHanlder));
        }


        function GetIssuersInfo() {
            var request = $http({ method: 'GET', cache: true, url: '../api/IssuerInformation/getIssuerInfo' });
            return (request.then(successHandler, errorHanlder));
        }
        function getItemTypeForLicenseType(licenseType) {
            var request = $http({ method: 'GET', url: '../api/License/getItemtypeForLicenseType', params: { intLicTypeSeq: licenseType } });
            return (request.then(successHandler, errorHanlder));
        }

        function getItemTypeAttributeForItemType(itemType) {
            var request = $http({ method: 'GET', url: '../api/License/getItemTypeAttributeForItemType', params: { intItemTypeSeq: itemType } });
            return (request.then(successHandler, errorHanlder));
        }

        function getAttributeDropDownCollection(strItemAttName) {
            var request = $http({ method: 'GET', url: '../api/License/getAttributeDropDownCollection', params: { strItemAttName: strItemAttName } });
            return (request.then(successHandler, errorHanlder));
        }

        function UpdateMassLicItemValues(objMassLicenseItemModifyList) {
            var request = $http({ method: 'POST', url: '../api/License/UpdateMassLicenseItems', data: objMassLicenseItemModifyList });
            return (request.then(successHandler, errorHanlder));
        }


        function successHandler(response) {
            return response.data
        }

        function errorHanlder(response) {
            if (!angular.isObject(response.data) || response.data.message) {
                return ($q.reject('An error occured'));
            }
            return ($q.reject(response.data.message));
        }

    })
})
()


