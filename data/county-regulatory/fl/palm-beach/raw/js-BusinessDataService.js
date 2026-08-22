ï»¿(function () {
    'use strict';

    var consumerModule = angular.module('App');

    consumerModule.factory('BusinessDataService', function ($http, $q, $cacheFactory) {
        return ({
            GetAllBusTypes: GetAllBusTypes,
            GetAllProductsList: GetAllProductsList,
            GetProductsListByBusId: GetProductsListByBusId,
            GetAllBusinessDetails: GetAllBusinessDetails,
            GetAllConsumerActivityDetails:GetAllConsumerActivityDetails,
            GetAllContactDetails: GetAllContactDetails,
            GetAllBusinessNameAndProduct: GetAllBusinessNameAndProduct,
            GetAllIdentifierDetails: GetAllIdentifierDetails,
            GetAllAliasDetails: GetAllAliasDetails,
            GetAllActivityDetails: GetAllActivityDetails,
            GetLicenseActivityMailLog: GetLicenseActivityMailLog,
            GetActivityforComplaint: GetActivityforComplaint,          
            GetPhoneLogActivityDetails: GetPhoneLogActivityDetails,
            GetMessageListActivityDetails: GetMessageListActivityDetails,
            GetBusTypes: GetBusTypes,
            GetProducts: GetProducts,
            GetCity: GetCity,
            GetStates: GetStates,
            GetVFHDriversPhoto: GetVFHDriversPhoto,
            GetTowingDriversPhoto: GetTowingDriversPhoto,
            GetCaregiverPhoto: GetCaregiverPhoto,
            GetAdultEntertainerPhoto: GetAdultEntertainerPhoto,
           GetProductsForBusType: GetProductsForBusType
        });

        //TEST V10

        ////Here Get Business Types.
        //function GetBusinessTypes() {            
        //    var request = $http({ method: 'GET', cache: true, url: '../api/BIR/GetBusinessTypes' }); Remove from constructor. Add one entry on constructor
        //    return (request.then(successHandler, errorHanlder));            
        //}



        //Here Get ALL Business Types.
        function GetAllBusTypes() {
            var request = $http({ method: 'GET', cache: true, url: '../api/Business/GetAllBusTypes' });
            return (request.then(successHandler, errorHanlder));
        }
        function GetBusTypes() {
            var request = $http({ method: 'GET', url: '../api/Business/GetBusTypes' });
            return (request.then(successHandler, errorHanlder));
        }
        function GetProducts() {
            var request = $http({ method: 'GET', url: '../api/Business/GetProducts' });
            return (request.then(successHandler, errorHanlder));
        }

        function GetProductsForBusType() {
            var request = $http({ method: 'GET', url: '../api/Business/GetProductsForBusType' });
            return (request.then(successHandler, errorHanlder));
        }
        //Here Get Product Lists.
        function GetAllProductsList() {
            var request = $http({ method: 'GET', url: '../api/Business/GetAllProductsList' });
            return (request.then(successHandler, errorHanlder));
        }

        //Get Business Name and Product of each Business from Database View.
        function GetProductsListByBusId(BusinessSeq) {
            var request = $http({ method: 'GET', url: '../api/Business/GetProductsListByBusId', params: { BusinessSeq: BusinessSeq } });
            return (request.then(successHandler, errorHanlder));
        }

        //When click on search button then Get Business Details. First TAB
        function GetAllBusinessDetails(searchByContactSeq) {
            var request = $http({ method: 'GET', url: '../api/Business/GetBusinessDetailsbyId', params: { searchByContactSeq: searchByContactSeq } });
            return (request.then(successHandler, errorHanlder));
        }

        //NOTE : Get All Business Name and Product of each Business from Database View
        function GetAllBusinessNameAndProduct() {
            var request = $http({ method: 'GET', cache: true, url: '../api/Business/GetBusinessNameAndProducts' });
            return (request.then(successHandler, errorHanlder));
        }



        //When click on Contact Information TAB button then Get Business Contact
        function GetAllContactDetails(searchByBusSeq) {
            var request = $http({ method: 'GET', url: '../api/Business/GetBusinessContactbyId', params: { searchByBusSeq: searchByBusSeq } });
            return (request.then(successHandler, errorHanlder));
        }



        //When click on Tab Alias TAB button then Get Business Alias. Note : Alias and Identifier call same time.       
        function GetAllAliasDetails(searchByBusSeq) {
            var request = $http({ method: 'GET', url: '../api/Business/GetBusinessAliasbyId', params: { searchByBusSeq: searchByBusSeq } });
            return (request.then(successHandler, errorHanlder));
        }


        //When click on Tab Alias TAB button then  Get Business Identifier. Note : Alias and Identifier call same time.        
        function GetAllIdentifierDetails(searchByBusSeq) {
            var request = $http({ method: 'GET', url: '../api/Business/GetBusinessIdentifierbyId', params: { searchByBusSeq: searchByBusSeq } });
            return (request.then(successHandler, errorHanlder));
        }

        //When click on Tab Activity TAB button then  Get Business Activity. Note : Details and List call same time.        
        function GetAllActivityDetails(searchByBusSeq) {
            var request = $http({ method: 'GET', url: '../api/Business/GetBusinessActivitybyId', params: { searchByBusSeq: searchByBusSeq } });
            return (request.then(successHandler, errorHanlder));
        }


        //When click on Tab Activity TAB button then  Get Consumer Activity. Note : Details and List call same time.        
        function GetAllConsumerActivityDetails(searchByBusSeq) {
            var request = $http({ method: 'GET', url: '../api/Business/GetConsumerActivitybyId', params: { searchByBusSeq: searchByBusSeq } });
            return (request.then(successHandler, errorHanlder));
        }

        //When click on Tab Activity TAB button then  Get Business Activity. Note : Details and List call same time.        
        function GetLicenseActivityMailLog(searchByLicSeq, isComplaintOrLicense) {
            var request = $http({ method: 'GET', url: '../api/Business/GetLicenseActivityMailLog', params: { searchByLicSeq: searchByLicSeq, isComplaintOrLicense: isComplaintOrLicense } });
            return (request.then(successHandler, errorHanlder));
        }


        //When click on Tab Activity TAB button then  Get Complaint Activity. Note : Details and List call same time.        
        function GetActivityforComplaint(searchByBusSeq) {
            var request = $http({ method: 'GET', url: '../api/Business/GetActivityforComplaint', params: { searchByBusSeq: searchByBusSeq } });
            return (request.then(successHandler, errorHanlder));
        }
        
        //When click on Phone Log Link then  Get Phone Log Activity.
        function GetPhoneLogActivityDetails(searchByUser, startDate, endDate, searchName, searchNotes, userRole, clickOnSearch) {

            //var dataObject = { searchBy: searchBy };

            var request = $http({ method: 'GET', url: '../api/Business/GetBusinessActivityforPhoneLog', params: { searchByUser: searchByUser, startDate: moment(startDate).format('MM/DD/YYYY'), endDate: moment(endDate).format('MM/DD/YYYY'), searchName: searchName, searchNotes: searchNotes, userRole: userRole, clickOnSearch: clickOnSearch } });
            return (request.then(successHandler, errorHanlder));
        }


        //When click on Phone Log Link then  Get Phone Log Activity.
        function GetMessageListActivityDetails(searchByUser, startDate, endDate, userRole, clickOnSearch) {

            var request = $http({ method: 'GET', url: '../api/Business/GetActivityforMessageList', params: { searchByUser: searchByUser, startDate: moment(startDate).format('MM/DD/YYYY'), endDate: moment(endDate).format('MM/DD/YYYY'), userRole: userRole, clickOnSearch: clickOnSearch } });
            return (request.then(successHandler, errorHanlder));
        }

        //Get Cities
        function GetCity() {
            var request = $http({ method: 'GET', cache: true, url: '../api/Address/GetCity' });
            return (request.then(successHandler, errorHanlder));
        }

        //Get States
        function GetStates() {
            var request = $http({ method: 'GET', cache: true, url: '../api/Address/GetState' });
            return (request.then(successHandler, errorHanlder));
        }


        function GetVFHDriversPhoto(licenseNum) {
            var request = $http({ method: 'GET', url: '../api/Business/GetVFHDriversPhoto', params: { LicenseNumber: licenseNum } });

            return (request.then(successHandler, errorHanlder));
        }

        function GetTowingDriversPhoto(licenseNum) {
            var request = $http({ method: 'GET', url: '../api/Business/GetTowingDriversPhoto', params: { LicenseNumber: licenseNum } });
            return (request.then(successHandler, errorHanlder));
        }

            function GetCaregiverPhoto(licenseNum) {
                var request = $http({ method: 'GET', url: '../api/Business/GetCaregiverPhoto', params: { LicenseNumber: licenseNum } });
            
            return (request.then(successHandler, errorHanlder));
            }

            function GetAdultEntertainerPhoto(licenseNum) {
                var request = $http({ method: 'GET', url: '../api/Business/GetAdultEntertainerPhoto', params: { LicenseNumber: licenseNum } });

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


