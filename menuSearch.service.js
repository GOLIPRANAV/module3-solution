(function () {
    'use strict';

    angular.module('NarrowItDownApp')
    .service('MenuSearchService', MenuSearchService);

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
        var service = this;
        var apiUrl = "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json";

        service.getMatchedMenuItems = function (searchTerm) {
            return $http.get(apiUrl).then(function (response) {
                var menuItems = [];
                var allCategories = response.data;

                for (var category in allCategories) {
                    menuItems = menuItems.concat(allCategories[category].menu_items);
                }

                var foundItems = menuItems.filter(function (item) {
                    return item.description.toLowerCase().includes(searchTerm.toLowerCase());
                });

                return foundItems;
            });
        };
    }
})();

