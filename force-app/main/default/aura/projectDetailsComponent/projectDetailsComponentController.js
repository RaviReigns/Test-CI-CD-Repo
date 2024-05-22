({
    doInit: function(component, event, helper) {
        var taskOnLoadId = component.get('v.taskId');
        component.set('v.searchTerm',  taskOnLoadId);
        
        var taskId = component.get('v.searchTerm');
        var action = component.get("c.taskRecordDetailsPage");
        action.setParams({'taskId':  taskId});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var returnvalue =  response.getReturnValue();
                component.set('v.taskDetails',  returnvalue);
            }
        });
        $A.enqueueAction(action);
    },
    searchRecords : function(component, event, helper) {
        var searchTerm = component.get("v.searchTerm");
        var action = component.get("c.getRecordNameById");
        action.setParams({
            "recordId": searchTerm
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var results = response.getReturnValue();
                if(results == null){
                    component.set("v.searchResults", '');
                }
                component.set("v.searchResults", results);
            }
        });
        $A.enqueueAction(action);
        
        var objectCheck = component.get("v.searchResults");
        for(let item of objectCheck) {
            if(item.objectName == 'Task_List__c' || item.objectName == 'task_list__c') {   
                var taskId = component.get('v.searchTerm');
                var action = component.get("c.taskRecordDetailsPage");
                action.setParams({'taskId':  taskId});
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === "SUCCESS") {
                        component.set('v.taskDetails',  response.getReturnValue());
                    }
                });
                $A.enqueueAction(action);
            }else {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Error!",
                    "message": "The record doesnot belong to tasklist.",
                    "type": "error"
                });
                toastEvent.fire();
            }
        }
    },
    TaskInProgDescTime : function(component, event, helper) {
        var newDescription = component.find('originalscription').get('v.value');
        var updatedDescription = ' IN PROGRESS - ' + newDescription +'.'
        + '\n - Starting Time - '
        + new Date().toLocaleDateString('en-GB', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric', 
            hour12: true 
        })
        + '.' 
        + '<br>--------------------------------------------------------------------------------';
        component.set('v.originalDescription',updatedDescription);
    },
    TaskDoneDescTime : function(component, event, helper) {
        var newDescription = component.find('originalscription').get('v.value');
        var updatedDescription = ' TASK DONE - ' + newDescription +'.'
        + '\n - Task Closed Time - '
        + new Date().toLocaleDateString('en-GB', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric', 
            hour12: true 
        })
        + '.' 
        + '<br>--------------------------------------------------------------------------------';
        component.set('v.originalDescription',updatedDescription);
    },
    hourlyTaskUpdate : function(component, event, helper) {
        var newDescription = component.find('originalscription').get('v.value');
        var splitDescription = newDescription.split(",");
        var updatedDescription = splitDescription[0]+' Minutes More Estimated Time.<br> Current at '+splitDescription[1]+' % Progress.';
        component.set('v.originalDescription',updatedDescription);
    },
    handleSuccess: function(component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": "The record has been updated successfully.",
            "type": "success"
        });
        toastEvent.fire();
    },    
    handleTabClick: function(component, event, helper) {
        var selectedTabValue = event.currentTarget.dataset.value;
        component.set("v.selectedTab", selectedTabValue);
    },
})