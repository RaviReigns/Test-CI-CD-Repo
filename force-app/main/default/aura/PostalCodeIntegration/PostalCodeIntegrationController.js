({
    getPostalLocData: function(component, event, helper) {
        
         var pinCodeNum = component.get("v.searchPincode");
        
        var action = component.get("c.searchBranchDetails");
        action.setParams({
            "pinCodeNumber" : pinCodeNum 
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            //alert(state);
            if (state === "SUCCESS") {
                var postalLocList = response.getReturnValue();
               //alert(JSON.stringify(postalLocList));
                component.set("v.postalLocList", postalLocList); 
            } else {
                
                console.log("Error occurred: " + response.getError());
            }
        });
        $A.enqueueAction(action);
    },

})