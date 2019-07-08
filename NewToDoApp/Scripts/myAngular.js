var app = angular.module('MyApp', [])
app.controller('MyController', function ($scope, $http, $window) {
    //Getting records from database.
    var post = $http({
        method: "POST",
        url: "/List/GetWaitingList",
        dataType: 'json',
        headers: { "Content-Type": "application/json" }
    });
    post.success(function (data, status) {
        //The received response is saved in Customers array.
        $scope.ListDetail = data;
    });

    var donepost = $http({
        method: "POST",
        url: "/List/GetDoneList",
        dataType: 'json',
        headers: { "Content-Type": "application/json" }
    });
    donepost.success(function (data, status) {
        //The received response is saved in Customers array.
        $scope.donedata = data;
    });

    //Adding new record to database.
    $scope.Add = function () {
        if (typeof ($scope.title) == "undefined" || typeof ($scope.date) == "undefined") {
            return;
        }


        var post = $http({
            method: "POST",
            url: "/List/InsertList",
            data: "{title: '" + $scope.title + "', date: '" + $scope.date + "', status: '" + 0 + "' }",
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (data, status) {
            //The newly inserted record is inserted into the Customers array.
            alert("Add Successfully!");

            $scope.ListDetail.push(data)

        });
        $scope.title = "";
        $scope.date = "";
    };

    //This variable is used to store the original values.



    //Waiting List Edit
    $scope.EditItem = {};
    //Editing an existing record.
    $scope.Edit = function (index) {
        //Setting EditMode to TRUE makes the TextBoxes visible for the row.
        $scope.ListDetail[index].EditMode = true;

        //The original values are saved in the variable to handle Cancel case.
        $scope.EditItem.title = $scope.ListDetail[index].title;
        $scope.EditItem.date = new Date($scope.ListDetail[index].date);
        //alert(newDate);
        //var FormatDate = newDate.toISOString().slice(0, 19).replace('T', ' ');
        //$scope.EditItem.date = FormatDate;

    };

    //Cancelling an Edit.
    $scope.Cancel = function (index) {
        // The original values are restored back into the Customers Array.
        $scope.ListDetail[index].title = $scope.EditItem.title;
        $scope.ListDetail[index].date = $scope.EditItem.date;

        //Setting EditMode to FALSE hides the TextBoxes for the row.
        $scope.ListDetail[index].EditMode = false;
        $scope.EditItem = {};
    };

    //Updating an existing record to database.
    $scope.Update = function (index) {
        var newlist = $scope.ListDetail[index];
        var post = $http({
            method: "POST",
            url: "/List/UpdateList",
            data: '{newlist:' + JSON.stringify(newlist) + '}',
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (data, status) {
            //Setting EditMode to FALSE hides the TextBoxes for the row.
            newlist.EditMode = false;
        });
    };

    //Done List Edit
    $scope.EditItem = {};
    //Editing an existing record.
    $scope.DoneEdit = function (index) {
        //Setting EditMode to TRUE makes the TextBoxes visible for the row.
        $scope.donedata[index].EditMode = true;

        //The original values are saved in the variable to handle Cancel case.
        $scope.EditItem.title = $scope.donedata[index].title;
        $scope.EditItem.date = $scope.donedata[index].date;
    };

    //Cancelling an Edit.
    $scope.DoneCancel = function (index) {
        // The original values are restored back into the Customers Array.
        $scope.donedata[index].title = $scope.EditItem.title;
        $scope.donedata[index].date = $scope.EditItem.date;

        //Setting EditMode to FALSE hides the TextBoxes for the row.
        $scope.donedata[index].EditMode = false;
        $scope.EditItem = {};
    };

    //Updating an existing record to database.
    $scope.DoneUpdate = function (index) {
        var newlist = $scope.donedata[index];
        var post = $http({
            method: "POST",
            url: "/List/UpdateList",
            data: '{newlist:' + JSON.stringify(newlist) + '}',
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (data, status) {
            //Setting EditMode to FALSE hides the TextBoxes for the row.
            newlist.EditMode = false;
        });
    };


    //Deleting an existing record from database.
    $scope.Delete = function (LID) {
        if ($window.confirm("Do you want to delete this row?")) {
            var post = $http({
                method: "POST",
                url: "/List/DeleteList",
                data: "{LID: " + LID + "}",
                dataType: 'json',
                headers: { "Content-Type": "application/json" }
            });
            post.success(function (data, status) {

                //Remove the Deleted record from the Customers Array.
                $scope.ListDetail = $scope.ListDetail.filter(function (oldlist) {
                    return oldlist.LID !== LID;
                });
                $scope.donedata = $scope.donedata.filter(function (oldlist) {
                    return oldlist.LID !== LID;
                });
            });
        }
    };
    //Update Done
    $scope.Done = function (LID) {
        var post = $http({
            method: "POST",
            url: "/List/UpdateDone",
            data: "{LID: " + LID + "}",
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (data, status) {

            alert("Done Your Task!");
            window.location.reload();
        });

    };
    //Update Undo
    $scope.Undo = function (LID) {
        var post = $http({
            method: "POST",
            url: "/List/UpdateUndo",
            data: "{LID: " + LID + "}",
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (data, status) {
            alert("Undo Your Task!");
            window.location.reload();
        });

    };



});
