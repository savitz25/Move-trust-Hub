ï»¿(function () {
    'use strict';

    var consumerModule = angular.module('App');

    consumerModule.factory('PortalDataService', function ($http, $q) {
        return ({
            GetBusinessNames: GetBusinessNames,
            GetLicenseList: GetLicenseList,
            GetAdministrativeActions: GetAdministrativeActions,
            GetComplaintBusinessInfo: GetComplaintBusinessInfo,
            GetComplaintBusinessInfo_SQL: GetComplaintBusinessInfo_SQL,
            GetListOfProducts: GetListOfProducts,
            GetComplaintDetails: GetComplaintDetails,
            GetComplaintDetails_SQL: GetComplaintDetails_SQL,
            GetCaseSummary: GetCaseSummary,
            GetCaseSummary_SQL: GetCaseSummary_SQL,
            GetDisputeInfoDetails: GetDisputeInfoDetails,
            GetComplaintDetails_SQL_Consumer: GetComplaintDetails_SQL_Consumer,
            GetSearchValues: GetSearchValues,
            GetCities: GetCities,
            GetCityList: GetCityList,
            GetCompaniesActionDetails: GetCompaniesActionDetails,
            GetCaseSummary_SQL_Consumer: GetCaseSummary_SQL_Consumer,
            SearchDriver: SearchDriver,
            SearchHomeCaregiver: SearchHomeCaregiver,
            GetPermittedDrivers: GetPermittedDrivers
        });

        //BIR - Get Search Result
        function GetBusinessNames(searchBy, searchFor, productSeq) {
            var request = $http({ method: 'GET', url: '../api/BIR/GetBusinessNames', params: { searchBy: searchBy, searchFor: searchFor, productSeq: productSeq } });
            return (request.then(successHandler, errorHandler));
        }



        //BIR - Get Product category on the basis of selected Business Type
        function GetListOfProducts(busTypeSeq) {
            var request = $http({ method: 'GET', url: '../api/BIR/GetListOfProducts', params: { busTypeSeq: busTypeSeq } });
            return (request.then(successHandler, errorHandler));
        }



        //BIR - First Query
        function GetLicenseList(businessSeq, licenseRequired, retunCode) {
            var request = $http({ method: "GET", url: '../api/BIR/GetLicenseList', params: { businessSeq: businessSeq, licenseRequired: licenseRequired, retunCode: retunCode } });
            return (request.then(successHandler, errorHandler));

        }

        //BIR - Second Query
        function GetAdministrativeActions(businessSeq, retunCode) {
            var request = $http({ method: "GET", url: '../api/BIR/GetAdministrativeActions', params: { businessSeq: businessSeq, retunCode: retunCode } });
            return (request.then(successHandler, errorHandler));

        }


        //BIR - Third Query -  Calling for Only in BIR Report
        function GetComplaintBusinessInfo(businessSeq, productSeq, retunCode) {
            var request = $http({ method: "GET", url: '../api/BIR/GetComplaintBusinessInfo_SQL', params: { businessSeq: businessSeq, productSeq: productSeq, retunCode: retunCode } });
            return (request.then(successHandler, errorHandler));
        }

        //BIR - Third Query -  Calling for Only in Business Complaint Tab Report
        function GetComplaintBusinessInfo_SQL(businessSeq, retunCode) {
            var request = $http({ method: "GET", url: '../api/BIR/GetComplaintBusinessInfo_SQL', params: { businessSeq: businessSeq, retunCode: retunCode } });
            return (request.then(successHandler, errorHandler));
        }



        //BIR - Fourth Query - Calling for Only in BIR Report
        function GetComplaintDetails(businessSeq, retunCode) {
            var request = $http({ method: "GET", url: '../api/BIR/GetComplaintDetails_SQL', params: { businessSeq: businessSeq, retunCode: retunCode } });
            return (request.then(successHandler, errorHandler));
        }


        //BIR - Fourth Query -  Calling for Only in Business Complaint Tab Report
        function GetComplaintDetails_SQL(businessSeq, retunCode) {
            var request = $http({ method: "GET", url: '../api/BIR/GetComplaintDetails_SQL', params: { businessSeq: businessSeq, retunCode: retunCode } });
            return (request.then(successHandler, errorHandler));
        }
        //BIR - Fourth Query -  Calling for Only in Consumer Complaint Tab Report
        function GetComplaintDetails_SQL_Consumer(businessSeq, consumerSeq, retunCode) {
            var request = $http({ method: "GET", url: '../api/BIR/GetComplaintDetails_SQL_Consumer', params: { businessSeq: businessSeq, consumerSeq: consumerSeq, retunCode: retunCode } });
            return (request.then(successHandler, errorHandler));
        }


        //BIR - Fourth Query -  Calling for Only in Business Complaint Tab Report
        function GetComplaintDetails_SQL(businessSeq, retunCode) {
            var request = $http({ method: "GET", url: '../api/BIR/GetComplaintDetails_SQL', params: { businessSeq: businessSeq, retunCode: retunCode } });
            return (request.then(successHandler, errorHandler));
        }
        //BIR - Fourth Query -  Calling for Only in Consumer Complaint Tab Report
        function GetComplaintDetails_SQL_Consumer(businessSeq, consumerSeq, retunCode) {
            var request = $http({ method: "GET", url: '../api/BIR/GetComplaintDetails_SQL_Consumer', params: { businessSeq: businessSeq, consumerSeq: consumerSeq, retunCode: retunCode } });
            return (request.then(successHandler, errorHandler));
        }

        //BIR - Fifth Query -  Calling for Only in BIR Report
        function GetCaseSummary(intBusinessSeq, caseTotal, status, retunCode) {
            var request = $http({ method: "GET", url: '../api/BIR/GetCaseSummary_SQL', params: { intBusinessSeq: intBusinessSeq, caseTotal: caseTotal, status: status, retunCode: retunCode } });
            return (request.then(successHandler, errorHandler));
        }


        //BIR - Fifth Query -  Calling for Only in Business Complaint Tab Report
        function GetCaseSummary_SQL(intBusinessSeq, caseTotal, status, retunCode) {
            var request = $http({ method: "GET", url: '../api/BIR/GetCaseSummary_SQL', params: { intBusinessSeq: intBusinessSeq, caseTotal: caseTotal, status: status, retunCode: retunCode } });
            return (request.then(successHandler, errorHandler));
        }

        function GetCaseSummary_SQL_Consumer(intBusinessSeq, intConsumerSeq, caseTotal, status, retunCode) {
            var request = $http({ method: "GET", url: '../api/BIR/GetCaseSummary_SQL_Consumer', params: { intBusinessSeq: intBusinessSeq, intConsumerSeq: intConsumerSeq, caseTotal: caseTotal, status: status, retunCode: retunCode } });
            return (request.then(successHandler, errorHandler));
        }

        //BIR - Sixth Query
        function GetDisputeInfoDetails(businessSeq, retunCode) {
            var request = $http({ method: "GET", url: '../api/BIR/GetDisputeInfoDetails', params: { businessSeq: businessSeq, retunCode: retunCode } });
            return (request.then(successHandler, errorHandler));
        }




        //Moving - Towing and Vehicle for Driver
        function GetSearchValues(BusinessType, SearchBy, SearchFor) {
            var request = $http({ method: 'GET', url: '../api/Companies/GetCompanies', params: { BusinessType: BusinessType, SearchBy: SearchBy, SearchFor: SearchFor } });
            return (request.then(successHandler, errorHandler));
        }

        function GetCities(businessSeq) {
            var request = $http({ method: 'GET', url: '../api/LicensedDrivers/GetCities', params: { businessSeq: businessSeq } })

            return (request.then(successHandler, errorHandler));
        }


        function GetCityList() {
            var request = $http({ method: 'GET', url: '../api/LicensedDrivers/GetCityList' })

            return (request.then(successHandler, errorHandler));
        }





        function GetCompaniesActionDetails(businessSeq) {
            var request = $http({ method: 'GET', url: '../api/Companies/GetCompaniesActionDetails', params: { businessSeq: businessSeq } })

            return (request.then(successHandler, errorHandler));
        }


        ////License Drivers
        //function SearchDriver(drivername) {
        //    var request = $http({ method: 'GET', url: '../api/LicensedDrivers/GetLicensedDrivers', params: { drivername: drivername } })

        //    return (request.then(successHandler, errorHandler));
        //}

        //License Drivers
        function SearchDriver(searchBy, towingDriver) {
            var request = $http({ method: 'GET', url: '../api/LicensedDrivers/GetLicensedDrivers', params: { searchBy: searchBy, towingDriver: towingDriver } })

            return (request.then(successHandler, errorHandler));
        }

        //Home Caregiver
        function SearchHomeCaregiver(searchBy, homeCaregiver) {
            var request = $http({ method: 'GET', url: '../api/LicensedDrivers/GetHomeCaregiver', params: { searchBy: searchBy, homeCaregiver: homeCaregiver } })

            return (request.then(successHandler, errorHandler));
        }



        //Permited Drivers
        function GetPermittedDrivers(PermittedDrivers) {
            var request = $http({ method: 'GET', url: '../api/LicensedDrivers/GetPermittedDrivers', params: { PermittedDrivers: PermittedDrivers } })

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

