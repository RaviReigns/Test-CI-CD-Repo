({
    doInit : function(component, event, helper) {
        //alert(component.get('v.teamMemberId'));
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
    },
    handleTabClick: function(component, event, helper) {
        var selectedTabValue = event.currentTarget.dataset.value;
        //alert(selectedTabValue);
        component.set("v.tabname", selectedTabValue);
        var tabItems = component.find('tabItem');
        //alert(tabItems);
        for (var i = 0; i < tabItems.length; i++) {
            var tabValue = tabItems[i].getElement().dataset.value;
            //alert(tabValue);
            if (tabValue === selectedTabValue) {
                $A.util.addClass(tabItems[i], 'slds-active');
            } else {
                $A.util.removeClass(tabItems[i], 'slds-active');
            }
        }
        
        var whichProject = component.get('v.whichProject');
        var whichObject = component.get('v.whichObject');
        //alert(whichProject);
        //alert(whichObject);
        var action = component.get("c.getProjectTasks");
        action.setParams({ 
            whichProject : whichProject,
            tabName : selectedTabValue,
            whichObject : whichObject
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            //alert(state);
            //alert(JSON.stringify(response.getReturnValue()));
            if (state === 'SUCCESS') {
                component.set('v.taskDetails', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    searchText : function(component, searchText, event, helper) {
        var tabItems = component.get('v.tabname');
        //alert(tabItems);
        var whichProject = component.get('v.whichProject');
        var whichObject = component.get('v.whichObject');
        var action2 = component.get("c.getAllTasks");
        action2.setParams({'searchText':  component.get('v.searchText'), 'tabName': tabItems, 'whichProject':whichProject, 'whichObject' : whichObject});
        action2.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set('v.taskDetails',  response.getReturnValue());
            }
        });
        $A.enqueueAction(action2);
    },
    taskDetail : function(component, event, helper) {
        var taskId =event.currentTarget.dataset.value;
        var taskname =event.currentTarget.dataset.name;
        //alert(taskname);
        component.set('v.assignRecord',taskname);
        component.set('v.assignRecordId',taskId);
    },
    searchTeam : function(component, event, helper) {
        var teams= component.get('v.teams');
        var searchTeam= component.get('v.searchTeam');
        //alert(searchTeam);
        var matchprds=[];
        if(searchTeam !=''){
            for(var i=0;i<teams.length; i++){ 
                if(teams[i].Name.toLowerCase().indexOf(searchTeam.toLowerCase())  != -1  ){
                    matchprds.push( teams[i] );
                } 
            } 
            if(matchprds.length >0){
                component.set('v.filteredTeams',matchprds);
                //alert(JSON.stringify(matchprds));
            }
            //alert(matchprds.length);
        }else{
            component.set('v.filteredTeams',[]);
        }
    },
    update : function(component, event, helper) {
        var TeamNameid =event.currentTarget.dataset.id;
        //alert(pid);
        var TeamName = event.currentTarget.dataset.name;
        //alert(pname);
        component.set('v.searchTeam',TeamName);
        component.set('v.TeamNameid',TeamNameid);
        component.set('v.filteredTeams',[]);
    },
    Assign : function(component, event, helper) {
        var TeamNameid = component.get('v.TeamNameid');
        //alert(TeamName);
        var assignRecord = component.get('v.assignRecord');
        //alert(assignRecord);
        var idToUpdate = component.get('v.assignRecordId');
        //alert(idToUpdate);
        var action11 = component.get("c.assignTask");
        action11.setParams({'idToUpdate':  idToUpdate, 'TeamName': TeamNameid});
        action11.setCallback(this, function(response) {
            var state = response.getState();
            var returnval =  response.getReturnValue();
            alert(returnval);
            if (state === "SUCCESS") {
                if(returnval == 'already assigned'){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "type":'error',
                        "message":  returnval
                    });
                    toastEvent.fire();
                }else {
                    var evt = $A.get("e.force:navigateToComponent");
                    evt.setParams({
                        componentDef: "c:projectDetailsComponent",
                        componentAttributes: {
                            taskId: returnval
                        }
                    });
                    evt.fire();
                }
            }
        });
        $A.enqueueAction(action11);
    },
    goBack : function(component, event, helper) {
        var teamMemberId = component.get('v.teamMemberId');
        var evt = $A.get("e.force:navigateToComponent");
        if (evt) {
            evt.setParams({
                componentDef: "c:teamLogins",
                componentAttributes: {
                    teamMemberId : teamMemberId,
                    loginFormVisible : false,
                    recordFormVisible : false,
                    projectFormVisible : true,
                    projectGoBack : true
                }
            });
            evt.fire();
        }
    },
    newRecord : function(component, event, helper) {
        var newRecordId = component.find('newRecord');
        var newRecord = newRecordId.get('v.value');
        //alert('name of the record  '+newRecord);
        var whichObject = component.get('v.whichObject');
        //alert('name of the object  '+whichObject);
        var whichProject = component.get('v.whichProject');
        //alert('name of the project  '+whichProject);
        var teamMemberId = component.get('v.teamMemberId');
        //alert('name of the team  '+teamMemberId);
        var recordStatus = component.get('v.tabname');
        //alert('name of the tab  '+recordStatus);
        if(recordStatus == 'SearchAll' || recordStatus == null){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "type":'error',
                "message":  'please select the tab to set new record status as tab name. '
            });
            toastEvent.fire();
        }
        var action = component.get('c.createNewRecord');
        action.setParams({
            whichObject : whichObject,
            newRecord : newRecord,
            whichProject : whichProject,
            teamMemberId:teamMemberId,
            recordStatus : recordStatus
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            //alert(state);
            if (state === 'SUCCESS') {
                alert( response.getReturnValue());
                //component.set('v.Selectedtask', response.getReturnValue());
            }
            else {
                alert('error'+ state);
            }
        });
        $A.enqueueAction(action);
        
    },
    openBulkRecordCreator : function(component, event, helper) {
        var whichObject = component.get('v.whichObject');
        //alert('name of the object  '+whichObject);
        var whichProject = component.get('v.whichProject');
        //alert('name of the whichProject  '+ whichProject);
        var evt = $A.get("e.force:navigateToComponent");
        if (evt) {
            evt.setParams({
                componentDef: "c:CreateMultipleTaskfrmMilestone",
                componentAttributes: {
                    whichProject: whichProject,
                    whichObject : whichObject
                }
            });
            evt.fire();
        }
    }
})