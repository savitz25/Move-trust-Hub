ï»¿(function () {
    'use strict';

    var consumerModule = angular.module('App');

    consumerModule.factory('ComplaintDataService', function ($http, $q, $cacheFactory, $timeout) {

        return ({
            GetComplaintDetails: GetComplaintDetails,
            GetResolutions: GetResolutions,
            GetUsers: GetUsers,
            GetAllUsers: GetAllUsers,
            GetComplaintStaff: GetComplaintStaff,
            AddSpecificUser: AddSpecificUser,
            GetBusinessTypes: GetBusinessTypes,
            GetAllegedViolation: GetAllegedViolation,
            GetMailTypes: GetMailTypes,
            GetProducts: GetProducts,
            GetComplaintMailTypes: GetComplaintMailTypes,
            GetCode: GetCode,
            GetAllCodes: GetAllCodes,
            GetLicenseTypes: GetLicenseTypes,
            GetBlockedDays: GetBlockedDays,
            GetCATSPortalURL: GetCATSPortalURL,
            GETCAReferenceKey: GETCAReferenceKey,
            GetLicenseStatus: GetLicenseStatus,
            getActivityTypes: getActivityTypes,
            getCallTypes: getCallTypes,
            SaveMassActivity: SaveMassActivity,
            UpdateMassLicStatus: UpdateMassLicStatus,
            InsertMassLicense: InsertMassLicense,
            GetComplaintStatus: GetComplaintStatus,
            GetLicenseTypeNotExpired: GetLicenseTypeNotExpired
        });

        function GetComplaintStatus() {

            var _status = [{ status: 'NEW REQUEST' }, { status: 'OPEN/PENDING' }, { status: 'CASE CLOSED' }, { status: 'CLOSED/REVIEWED' }];
            return _status;
        }

        function GetResolutions() {
            GetCode("Resolution");
            return sessionStorage.getItem("resolutionDetails");

        }

        function GetLicenseTypes() {
            GetCode("LicenseTypes");
            return sessionStorage.getItem("licenseTypeDetails");

        }

        function GetBlockedDays() {
            GetCode("BlockedDaysList");
            return sessionStorage.getItem("blockedDaysList");

        }

        function GetCATSPortalURL() {
            GetCode("GetCATSPortalURLName");
            return sessionStorage.getItem("getCATSPortalURLName");

        }

        function GETCAReferenceKey() {
            GetCode("GETCAReferenceKeyValue");
            return sessionStorage.getItem("getCAReferenceKeyValue");

        }

        function GetLicenseTypeNotExpired() {
            GetCode("LicenseTypesNotExpired");
            return sessionStorage.getItem("licenseTypeNotExpiredDetails");

        }

        function GetLicenseStatus() {
            GetCode("LicenseStatuses");
            return sessionStorage.getItem("licenseStatusesDetails");

        }

        function GetAllegedViolation() {
            GetCode("AllegedViolation");
            return sessionStorage.getItem("allegedViolationDetails");
        }

        function GetUsers() {
            GetCode("Users");
            var _users = [];
            _users = $.grep(JSON.parse(sessionStorage.getItem("usersDetails")), function (e) {
                return e.Termination_Date == null;
            });
            return _users;
            //return sessionStorage.getItem("usersDetails");
        }

        function GetAllUsers() {
            GetCode("Users");
            return sessionStorage.getItem("usersDetails");

        }

        function GetComplaintStaff() {
            GetCode("ComplaintStaff");

            var _staff = [];

            _staff = $.grep(JSON.parse(sessionStorage.getItem("complaintStaff")), function (e) {
                return e.Termination_Date == null;
            });

            return _staff;
        }

        function AddSpecificUser(activeusers, specificuser) {
            var _obj = activeusers.filter(function (e) {
                return e.SecurityUserSeq === specificuser
            });

            if (_obj.length == 0) {
                var _obj = JSON.parse(sessionStorage.getItem("usersDetails")).filter(function (e) {
                    return e.SecurityUserSeq === specificuser;
                });

                if (_obj != null) { activeusers.push(_obj[0]); }
            }
            return activeusers;
        }

        function GetBusinessTypes() {
            GetCode("BusinessTypes");
            return sessionStorage.getItem("businessTypesDetails");
        }

        function GetMailTypes() {
            GetCode("MailTypes");
            return sessionStorage.getItem("mailTypesDetails");
        }

        function GetAllCodes() {
            GetCode("Resolution");
            GetCode("AllegedViolation");
            GetCode("Users");
            GetCode("ComplaintStaff");
            GetCode("BusinessTypes");
            GetCode("MailTypes");
            GetCode("LicenseTypes");
            GetCode("BlockedDaysList");
            GetCode("GetCATSPortalURLName");
            GetCode("GETCAReferenceKeyValue");
            GetCode("LicenseTypesNotExpired");
            GetCode("LicenseStatuses");
        }

        function GetCode(currentRequest) {

            switch (currentRequest) {
                case "Resolution":
                    if (sessionStorage.getItem("resolutionDetails") == null) {
                        $timeout(function () {
                            $http({ method: 'GET', url: '../api/Complaint/GetResolutions' }).success(function (data) {
                                sessionStorage.setItem("resolutionDetails", JSON.stringify(data));
                            })
                        }, 1000);
                    }
                    break;
                case "AllegedViolation":
                    if (sessionStorage.getItem("allegedViolationDetails") == null) {
                        $timeout(function () {
                            $http({ method: 'GET', url: '../api/Complaint/GetAllegedViolation' }).success(function (data) {
                                sessionStorage.setItem("allegedViolationDetails", JSON.stringify(data));
                            })
                        }, 1000);
                    }
                    break;
                case "Users":
                    if (sessionStorage.getItem("usersDetails") == null) {
                        $timeout(function () {
                            $http({ method: 'GET', url: '../api/Security/GetUsers' }).success(function (data) {
                                sessionStorage.setItem("usersDetails", JSON.stringify(data));
                            })
                        }, 1000);
                    }
                    break;
                case "ComplaintStaff":
                    if (sessionStorage.getItem("complaintStaff") == null) {
                        $timeout(function () {
                            $http({ method: 'GET', url: '../api/Security/GetComplaintStaff' }).success(function (data) {
                                sessionStorage.setItem("complaintStaff", JSON.stringify(data));
                            })
                        }, 1000);
                    }
                    break;
                case "BusinessTypes":
                    if (sessionStorage.getItem("businessTypesDetails") == null) {
                        $timeout(function () {
                            $http({ method: 'GET', url: '../api/BIR/GetBusinessTypes' }).success(function (data) {
                                sessionStorage.setItem("businessTypesDetails", JSON.stringify(data.ListBusinessTypes));
                            })
                        }, 3000);
                    }
                    break;
                case "MailTypes":
                    if (sessionStorage.getItem("mailTypesDetails") == null) {
                        $timeout(function () {
                            $http({ method: 'GET', url: '../api/MailLog/GetMailType' }).success(function (data) {
                                sessionStorage.setItem("mailTypesDetails", JSON.stringify(data));
                            })
                        }, 3000);
                    }
                    break;
                case "LicenseTypes":
                    if (sessionStorage.getItem("licenseTypeDetails") == null) {
                        $timeout(function () {
                            $http({ method: 'GET', url: '../api/License/GetLicenseType' }).success(function (data) {
                                sessionStorage.setItem("licenseTypeDetails", JSON.stringify(data));
                            })
                        }, 1000);
                    }
                    break;

                case "BlockedDaysList":
                    if (sessionStorage.getItem("blockedDaysList") == null) {
                        $timeout(function () {
                            $http({ method: 'GET', url: '../api/Portal/GetBlockedDaysList' }).success(function (data) {
                                sessionStorage.setItem("blockedDaysList", JSON.stringify(data));
                            })
                        }, 1000);
                    }
                    break;
                case "GetCATSPortalURLName":
                    if (sessionStorage.getItem("getCATSPortalURLName") == null) {
                        $timeout(function () {
                            $http({ method: 'GET', url: '../api/Portal/GetCATSPortalURLName' }).success(function (data) {
                                sessionStorage.setItem("getCATSPortalURLName", JSON.stringify(data));
                            })
                        }, 1000);
                    }
                    break;
                case "GETCAReferenceKeyValue":
                    if (sessionStorage.getItem("getCAReferenceKeyValue") == null) {
                        $timeout(function () {
                            $http({ method: 'GET', url: '../api/Portal/GETCAReferenceKeyValue' }).success(function (data) {
                                sessionStorage.setItem("getCAReferenceKeyValue", JSON.stringify(data));
                            })
                        }, 1000);
                    }
                    break;
                case "LicenseTypesNotExpired":
                    if (sessionStorage.getItem("licenseTypeNotExpiredDetails") == null) {
                        $timeout(function () {
                            $http({ method: 'GET', url: '../api/License/GetLicenseTypeNotExpired' }).success(function (data) {
                                sessionStorage.setItem("licenseTypeNotExpiredDetails", JSON.stringify(data));
                            })
                        }, 1000);
                    }
                    break;
                case "LicenseStatuses":
                    if (sessionStorage.getItem("licenseStatusesDetails") == null) {
                        $timeout(function () {
                            $http({ method: 'GET', url: '../api/License/GetLicenseStatus' }).success(function (data) {
                                sessionStorage.setItem("licenseStatusesDetails", JSON.stringify(data));
                            })
                        }, 1000);
                    }
                    break;

            }
        }

        ////Here Get ALL Resolutions.
        //function GetResolutions() {         
        //    var request = $http({ method: 'GET', cache: true, url: '../api/Complaint/GetResolutions' });
        //    return (request.then(successHandler, errorHanlder));
        //}

        ////Here Get ALL Allegations.
        //function GetAllegedViolation() {           
        //    var request = $http({ method: 'GET', cache: true, url: '../api/Complaint/GetAllegedViolation' });
        //    return (request.then(successHandler, errorHanlder));
        //}

        //Here Get ALL Users.
        //function GetUsers() {
        //    var request = $http({ method: 'GET', cache: true, url: '../api/Security/GetUsers' });
        //    return (request.then(successHandler, errorHanlder));
        //}


        //Here Get ALL Businesses Types.
        //function GetBusinessTypes() {
        //    var request = $http({ method: 'GET', cache: true, url: '../api/BIR/GetBusinessTypes' });
        //    return (request.then(successHandler, errorHanlder));
        //}

        function GetComplaintDetails(intcomplaintSeq) {
            var request = $http({ method: 'GET', url: '../api/Complaint/GetComplaintbyId', params: { intcomplaintSeq: intcomplaintSeq } });
            return (request.then(successHandler, errorHanlder));
        }

        function GetProducts(intBusType) {
            var request = $http({ method: 'GET', url: '../api/Complaint/GetProducts', params: { intBusType: intBusType } });
            return (request.then(successHandler, errorHanlder));
        }

        function GetComplaintMailTypes(intMailRefSeq) {
            var request = $http({ method: 'GET', url: '../api/MailLog/GetComplaintMailTypes', params: { intMailRefSeq: intMailRefSeq } });
            return (request.then(successHandler, errorHanlder));
        }

        function getActivityTypes() {
            var request = $http({ method: 'GET', url: '../api/Business/GetActivityType' });
            return (request.then(successHandler, errorHanlder));
        }

        function getCallTypes() {
            var request = $http({ method: 'GET', url: '../' + 'api/Business/GetCallType' });
            return (request.then(successHandler, errorHanlder));
        }

        function GetComplaintMailTypes(intMailRefSeq) {
            var request = $http({ method: 'GET', url: '../api/Complaint/save', params: { intMailRefSeq: intMailRefSeq } });
            return (request.then(successHandler, errorHanlder));
        }

        function SaveMassActivity(objMassActivity) {
            var request = $http({ method: 'POST', url: '../api/Complaint/SaveMassActivity', data: objMassActivity });
            return (request.then(successHandler, errorHanlder));
        }

        function UpdateMassLicStatus(objMassLicenseStatusChangeList) {
            var request = $http({ method: 'POST', url: '../api/Complaint/UpdateMassLicenseStatus', data: objMassLicenseStatusChangeList });
            return (request.then(successHandler, errorHanlder));
        }

        function InsertMassLicense(objMassLicenseCopyList) {
            var request = $http({ method: 'POST', url: '../api/Complaint/InsertMassLicense',  data: objMassLicenseCopyList });
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


