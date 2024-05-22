({
    searchTeams : function(component, searchText) {
        //alert('in helper teams');
        var action2 = component.get("c.getTeamList");
        action2.setParams({'searchText':  component.get('v.searchText')});
        action2.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set('v.teams',  response.getReturnValue());
            }
        });
        $A.enqueueAction(action2);
    },
    searchProjects : function(component, searchText) {
        //alert('in helper project');
        var action = component.get("c.getProjectsList");
        action.setParams({'searchText':  component.get('v.searchText')});
        action.setCallback(this, function(response) {
            var state = response.getState();
            //alert(state);
            //alert(response.getReturnValue());
            if (state === "SUCCESS") {
                component.set('v.projects',  response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    
})