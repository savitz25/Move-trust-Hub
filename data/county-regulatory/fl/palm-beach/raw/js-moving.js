ï»¿(function () {
    'use strict';

    var ngMoving = angular.module("App");

    ngMoving.controller("movingController", function ($scope, $http, $q, $modal, $filter, $location, $window, $rootScope, gridOptions, ExportService, PortalDataService, ReportDataService) {
        var opened = false;
        $scope.isCityShow = false;
        $scope.isError = false;
        $scope.isTextBoxShow = true;
        $scope.myBusSelectedItems = []
        $scope.searchLabel = "Company Name";
        $scope.companyTitle = $window.CompanyTitle;
        $scope.searchtext = "";
        $scope.IsModalOpen = false;
        $scope.myBusinessType = $window.BusinessType;
        $scope.resultItem = [];
        $scope.Host = 'http://' + $window.DomainUrl + '/consumerAffairs/';
        $scope.domainUrl = 'http://' + $window.DomainUrl + '/consumerAffairs/';
        $scope.ZipCode = "";
        $scope.myFilteredItems = {};
        $scope.myFilteredItems1 = {};
        $scope.SearchBy = [
            { name: 'Company Name', value: 'Company Name' },
            { name: 'License Number', value: 'License Number' },
           { name: 'City Name', value: 'City Name' },
           { name: 'Zip Code', value: 'Zip Code' }
        ];
        $scope.mySearch = $scope.SearchBy[0];
        $scope.currentSearch = $scope.mySearch.value;

        $scope.myFilter = "";

        $scope.testItems = [{ name: 'venkat', age: 20, dept_id: 'it' },
                            { name: 'prashant', age: 30, dept_id: 'marketing' },
                            { name: 'amit', age: 40, dept_id: 'purchase' },
                            { name: 'gopal', age: 50, dept_id: 'sales' }
        ];

        $scope.testHeader = Object.keys($scope.testItems[0]);

      


        $scope.massMergeLetter = function () {
            massMergingLetter();

        }

        function resetDetails() {
            return {
                ReportName: "",
                LicenseSeq: ""
            }
        }

        function massMergingLetter() {
        
            $scope.ReportName = 'VFH_30DayLtrVfh';
            $scope.LicenseSeq = '71227';
       
            var url = '../api/Reports/getReports?ReportName=' + $scope.ReportName + '&LicenseSeq=' + $scope.LicenseSeq;
            var _baseWebApiUrl = 'http://localhost/ConsumerAffairs/api/Reports/getReports?reportName='
            $scope.RepObj = resetDetails();
            $scope.RepObj.ReportName = $scope.ReportName;
            $scope.RepObj.LicenseSeq = $scope.LicenseSeq;
            var _baseWebApiUrl = ReportDataService.getWebApiParams($scope.ReportName, $scope.LicenseSeq)
            _baseWebApiUrl.then(function (data) {
                var windo = window.open(data, $scope.reportName);
            })

        }


        function getUrl(RepObj) {
            var _url = $http({ method: 'GET', url: '../api/Reports/getReports', params: { ReportName: $scope.RepObj.ReportName, LicenseSeq: $scope.RepObj.LicenseSeq } });
        }


        $scope.update = function () {
            $scope.resultItem = [];
            if ($scope.mySearch.name === "City Name") {
                $scope.isCityShow = true;
                $scope.isTextBoxShow = false;
                getCities();
                $scope.searchLabel = $scope.mySearch.name;
                $scope.myCity = $scope.City[0];

            } else {
                $scope.searchtext = '';
                $scope.isCityShow = false;
                $scope.isTextBoxShow = true;
                $scope.searchLabel = $scope.mySearch.name;
            }
        };

        $scope.search = function () {
            $scope.error = "";
            $scope.isError = false;
            getSearchValues();
        };

        $scope.myBusSelectedItems = function () {
            var _itesm = $scope.myBusSelectedItems[0];
        }
        function getSearchValues() {
            var searchfor = "";
            $scope.loading = true;

            if ($scope.mySearch.name === "City Name") {
                searchfor = $scope.myCity.City_name;
            } else {
                searchfor = $scope.searchtext;
            }

            var _promise = PortalDataService.GetSearchValues($scope.myBusinessType, $scope.mySearch.name, searchfor);

            _promise.then(function (data) {

                if (data.length == 0) {
                    $scope.error = "Records not found!";
                    $scope.isError = true;
                }
                $scope.resultItem = data;
                $scope.loading = false;
                $scope.myFilter = "";
                showMessage();
            }, errorHandler)
        }

        function getCities() {
            var _promise = PortalDataService.GetCities($scope.myBusinessType);
            _promise.then(function (data) {
                $scope.City = data;
                $scope.myCity = $scope.City[0];
            }, errorHandler)


        };      



        function errorHandler(response) {
            $scope.error = "An Error has occured while loading posts!";
            $scope.isError = true;
        }




        $scope.printOrExport = function (event, grid, gridMain) {
            ExportService.copyData(event, grid, gridMain);
        }

      

        function showMessage() {
            //logger.success("record found", "Moving Records");
        }



        var dialog;
        $scope.updateSelectedRow = function (row) {
            if (opened) return;

            $scope.IsModalOpen = true;
            var modalInstance = $modal.open({
                backdrop: 'static',
                templateUrl: '../' + 'Partials/Admin/BusinessDetailDialog.html',
                controller: ModalMovingCtrl,
                windowClass: 'modal-custom',
                resolve: {
                    items: function () { return row; },
                    businessType: function () { return $scope.myBusinessType; },
                    details: function () { return $scope.details; },
                    actions: function () { return $scope.actions; },
                    domainURL: function () { return $scope.domainUrl; },
                    companyTitle: function () { return $scope.companyTitle; }
                }

            });
            opened = true;

        };

        var ModalMovingCtrl = function ($scope, $modalInstance, items,businessType, details, actions, domainURL, companyTitle, $http) {

            var thisModal = $scope
            thisModal.items = items;
            thisModal.businessType = businessType;
            thisModal.companyTitle = companyTitle;
            thisModal.domainURL = domainURL;
            thisModal.details = [];
            thisModal.actions = [];
            thisModal.details = thisModal.items;
            thisModal.details.Website_Address = thisModal.items.Website_Address == null ? "" : thisModal.items.Website_Address.replace(/\s+/g, '');

            $scope.ok = function () {
                $modalInstance.close();
                opened = false
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
                opened = false
            };
        };
    });
})();




