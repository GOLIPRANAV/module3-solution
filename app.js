(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService);

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var ctrl = this;
        ctrl.searchTerm = "";
        ctrl.found = [];
        ctrl.errorMessage = "";

        ctrl.narrowItDown = function () {
            if (!ctrl.searchTerm) {
                ctrl.found = [];
                ctrl.errorMessage = "Nothing found";
                return;
            }

            MenuSearchService.getMatchedMenuItems(ctrl.searchTerm)
                .then(function (foundItems) {
                    ctrl.found = foundItems;
                    ctrl.errorMessage = foundItems.length === 0 ? "Nothing found" : "";
                })
                .catch(function (error) {
                    console.log("Error fetching menu items:", error);
                });
        };

        ctrl.removeItem = function (itemIndex) {
            ctrl.found.splice(itemIndex, 1);
        };
    }
})();

