({
    doInit : function(component, event, helper) {
        //component.set('v.recordFormVisible', false);
        //component.set('v.projectFormVisible', true);
        var action1 = component.get("c.fetchTeams");
        action1.setCallback(this, function(response) {
            var state = response.getState();
            var returnval =  response.getReturnValue();
            if (state === "SUCCESS") {
                component.set('v.teams',returnval);
                //alert(JSON.stringify(returnval));
            }
        });
        $A.enqueueAction(action1);
        var action = component.get("c.getProjects");
        //action.setParams({'searchText':  component.get('v.searchText')});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set('v.projects',  response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    searchText: function(component, event, helper) {
        var searchText = component.get("v.searchText");
        var recordFormVisible = component.get("v.recordFormVisible");
        var projectFormVisible = component.get("v.projectFormVisible");
        
        if (recordFormVisible) {
            // perform search for teams
            helper.searchTeams(component, searchText);
        } else if (projectFormVisible) {
            // perform search for projects
            helper.searchProjects(component, searchText);
        }
    },
    
    userLogin : function(component, event, helper) {
        
        var uname = component.get("v.Username");
        var upass = component.get("v.Password");
        var action = component.get("c.getDetails");
        
        action.setParams({
            username : uname,
            password :upass
        });
        
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                //alert(result);
                if (result) {
                    component.set("v.loginFormVisible", false);
                    component.set('v.recordFormVisible', false);
                    component.set('v.projectFormVisible', true);
                } else {
                    // Display the error message
                    component.set("v.errorMessage", result);
                    component.set('v.recordFormVisible', true);
                    component.set('v.projectFormVisible', false);
                }
            } else {
                console.log("Error: " + state);
            }
        });
        $A.enqueueAction(action);
        //component.set("v.uname",'');
        //component.set("v.pass",'');
    },
    teamDetail : function(component, event, helper) {
        var teamMemberId =event.currentTarget.dataset.value;
        component.set('v.teamMemberId',teamMemberId);
        //alert(teamMemberId);
        var action = component.get('c.getLoginDetails');
        action.setParams({
            teamMemberId: teamMemberId
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            //alert(state);
            if (state === 'SUCCESS') {
                var loginDetails = response.getReturnValue();
                //alert( loginDetails.length);
                if (loginDetails.length === 0) {
                    component.set('v.loginFormVisible', true);
                    //component.set('v.recordFormVisible', true);
                    //component.set('v.projectFormVisible', false);
                    
                } else {
                    component.set('v.loginFormVisible', false);
                    component.set('v.recordFormVisible', false);
                    component.set('v.projectFormVisible', true);
                    component.set('v.projectGoBack', true);
                }
            }
        });
        $A.enqueueAction(action);
    },
    closeModel: function(component, event, helper) {
        // Set isModalOpen attribute to false  
        component.set("v.loginFormVisible", false);
        component.set('v.recordFormVisible', true);
    }, 
    goBack : function(component, event, helper) {
        component.set("v.loginFormVisible", false);
        component.set('v.recordFormVisible', true);
        component.set("v.projectFormVisible", false);
        component.set('v.projectGoBack', false);
    },
    buttonDetail:function(component,event,helper){
        //alert('in button detail');
        var whichObject = event.getSource().get("v.label");
        //alert('projectid is    ' +projectIdds);
        var whichProject = event.getSource().get("v.value");
        //alert('projectid is      ' +buttonIdds);
        var teamMemberId = component.get('v.teamMemberId');
        //alert(teamMemberId);
        var evt = $A.get("e.force:navigateToComponent");
        if (evt) {
            evt.setParams({
                componentDef: "c:projectDetails",
                componentAttributes: {
                    whichProject: whichProject,
                    whichObject : whichObject,
                    teamMemberId: teamMemberId
                }
            });
            evt.fire();
            component.set('v.projectFormVisible', false);
        }
        
    },
    
    projectDetail:function(component,event,helper){
        var projectId =event.currentTarget.dataset.value;
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": projectId
        });
        navEvt.fire();
        
    },
     
})