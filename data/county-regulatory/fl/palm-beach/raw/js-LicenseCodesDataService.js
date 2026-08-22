ï»¿(function () {
    'use strict';

    var consumerModule = angular.module('App');

    consumerModule.factory('LicenseCodesDataService', function ($http, $q, $cacheFactory) {
        return ({          
            GetItemFieldNameAndItemType: GetItemFieldNameAndItemType,
            GetValidDropdonValuesBySeq: GetValidDropdonValuesBySeq,
            GetReportParameters: GetReportParameters
        });
             
                
        function GetItemFieldNameAndItemType() {
            var request = $http({ method: 'GET', url: '../api/LicenseCodes/GetItemFieldNameAndItemType' });
            return (request.then(successHandler, errorHanlder));
        }
        function GetReportParameters() {
            var request = $http({ method: 'GET', url: 'ISS.CA.WEB.CAReportViewer/ProcessRequest', LicenseSeq: LicenseSeq, reportName: reportName });
            return (request.then(successHandler, errorHanlder));
        }
        function GetValidDropdonValuesBySeq(intAttributeSeq) {
            var request = $http({ method: 'GET', url: '../api/LicenseCodes/GetValidDropdonValuesBySeq', params: { intAttributeSeq: intAttributeSeq } });
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


