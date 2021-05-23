sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
    "use strict";

    /**
     * Called when a controller is instantiated and its View controls (if available) are already created.
     * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
     * @memberOf opensap.movies.view.Detail
     */
    function onInit() {
        UIComponent.getRouterFor(this).getRoute("Detail").attachPatternMatched(_onDetailMatched.bind(this), this);
    }

    function _onDetailMatched(oEvent) {
        var oView = this.getView(),
            sMovieIndex = oEvent.getParameter("arguments")["movieId"],
            sAppointmentIndex = oEvent.getParameter("arguments")["appointmentId"];

        oView.bindElement({
            path: "/movies/" + sMovieIndex + "/appointments/" + sAppointmentIndex,
            model: "movies",
            events: {
                change: _onBindingChange.bind(this)
            }
        });
    }

    function _onBindingChange() {
        var oView = this.getView(),
            oElementBinding = oView.getElementBinding("movies"),
            sPath = oElementBinding.getPath();

        // if the path to the data does not exist we navigate to the not found page
        if (!oView.getModel("movies").getObject(sPath)) {
            //See Challenge at the end: 	UIComponent.getRouterFor(this).getTargets().display("NotFound");
        }
    }

    function onNavBack() {
        UIComponent.getRouterFor(this).navTo("Home");
    }

    return Controller.extend("opensap.movies.controller.Detail", {
        onInit: onInit,
        onNavBack: onNavBack
    });
});
