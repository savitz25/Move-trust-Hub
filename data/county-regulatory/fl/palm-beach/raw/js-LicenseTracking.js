ï»¿(function () {
    'use strict';

    var ngBusiness = angular.module("App");

    ngBusiness.controller("licenseController", function ($scope, $http, $timeout, $filter, $modal, $location, $window, userservice, ExportService, ComplaintDataService, BusinessDataService, applicationConstant, userRoleConstants, ReportDataService) {
        $scope.isError = false;
        $scope.searchtext = "";
        $scope.myFilteredItems = { items1: {}, items2: {} };
        $scope.businessResults = [];
        $scope.myBusSelectedItems = [];
        $scope.myLicenseSelectedItems = [];
        $scope.busListUrl = '../' + 'api/Business/GetBusiness';
        $scope.businessListUrl = '../' + 'api/License/GetBusinessByLicense';
        $scope.businessLicListUrl = '../' + 'api/License/GetLicenseByBusiness';
        $scope.licenseListUrl = '../' + 'api/License/GetLicenseListByBusId';
        $scope.userRolesValues = userRoleConstants;
        $scope.letterTemplateUrl = '../' + 'api/LetterTemplate/GetLetterTemplates';
        $scope.chkCitationPaidDateUrl = '../' + 'api/License/GetCitationForLic';
        $scope.isSearch = false;
        $scope.showNewBtn = false;
        $scope.letterType = '';
        $scope.isTextBoxShow = false;
        $scope.callFrom = "LICENSE_MENU";
        $scope.currentLicenseSelectedRowIndex = 0;
        $scope.businessSequence = 0;
        $scope.ActiveTabIndex = 0;
        $scope.businessDetails = '';
        getDataFromSessions();

        //ADA compliance code for Tab        

        function applyTabAccessibility() {
            var $tablist = angular.element(document.querySelector('.nav.nav-tabs'));

            if (!$tablist || !$tablist.length) {
                return;
            }

            $tablist.attr('role', 'tablist');

            var $tabs = $tablist.find('li');
            var $panels = angular.element(document.querySelectorAll('.tab-content .tab-pane'));

            angular.forEach($tabs, function (tabEl, index) {
                var $tab = angular.element(tabEl);
                var $link = $tab.find('a');

                if (!$link || !$link.length) {
                    return;
                }

                var tabId = 'license_tab_link_' + index;
                var panelId = 'license_panel_' + index;
                var isActive = $tab.hasClass('active');
                var isDisabled = $tab.hasClass('disabled');

                $tab.attr('role', 'presentation');

                $link.attr('id', tabId);
                $link.attr('role', 'tab');
                $link.attr('aria-controls', panelId);
                $link.attr('aria-selected', isActive ? 'true' : 'false');

                if (isDisabled) {
                    $link.attr('aria-disabled', 'true');
                    $link.attr('tabindex', '-1');
                    $link.removeAttr('href');
                } else {
                    $link.removeAttr('aria-disabled');
                    $link.attr('tabindex', isActive ? '0' : '-1');
                    $link.attr('href', '#' + panelId);
                }

                if ($panels[index]) {
                    var $panel = angular.element($panels[index]);
                    $panel.attr('id', panelId);
                    $panel.attr('role', 'tabpanel');
                    $panel.attr('aria-labelledby', tabId);
                    $panel.attr('aria-hidden', isActive ? 'false' : 'true');

                    if (isActive) {
                        $panel.attr('tabindex', '0');
                    } else {
                        $panel.attr('tabindex', '-1');
                    }
                }
            });
        }




        $scope.initTabAccessibility = function () {
            $timeout(function () {
                applyTabAccessibility();
            }, 300);
        };

        $timeout(function () {
            applyTabAccessibility();
        }, 500);

        setTimeout(function () {
            var $tablist = angular.element(document.querySelector('.nav.nav-tabs'));
            $tablist.attr('role', 'tablist');

            var $tabs = $tablist.find('li');
            var $panels = angular.element(document.querySelectorAll('.tab-content .tab-pane'));

            angular.forEach($tabs, function (tabEl, index) {
                var $tab = angular.element(tabEl);
                var $link = $tab.find('a');

                var tabId = 'tab_link_' + index;
                var panelId = 'panel_' + index;
                var isActive = $tab.hasClass('active');

                $tab.attr('role', 'presentation');

                $link.attr('id', tabId);
                $link.attr('role', 'tab');
                $link.attr('aria-controls', panelId);
                $link.attr('aria-selected', isActive ? 'true' : 'false');
                $link.attr('href', '#' + panelId);
                $link.attr('tabindex', isActive ? '0' : '-1');

                if ($panels[index]) {
                    var $panel = angular.element($panels[index]);
                    $panel.attr('id', panelId);
                    $panel.attr('role', 'tabpanel');
                    $panel.attr('aria-labelledby', tabId);
                    $panel.attr('tabindex', '0');
                }
            });
        }, 300);


        angular.element(document).on('keydown', '.nav.nav-tabs a[role="tab"]', function (e) {
            var tabs = Array.prototype.slice.call(
                document.querySelectorAll('.nav.nav-tabs a[role="tab"]:not([aria-disabled="true"])')
            );

            var currentIndex = tabs.indexOf(e.target);

            if (currentIndex === -1) {
                return;
            }

            if (e.key === 'ArrowRight') {
                e.preventDefault();
                var nextIndex = (currentIndex + 1) % tabs.length;
                tabs[nextIndex].focus();
            }

            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                var prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
                tabs[prevIndex].focus();
            }

            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();

                if (e.target.getAttribute('aria-disabled') !== 'true') {
                    e.target.click();
                }
            }
        });

        //END ADA Compiance code



        $scope.tabs = [
            { name: 'License Details', active: true, url: '../Partials/License/License_Details.html', disabled: false },
            { name: 'Items', active: false, url: '', disabled: false },
            { name: 'Charges', active: false, url: '', disabled: false },
            { name: 'Payments', active: false, url: '', disabled: false },
            { name: 'Activity', active: false, url: '', disabled: false },
            { name: 'Letters', active: false, url: '', disabled: false },
            { name: 'Attachment', active: false, url: '', disabled: false }
        ];


        $scope.licSearchBy = [
            { name: 'Business Name', value: 'BUSINESS_NAME' },
            { name: 'Business ID', value: 'BUSINESS_ID' },
            { name: 'License Contact', value: 'LIC_CONTACT' },
            { name: 'License Number', value: 'LIC_NUMBER' },
            { name: 'Street Name', value: 'STREET_NAME' }
        ];
        $scope.myLicenseSearch = $scope.licSearchBy[0];

        function setURLInTab() {
            $scope.tabs[1].url = '../Partials/License/License_Items.html';
            $scope.tabs[2].url = '../Partials/License/License_ItemCharges.html';
            $scope.tabs[3].url = '../Partials/License/License_ItemPayment.html';
            $scope.tabs[4].url = '../Partials/Activity/ActivityDetails.html';
            $scope.tabs[5].url = '../Partials/Templates/MergeLetter.html';
            $scope.tabs[6].url = '../Partials/Templates/Attachment.html';
        }

        if (sessionStorage.length > 0 && ((sessionStorage.getItem("isLicense") != null || sessionStorage.getItem("isBusinessContact") != null) && sessionStorage.getItem("businessId") != null)) {
            getDataFromSessions();
            $scope.myLicenseSearch = $scope.licSearchBy[1];
            $scope.searchtext = sessionStorage.getItem("businessId");
            clickOnSearchBtn(true);
            sessionStorage.removeItem("isLicense");
            sessionStorage.removeItem("isBusinessContact");
        }

        if (sessionStorage.length > 0 && (sessionStorage.getItem("isPhoneLog") != null)) {
            if (sessionStorage.length > 0 && sessionStorage.getItem("PhoneLicense") != null) {
                $scope.phoneLicense = JSON.parse(sessionStorage.getItem("PhoneLicense"));
                if ($scope.phoneLicense.License_Seq !== undefined && $scope.phoneLicense.License_Seq !== "" && $scope.phoneLicense.License_Seq !== "0") {
                    $scope.licSearchBy.push({ name: 'License ID', value: 'LIC_SEQ' });
                    $scope.myLicenseSearch = $scope.licSearchBy[5];
                    $scope.searchtext = $scope.phoneLicense.License_Seq;
                    clickOnSearchBtn(true);
                    sessionStorage.removeItem("isPhoneLog");
                }
            }
        }

        if (sessionStorage.length > 0 && ((sessionStorage.getItem("portalBusinessSeq") != null))) {

            $scope.myLicenseSearch = $scope.licSearchBy[1];
            $scope.searchtext = sessionStorage.getItem("portalBusinessSeq");
            clickOnSearchBtn(true);
            sessionStorage.removeItem("portalBusinessSeq");
        }

        function getTabIndexFromTabName(tabName) {
            switch (tabName) {
                case "License Details":
                    $scope.ActiveTabIndex = 0;
                    break;
                case "Items":
                    $scope.ActiveTabIndex = 1;
                    break;
                case "Charges":
                    $scope.ActiveTabIndex = 2;
                    break;
                case "Payments":
                    $scope.ActiveTabIndex = 3;
                    break;
                case "Activity":
                    $scope.ActiveTabIndex = 4;
                    break;
                case "Letters":
                    $scope.ActiveTabIndex = 5;
                    break;
                case "Attachment":
                    $scope.ActiveTabIndex = 6;
                    break;
            }
        }

        //Get Data each time when user click on Tab
        function getDataForActiveTab(tabIndex) {
            switch (tabIndex) {
                case 0:
                    $scope.$broadcast('licenseDetailsHandler')
                    break;
                case 1:
                    $scope.$broadcast('itemsHandler');
                    break;
                case 2:
                    $scope.$broadcast('chargesHandler');
                    break;
                case 3:
                    $scope.$broadcast('paymentHandler');
                    break;
                case 4:
                    $scope.$broadcast('activityHandler');
                    break;
                case 5:
                    $scope.$broadcast('letterHandler');
                    break;
                case 6:
                    $scope.$broadcast('attachmentHandler');
                    break;
            }
        }

        $scope.printOrExport = function (event, grid, gridMain) {
            $scope.objCol = [{ formatName: 'licenseType', itemsCol: $scope.LicenseTypes }];
            ExportService.copyData(event, grid, gridMain, $scope.objCol);
            event.stopPropagation();
        }

        $scope.myTabSelected = function (tab) {

            if (tab.url == "") {
                setURLInTab();
            }
            getTabIndexFromTabName(tab.name);
            getDataForActiveTab($scope.ActiveTabIndex);
        }

        function setEmptyURL() {
            for (var i = 1; i < $scope.tabs.length; i++) {
                $scope.tabs[i].url = '';
            }
        }

        function setDisabledActiveTab(isTabDisabled) {
            $scope.tabs[0].disabled = false;
            $scope.tabs[0].active = true;
            for (var i = 1; i < $scope.tabs.length; i++) {
                $scope.tabs[i].disabled = isTabDisabled;
                $scope.tabs[i].active = false;
            }
        }

        function setActiveTabForLicItem() {
            for (var i = 0; i < $scope.tabs.length; i++) {
                $scope.tabs[i].active = false;
            }
            $scope.tabs[0].active = true;
        }

        $scope.$on('licDetailsHandler', function (event, args) {
            setDisabledActiveTab(args.data);
        })

        function getDataFromSessions() {
            $scope.LicenseTypes = JSON.parse(ComplaintDataService.GetLicenseTypes());
            $scope.LicenseTypesNotExpired = JSON.parse(ComplaintDataService.GetLicenseTypeNotExpired());
            $scope.LicenseStatuses = JSON.parse(ComplaintDataService.GetLicenseStatus());
        }

        $scope.businessSearch = function () {
            clickOnSearchBtn(true);
        };

        $scope.newBusiness = function () {
            clickOnSearchBtn(false);
        }

        function clickOnSearchBtn(searchBtnClick) {
            clickOnSearchOrNewBtn(searchBtnClick);
        }

        function clickOnSearchOrNewBtn(clickOnSearch) {

            if (clickOnSearch == true) {
                $scope.isSearch = true;
                $scope.citationPaidDateExist = false;
                setActiveTabForLicItem();
                if ($scope.myLicenseSearch.value == 'BUSINESS_NAME' || $scope.myLicenseSearch.value == 'BUSINESS_ID') {
                    getBusinessList($scope.businessListUrl);
                } else {
                    getBusinessList($scope.businessLicListUrl);
                }
            } else {
                $scope.searchtext = '';
            }
            $scope.error = "";
            $scope.isError = false;
            $scope.isSearch = false;
        }

        $scope.newBusiness = function () {

            sessionStorage.setItem("isLicense", "true");
            $window.location.href = '../Home/BusinessMaintenance';
        }

        $scope.editBusinessContact = function () {

            sessionStorage.setItem("isBusinessContact", "true");
            sessionStorage.setItem("BusinessID", JSON.stringify($scope.businessDetails.business_seq));
            $window.location.href = '../Home/BusinessMaintenance';

        }

        $scope.showHideSSN = function () {


            $scope.showSSNExist = !$scope.showSSNExist;

        }

        $scope.showAddressAndPhone = false;      

        $scope.showHideRecordExempt = function () {

            $scope.showRecordExempt = !$scope.showRecordExempt;

            $scope.showAddressAndPhone = !$scope.showAddressAndPhone;

           

        }



        function resetAllObject() {
            $scope.searchtext = '';
            $scope.businessDetails = '';
            $scope.businessResults = '';
            $scope.myBusSelectedItems = [];
            $scope.licenseResults = '';
            $scope.myLicenseSelectedItems = [];
            $scope.citationPaidDateExist = false;
        }


        function getBusinessList(busUrl) {
            $scope.businessResults = [];
            $scope.loading = true;
            $scope.searchValues = {
                SearchBy: $scope.myLicenseSearch.value, SearchText: $scope.searchtext
            };
            $http({
                method: "GET",
                url: busUrl,
                params: { searchText: JSON.stringify($scope.searchValues) }
            })
                .success(function (data) {

                    $scope.businessResults = data;
                    $scope.myBusSelectedItems = [];
                    $scope.myBusSelectedItems.push($scope.businessResults[0]);
                    $scope.businessDetails = $scope.businessResults[0];

                    if (data.length > 0) {

                        $scope.showSSNExist = false;


                        $scope.showRecordExempt = false


                        if ($scope.businessDetails.Is_Public_Record_Exempt == "True") {

                            $scope.showAddressAndPhone = false;

                        } else {

                            $scope.showAddressAndPhone = true;
                        }


                        if ($scope.businessDetails.ssn == null || $scope.businessDetails.ssn == undefined) {
                            $scope.isSSNExist = false;
                        } else {
                            $scope.isSSNExist = true;
                        }
                        applicationConstant.busOrConOrComID = $scope.businessDetails.business_seq;
                        getLicenseList($scope.myBusSelectedItems[0].business_seq)
                    }

                    if (data.length == 0) {
                        $scope.error = "Business Records not found!";
                        $scope.licenseResults = '';
                        $scope.isError = true;
                        $scope.returnValue = "";
                    }

                    $scope.loading = false;

                })
                .error(function (data) {
                    $scope.isError = false;
                    $scope.loading = false;
                    $scope.returnValue = "Error";
                    $scope.returnErrorMsg = data.Description;
                });
        }


        function getLicenseList(busSeq) {
            $scope.loading = true;
            $scope.searchValues = {
                SearchBy: "", SearchText: busSeq
            };
            $http({
                method: "GET",
                url: $scope.licenseListUrl,
                params: { searchText: JSON.stringify($scope.searchValues) }
            })
                .success(function (data) {

                    $scope.licenseResults = data;
                    $scope.loading = false;
                    if (data.length == 0) {
                        $scope.licenseDetails = '';
                        setBusDtlsBackgroundColor(-1);
                        applicationConstant.licSequenceNumber = -1;
                        setDisabledActiveTab(true);
                        $scope.$broadcast('licenseDetailsHandler');
                    } else {
                        $scope.myLicenseSelectedItems = [];
                        $scope.licenseDetails = '';
                        setDisabledActiveTab(false);
                        $scope.myLicenseSelectedItems.push($scope.licenseResults[0]);
                        $scope.licenseDetails = $scope.licenseResults[0];
                        setBusDtlsBackgroundColor($scope.licenseDetails.License_Type_Seq);
                        getLicenseCitationList($scope.licenseDetails.License_Number, $scope.licenseDetails.License_Type_Seq);
                        $scope.masterCopyOfLicenseDetails = angular.copy($scope.licenseDetails);
                        userservice.selectedLicenseTypeValue = $scope.licenseDetails.License_Type_Seq;
                        applicationConstant.licSequenceNumber = $scope.licenseDetails.License_Seq;
                        applicationConstant.busOrConOrComName = $scope.licenseDetails.License_Number;
                        $scope.$broadcast('licenseDetailsHandler');
                    }
                })
                .error(function (data) {
                    $scope.isError = false;
                    $scope.loading = false;
                    $scope.returnValue = "Error";
                    $scope.returnErrorMsg = data.Description;
                });
        }

        function getLicenseCitationList(licNumber, licTypeSeq) {
            $scope.loading = true;
            $http({
                method: "GET",
                url: $scope.chkCitationPaidDateUrl,
                params: {
                    licNumber: licNumber, licTypeSeq: licTypeSeq

                }
            })
                .success(function (data) {
                    $scope.loading = false;
                    var _itmAttrValueFinePaid;
                    var _itmAttrValueDateSent;

                    if (data.length > 0) {
                        $scope.citationPaidMsg = data;
                        $scope.citationPaidDateExist = true;
                        var str = "Citation pending. Please verify Fine Paid Date.";
                        $window.alert(str);

                    }
                })
                .error(function (data) {
                    $scope.isError = false;
                    $scope.loading = false;
                    $scope.returnValue = "Error";
                    $scope.returnErrorMsg = data.Description;
                });
        }


        $scope.rowSelected = function (selectedItem) {

            $scope.currentSelectedRowIndex = $scope.businessResults.indexOf($scope.myBusSelectedItems[0]);

            if (!$scope.clickOnExportPrintBtn && $scope.currentSelectedRowIndex != -1) {

                if (selectedItem != undefined) {
                    $scope.businessDetails = selectedItem; // $scope.businessResults[$scope.businessResults.indexOf($scope.myBusSelectedItems[0])];
                    $scope.businessSequence = $scope.businessDetails.business_seq;
                    $scope.showSSNExist = false;
                    if ($scope.businessDetails.ssn == null || $scope.businessDetails.ssn == undefined) {
                        $scope.isSSNExist = false;
                    } else {
                        $scope.isSSNExist = true;
                    }
                    $scope.citationPaidDateExist = false;
                    getLicenseList($scope.businessSequence);
                    applicationConstant.busOrConOrComID = $scope.businessSequence;
                    setActiveTabForLicItem();
                }
            }
        }

        function setBusDtlsBackgroundColor(_licTypeSeq) {

            var _colorName = '';
            $scope.myStyle = '';

            $scope.IsHomeCaregiver = false;


            switch (_licTypeSeq) {
                case 26:
                    _colorName = "lightblue";
                    $scope.IsHomeCaregiver = true;
                    break;
                case 22:
                    _colorName = "lightyellow";
                    break;
                case 21:
                    _colorName = "lightgreen";
                    break;
                default:
                    _colorName = "white";
                    break;
            }
            $scope.myStyle = { background: _colorName }
        }


        $scope.getLicenseCertificateReport = function (item) {
            var _baseWebApiUrl = ReportDataService.getWebApiParams('License', item.License_Seq)
            _baseWebApiUrl.then(function (data) {
                var windo = window.open(data, 'License');
            })
        }

        $scope.getLicenseReport = function (item, _reportType) {

            var _reportName = '';

            switch (_reportType) {
                case 'Renewal':
                    _reportName = 'License_Renewal';
                    break;
                case 'VFH':
                    _reportName = 'VehicleForHirePermit';
                    break;
                case 'TOW':
                    _reportName = 'License_Renewal';
                    break
                case 'MOV':
                    _reportName = 'Moving Business Permit';
                    break
                case 'IM':
                    _reportName = 'Immobilization_License_Renewal';
                    break
                case 'HC':
                    if (item.Portal_Consent_Exist == undefined || item.Portal_Consent_Exist == null || item.Portal_Consent_Exist == 'N') {
                        _reportName = 'Portal_ApplicationFormWithAck';//Portal_ApplicationForm
                    } else {
                        _reportName = 'Portal_ApplicationConsentForm';
                    }
                    break
                case 'DP':
                    _reportName = 'Portal_VFHDriverApplicationAndConsent';
                    break
                case 'TD':
                    _reportName = 'Portal_TowingDriverApplicationAndConsent';
                    break
                case 'CoverSheet':
                    _reportName = 'License_CoverSheet';
                    break
                case 'LicCertificate':
                    _reportName = 'License';
                    break;
                default:
            }

            var _baseWebApiUrl = ReportDataService.getWebApiParams(_reportName, item.License_Seq)
            _baseWebApiUrl.then(function (data) {
                var windo = window.open(data, _reportName);
            })
        }

        $scope.licRowSelected = function (selectedItem) {

            if (selectedItem != undefined) {

                $scope.myLicenseSelectedItems[0] = selectedItem;
                $scope.currentLicenseSelectedRowIndex = $scope.licenseResults.indexOf(selectedItem);
                $scope.licenseDetails = '';
                $scope.citationPaidDateExist = false;
                $scope.licenseResults.forEach(function (licDtlsItem) {

                    if (licDtlsItem.License_Seq == selectedItem.License_Seq) {

                        $scope.licenseDetails = licDtlsItem;
                        getLicenseCitationList($scope.licenseDetails.License_Number, $scope.licenseDetails.License_Type_Seq);
                    }
                })

                setBusDtlsBackgroundColor($scope.licenseDetails.License_Type_Seq);
                setActiveTabForLicItem();
                setDisabledActiveTab(false);
                applicationConstant.licSequenceNumber = $scope.licenseDetails.License_Seq
                applicationConstant.busOrConOrComName = $scope.licenseDetails.License_Number
                userservice.selectedLicenseTypeValue = $scope.licenseDetails.License_Type_Seq;
                $scope.$broadcast('licenseDetailsHandler');
            }
        }
        $scope.$on('showNewLicenseDetailsGrid', function (event, args) {

            $scope.myLicenseSelectedItems = [];
            $scope.licenseDetails = '';
            $scope.myLicenseSelectedItems.push(args.data);
            $scope.licenseDetails = args.data;
            setDisabledActiveTab(false);
            $scope.licenseResults.unshift(args.data);
        })

        $scope.$on('showUpdateLicenseDetailsGrid', function (event, args) {

            $scope.myLicenseSelectedItems = [];
            $scope.licenseDetails = '';
            $scope.myLicenseSelectedItems.push(args.data);
            $scope.licenseDetails = args.data;
            setDisabledActiveTab(false);
            $scope.licenseResults[$scope.currentLicenseSelectedRowIndex] = $scope.licenseDetails;
        })

        $scope.returnToBusinessModule = function () {
            var myVareable = 0;
        }


        $scope.searchTextChange = function () {

            resetAllObject();
            if ($scope.myLicenseSearch.value === "BUSINESS_TYPE") {
                $scope.isTextBoxShow = false;
                $scope.searchtext = $scope.BType[0];
            } else {
                $scope.isTextBoxShow = true;
            }
        }


        $scope.getBusinessContactList = function () {
            var modalInstance = $modal.open({

                templateUrl: '../' + 'Partials/License/LicenseBusinessContactDetails.html',
                controller: businessContactListForCtrl,
                backdrop: 'static',
                windowClass: 'modal-BusContactList',
                resolve: {
                    intBusinessSeqNumber: function () { return $scope.businessDetails.business_seq; }
                }
            });
        }
    });


    var businessContactListForCtrl = function ($scope, $modalInstance, $http, $rootScope, BusinessDataService, intBusinessSeqNumber) {
        var thisModal = $scope;

        var _promise = BusinessDataService.GetAllContactDetails(intBusinessSeqNumber);
        _promise.then(function (data) {
            $scope.contactList = data;
        })
        thisModal.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }
})();

