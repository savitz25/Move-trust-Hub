ï»¿(function () {
    'use strict';

    var consumerModule = angular.module('App');

    consumerModule.factory('ReportDataService', function ($http, $q, $cacheFactory) {
        return ({
            getReports: getReports,
            getBaseReportUrl: getBaseReportUrl,
            getReportFolder: getReportFolder,
            getReportUrl: getReportUrl,
            getReportParameters: getReportParameters,
            getWebApiParams: getWebApiParams,
            getReportswithCredential: getReportswithCredential,
            getReportApplicationSecret: getReportApplicationSecret
        });

        //When click on search button then Get Consumer Details. First TAB
        function getReports(objReport) {
            var request = $http({ method: 'POST', url: '../api/Reports/getReports',data: JSON.stringify(objReport)});
            return (request.then(successHandler, errorHandler));
        }

        function getReportswithCredential() {
            var request = $http({ method: 'GET', url: '../api/Reports/getReportswithCredential' });
            return (request.then(successHandler, errorHandler));
        }

        function getReportApplicationSecret() {
            var request = $http({ method: 'GET', url: '../api/security/GetReportApplicationSecret' });
            return (request.then(successHandler, errorHandler));
        }

        function getBaseReportUrl() {
            var request = $http({ method: 'GET', url: '../api/Reports/getBaseReportURL' });
            request.then(function (data) {
                sessionStorage.setItem("baseReportUrl", JSON.stringify(data));
            },errorHandler)
            //return (request.then(successHandler, errorHandler));
        }

        function getReportFolder() {
            var request = $http({ method: 'GET', url: '../api/Reports/getReports' });
            request.then(function (data) {
                sessionStorage.setItem('reportFolder', JSON.stringify(data))
            },errorHandler);
           // return (request.then(successHandler, errorHandler));

        }
        function getReportParameters(repName,firstParam) {
            var request = $http({ method: 'GET', url: '../api/Reports/getReports', params: { ReportName: repName, firstParam: firstParam } });
            return (request.then(successHandler, errorHandler));

            
        }
        function getReportUrl(objReport) {
            var _baseUrl = JSON.parse(sessionStorage.getItem("baseReportUrl"));
            var _ReportPath = JSON.parse(sessionStorage.getItem("reportFolder"));

        }

        //construct webApi for Report, currently allowed paramter is restricted 6
        //if required can be extended to avail more parameters
        function getWebApiParams(reportName, param1, param2, param3, param4,param5,param6) {
            var _baseWebApiUrl = '../api/Reports/getReports';
            //var _appSecret = getReportApplicationSecret();
            //Add ReportName

            var finalUrl = _baseWebApiUrl.concat('?ReportName=' + reportName);
            if (param1 != undefined) { finalUrl = finalUrl.concat('&param1=' + param1) }
            if (param2 != undefined) { finalUrl = finalUrl.concat('&param2=' + param2) }
            if (param3 != undefined) { finalUrl = finalUrl.concat('&param3=' + param3) }
            if (param4 != undefined) { finalUrl = finalUrl.concat('&param4=' + param4) }
            if (param5 != undefined) { finalUrl = finalUrl.concat('&param5=' + param3) }
            if (param6 != undefined) { finalUrl = finalUrl.concat('&param6=' + param4) }

            var request = $http({ method: 'GET', url: finalUrl });
            return (request.then(successHandler, errorHandler));
                
        }

        function successHandler(response) {
            return response.data
        }

        function errorHandler(response) {
            if (!angular.isObject(response.data) || response.data.message) {
                return ($q.reject('An error occured'));
            }
            return ($q.reject(response.data.message));
        }

    })
})
()


